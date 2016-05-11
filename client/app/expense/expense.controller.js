/**
 * Created by anuraagbasu on 11/05/16.
 */

angular.module("expenseApp")
    .controller("ExpenseCtrl", function ($scope, $http) {
        var self = this;

        self.expenseTypes = [{name: "Cash", value: "Cash"},
                            {name: "Credit", value: "Credit"}];
        self.expenseCategories = [{name: "Food", value: "Food"},
                                {name: "Entertainment", value: "Entertainment"},
                                {name: "Utilities", value: "Utilities"},
                                {name: "Fuel", value: "Fuel"},
                                {name: "Other", value: "Other"}];
        self.addExpense = {};
        self.addExpense.type = self.expenseTypes[0].value;
        self.addExpense.category = self.expenseCategories[0].value;
        self.allExpenses = [];
        self.updateExpense = false;

        self.save = function (form) {
            if (!form || form.$invalid) {
                console.log("form is not valid");
                return;
            }

            var dataToSend = {
                date: new Date(form.date.$viewValue).getTime(),
                amount: self.addExpense.amount,
                type: form.type.$viewValue,
                category: form.category.$viewValue
            };

            if (self.updateExpense) {
                dataToSend._id = self.addExpense._id;

                $http.put("/v1/expense/update", dataToSend).success(function (savedExpense) {
                    alert("Expense Updated");

                    clearForm();
                    self.getAllExpenses();

                }).error(function (resp) {
                    alert("Couldn't update expense. Please try again later");
                });
            } else {
                $http.post("/v1/expense/add", dataToSend).success(function (savedExpense) {
                    self.allExpenses.push(savedExpense);
                    clearForm();

                    reDrawChart(self.allExpenses);

                    alert("Expense Added");
                }).error(function (resp) {
                    alert("Couldn't add expense. Please try again later");
                });
            }
        };

        function clearForm () {
            self.addExpense = {};
            self.addExpense.type = self.expenseTypes[0].value;
            self.addExpense.category = self.expenseCategories[0].value;
        }

        function reDrawChart (expenses) {
            var expenseData = [];
            _.forEach(_.groupBy(expenses, "category"), function (value, key) {
                expenseData.push({
                    label: key,
                    value: _.sumBy(value, function (obj) {
                        return obj.amount;
                    })
                });
            });

            self.chartExpenses = {
                chart: {
                    caption: "",
                    subcaption: "",
                    startingangle: "20",
                    showlabels: "0",
                    showlegend: "1",
                    enablemultislicing: "0",
                    slicingdistance: "15",
                    showpercentvalues: "1",
                    showpercentintooltip: "0",
                    plottooltext: "Total expenditure : $datavalue",
                    theme: "fint"
                },
                data: expenseData
            };
        }

        self.getAllExpenses = function () {
            self.allExpenses = [];
            $http.get("/v1/expense/getAll").success(function (expenses) {
                reDrawChart(expenses);

                self.allExpenses = expenses;

            }).error(function (resp) {
                alert("Couldn't get all expenses");
            });
        };

        self.remove = function (expenseId) {
            $http.delete("/v1/expense/remove/" + expenseId).success(function (resp) {
                if (resp) {
                    _.remove(self.allExpenses, function (expense) {
                        return expense._id == expenseId;
                    });

                    reDrawChart(self.allExpenses);

                } else {
                    alert("Couldn't delete response. Please try again later");
                }
            }).error(function () {
                alert("Couldn't delete expense. Please try again later");
            });
        };

        self.update = function (expenseId) {
            var expenseToUpdate = _.find(self.allExpenses, "_id", expenseId);

            self.updateExpense = true;
            self.addExpense = expenseToUpdate;
            self.addExpense.date = new Date(expenseToUpdate.date);
        };

        self.getAllExpenses();
    });