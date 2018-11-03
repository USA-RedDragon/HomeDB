'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/api/total_money',
        handler: async (request, h) => {
            const accounts = await request.getModel('accounts').findAll();
            var total = 0;
            await accounts.forEach(account => {
                total += account.balance;
            });
            return total;
        }
    },
    {
        method: 'GET',
        path: '/api/todo_count',
        handler: async (request, h) => {
            const todos = await request.getModel('todo').findAll();
            var total = 0;
            await todos.forEach(() => {
                total++;
            });
            return total;
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
                labels: ["S", "M", "T", "W", "T", "F", "S"],
                series: [[12, 17, 7, 17, 23, 18, 38]]
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
            for(var i=1; i<31; i++) {
                i % 2 == 0 ? data.labels.push(""):data.labels.push(i)
            }
            for(var i=1; i<31; i++) {
                data.series[0].push(i*100)
            }
            return data;
        }
    },
    {
        method: 'GET',
        path: '/api/yearly_debts',
        handler: async (request, h) => {
            var data = {
                labels: [
                    "J",
                    "F",
                    "M",
                    "A",
                    "M",
                    "J",
                    "J",
                    "A",
                    "S",
                    "O",
                    "N",
                    "D"
                ],
                series: [[]]
            }
            for(var i=0; i<12; i++) {
                data.series[0].push(i*3000)
            }
            return data;
        }
    }
];