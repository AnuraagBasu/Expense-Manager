/**
 * Created by anuraagbasu on 11/05/16.
 */

var Expense = require("./expense.model");

function add (expense, callback) {
    new Expense({
        date: expense.date,
        category: expense.category,
        type: expense.type,
        amount: expense.amount
    }).save(function (err, savedExpense) {
            if (err) {
                console.log("Error in adding expense");
                console.log(err);
            }

            return callback(err, savedExpense);
        });
}

function update (expense, callback) {
    Expense.findOneAndUpdate({_id: expense._id},
            {$set: {date: expense.date, category: expense.category, type: expense.type, amount: expense.amount}}, function (err, savedExpense) {
            if (err) {
                console.log("Error in updating expense");
                console.log(err);
            }

            return callback(err, savedExpense);
        });
}

function remove (expenseId, callback) {
    Expense.findOneAndRemove({_id: expenseId}, function (err, resp) {
        if (err) {
            console.log("Error in deleting expense");
            console.log(err);
        }

        return callback(err, resp);
    });
}

function getAll (callback) {
    Expense.find({}, function (err, expenses) {
        if (err) {
            console.log("Error in getting all expenses");
            console.log(err);
        }

        return callback(err, expenses);
    });
}

module.exports = {
    "add": add,
    "update": update,
    "remove": remove,
    "getAll": getAll
};