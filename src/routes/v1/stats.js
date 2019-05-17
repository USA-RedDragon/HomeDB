const controllers = require('../../controllers/v1/stats');

module.exports = (app, version) => {
    app.get(`/api/${version}/stats/money`, controllers.GETAPIStatsMoney);
    app.get(`/api/${version}/stats/todos`, controllers.GETAPIStatsTodos);
    app.get(`/api/${version}/stats/health`, controllers.GETAPIStatsHealth);
    app.get(`/api/${version}/stats/weekly_transactions`, controllers.GETAPIStatsWeeklyTransactions);
    app.get(`/api/${version}/stats/monthly_balances`, controllers.GETAPIStatsMonthlyBalances);
    app.get(`/api/${version}/stats/yearly_debts`, controllers.GETAPIStatsYearlyDebts);
};
