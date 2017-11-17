var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
// var table = new Table({
//     head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit']
// });

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rolltribe1",
    database: "bamazonDB",
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
})

function showSupervisorView() {
    inquirer.prompt([

        {
            type: "list",
            name: "question",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(res) {
        checkPromptAnswer(res.question);
        })
}

showSupervisorView();

function checkPromptAnswer(res) {
        switch (res) {
            case "View Product Sales by Department":
                joinProductTables();
                break;

            case "Create New Department":
                createNewDepartment();
                break;
            default:
                "Please select an option from the menu.";
        }
      }

function joinProductTables() {
    //   SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
    // FROM Orders
    // INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
    var tableJoinQuery = "DROP TABLE IF EXISTS sales; CREATE TABLE sales ( SELECT d.department_id, p.department_name, d.over_head_costs, p.product_sales FROM products p INNER JOIN departments d ON (p.department_name = d.department_name) GROUP BY department_name); SELECT * FROM sales;";
    connection.query(tableJoinQuery, function(err, res) {
        if (err) throw err;
        addTotalProfitColumn(res);
    })
}

function addTotalProfitColumn(res) {
    var table = new Table({
        head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit']
        });
    var addColumn = "ALTER TABLE sales ADD COLUMN total_profit INT(15) AFTER product_sales; SELECT * FROM sales;";
    connection.query(addColumn, function(err, response) {
        if (err) throw err
        for (var i = 1; i < response.length; i++) {
            var item = response[i];
            for (var j = 0; j < item.length; j++) {
                var id = item[j];
                var totalProfit = item[j].product_sales - item[j].over_head_costs;
                connection.query(
                    "UPDATE sales SET ? WHERE ?", [{
                            total_profit: totalProfit
                        },
                        {
                            department_id: item[j].department_id
                        }
                    ],

                    function(err) {
                        if (err) throw err;
                    })

                table.push(
                    [item[j].department_id, item[j].department_name, item[j].over_head_costs]
                );

            }
        }
        console.log(table.toString());
    })

}

function createNewDepartment() {
  // Prompt user for department name, overhead costs
  inquirer.prompt([

      {
        type: "input",
        name: "name",
        message: "Please enter the name of the new department:"
      },
      {
        type: "input",
        name: "cost",
        message: "Please enter the overhead costs associated with this new department:"
      }

    ]).then(function(res) {
      var newDepartment = {
            department_name: res.name,
            over_head_costs: res.cost
        }
      connection.query("INSERT INTO departments SET ?", newDepartment, function(err, res) {
        if(err) throw err;
        console.log("Department added.");
      })

    })
  // Set profit and total profit to zero
  // Insert values into departments table
}

// function calculateTotalProfit(res) {
//     for (var i = 1; i < res.length; i++) {
//         var item = res[i];
//         console.log("NEW TABLE", item);
//         var totalProfit = item.product_sales - over_head_costs;
//         connection.query(
//             "UPDATE sales SET ? WHERE ?", [{
//                     total_profit: totalProfit
//                 },
//                 {
//                     department_id: item.department_id
//                 }
//             ],
//             function(err) {
//                 if (err) throw err;
//                 console.log(t.toString());
//             })
//     }
// }