/**
 * Created by anuraagbasu on 11/05/16.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    date: {type: Number, required: true},
    category: {type: String, required: true},
    type: {type: String},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model("Expense", ExpenseSchema);