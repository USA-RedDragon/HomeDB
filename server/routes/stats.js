'use strict';

const weekdays = {
    0: 'S',
    1: 'M',
    2: 'T',
    3: 'W',
    4: 'T',
    5: 'F',
    6: 'S'
}

const months = {
    0: "J",
    1: "F",
    2: "M",
    3: "A",
    4: "M",
    5: "J",
    6: "J",
    7: "A",
    8: "S",
    9: "O",
    10: "N",
    11: "D"
}

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

module.exports = [
    {
        method: 'GET',
        path: '/api/total_money',
        handler: async (request, h) => {
            return request.getModel('accounts').sum('balance');
        }
    },
    {
        method: 'GET',
        path: '/api/todo_count',
        handler: async (request, h) => {
            return request.getModel('todo').count();
        }
    },
    {
        method: 'GET',
        path: '/api/financial_state',
        handler: async (request, h) => {
            return "Good";
        }
    },
    {
        method: 'GET',
        path: '/api/weekly_transactions',
        handler: async (request, h) => {
            var data = {
                labels: [],
                series: [[]]
            }
            const Transactions = await request.getModel('transactions');
            for (var i = 6; i >= 0; i--) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                data.labels.push(weekdays[d.getDay()]);
                data.series[0].push(
                    await Transactions.count({ where: { date: d.toISOString().substring(0, 10) } })
                );
            }
            return data;
        }
    },
    {
        method: 'GET',
        path: '/api/monthly_balances',
        handler: async (request, h) => {
            var data = {
                labels: [],
                series: [[]]
            }
            for (var i = 31; i >= 0; i--) {
                i % 2 == 0 ? data.labels.push("") : data.labels.push(i.pad())
            }
            const AccountHistory = await request.getModel('account_history');
            for (var i = 31; i >= 0; i--) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                data.series[0].push(
                    await AccountHistory.sum('balance', { where: { date: d.toISOString().substring(0, 10) } })
                )
            }
            return data;
        }
    },
    {
        method: 'GET',
        path: '/api/yearly_debts',
        handler: async (request, h) => {
            var data = {
                labels: [],
                series: [[]]
            }
            const DebtHistory = await request.getModel('debt_history');
            for (var i = 11; i >= 0; i--) {
                var d = new Date();
                d.setMonth(d.getMonth() - i);
                data.labels.push(months[d.getMonth()])
                const sequelize = DebtHistory.sequelize;
                data.series[0].push(
                    await DebtHistory.sum('balance', {
                        where: sequelize.where(
                            sequelize.fn("MONTH", sequelize.col("date")),
                            d.getMonth() + 1
                        )
                    })
                )
            }
            return data;
        }
    }
];