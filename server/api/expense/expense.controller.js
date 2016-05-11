/**
 * Created by anuraagbasu on 11/05/16.
 */

var ExpenseService = require("./expense.service");

function add (req, res) {
    ExpenseService.add(req.body, function (err, expense) {
        if (err) {
            return handleError(res, false);
        }

        return res.status(200).send(expense);
    });
}

function update (req, res) {
    ExpenseService.update(req.body, function (err, expense) {
        if (err) {
            return handleError(res, false);
        }

        return res.status(200).send(expense);
    });
}

function remove (req, res) {
    ExpenseService.remove(req.params.expenseId, function (err, resp) {
        if (err) {
            return handleError(res, false);
        }

        return res.status(200).send(true);
    });
}

function getAll (req, res) {
    ExpenseService.getAll(function (err, expenses) {
        if (err) {
            return handleError(res, false);
        }

        return res.status(200).send(expenses);
    });
}

function handleError (res, errorResponse) {
    return res.status(500).send(errorResponse);
}

module.exports = {
    "add": add,
    "update": update,
    "remove": remove,
    "getAll": getAll
};