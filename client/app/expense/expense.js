/**
 * Created by anuraagbasu on 11/05/16.
 */

angular.module("expenseApp")
    .config(function ($stateProvider) {
        $stateProvider
            .state("expense", {
                url: "/",
                templateUrl: "app/expense/expense.html",
                controller: "ExpenseCtrl as expense"
            });
    });