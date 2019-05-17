const weekdays = {
    0: 'S',
    1: 'M',
    2: 'T',
    3: 'W',
    4: 'T',
    5: 'F',
    6: 'S',
};

const months = {
    0: 'J',
    1: 'F',
    2: 'M',
    3: 'A',
    4: 'M',
    5: 'J',
    6: 'J',
    7: 'A',
    8: 'S',
    9: 'O',
    10: 'N',
    11: 'D',
};

const padNumber = function(s, size) {
    while (s.length < (size || 2)) {
        s = '0' + s;
    }
    return s;
};

module.exports.GETAPIStatsMoney = (req, res) => {
    req.db.accounts.sum('balance').then((balance) => {
        res.json(balance);
    });
};

module.exports.GETAPIStatsTodos = (req, res) => {
    req.db.todo.count().then((count) => {
        res.json(count);
    });
};

module.exports.GETAPIStatsHealth = async (req, res) => {
    let score = 0;

    const liquidCapital = await req.db.accounts.sum('balance');
    const expectedExpenses = await req.db.monthly_expenses.sum('planned');
    const actualExpenses = await req.db.monthly_expenses.sum('actual');
    const _budgetRatio = actualExpenses / expectedExpenses;

    const liquidCapitalWeight = 1;
    const _budgetWeight = 1;
    const _numberOfItems = 2;

    if (liquidCapital > 3000) {
        score += 0 * liquidCapitalWeight;
    } else if (liquidCapital > 1000) {
        score += 1 * liquidCapitalWeight;
    } else if (liquidCapital < 500) {
        score += 2 * liquidCapitalWeight;
    }

    /* if(budgetRatio > 1.3)
        score += 2 * budgetWeight;
    else if(budgetRatio > 1)
        score += 1 * budgetWeight;
    else if(budgetRatio < 1 )
        score += 0 * budgetWeight;*/

    if (score >= 2) {
        res.json({ health: 'Bad' });
    } else if (score >= 1) {
        res.json({ health: 'Moderate' });
    } else {
        res.json({ health: 'Good' });
    }
};

module.exports.GETAPIStatsWeeklyTransactions = async (req, res) => {
    const data = {
        labels: [],
        series: [[]],
    };
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.labels.push(weekdays[d.getDay()]);
        data.series[0].push(
            await req.db.transactions.count({ where: { date: d.toISOString().substring(0, 10) } })
        );
    }
    res.json(data);
};

module.exports.GETAPIStatsMonthlyBalances = async (req, res) => {
    const data = {
        labels: [],
        series: [[]],
    };
    for (let i = 31; i >= 0; i--) {
        i % 2 == 0 ? data.labels.push('') : data.labels.push(padNumber(i));
    }
    for (let i = 31; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.series[0].push(
            await req.db.account_history.sum('balance', { where: { date: d.toISOString().substring(0, 10) } })
        );
    }
    res.json(data);
};

module.exports.GETAPIStatsYearlyDebts = async (req, res) => {
    const data = {
        labels: [],
        series: [[]],
    };
    for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        data.labels.push(months[d.getMonth()]);
        const sequelize = req.db.debt_history.sequelize;
        data.series[0].push(
            await req.db.debt_history.sum('balance', {
                where: sequelize.where(
                    sequelize.fn('MONTH', sequelize.col('date')),
                    d.getMonth() + 1
                ),
            })
        );
    }
    res.json(data);
};
