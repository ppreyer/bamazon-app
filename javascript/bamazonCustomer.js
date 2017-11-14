var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rolltribe1",
    database: "bamazonDB"
});

var queryType = "SELECT * FROM products";

connection.connect(function(err) {
    if (err) throw err;
    console.log("CONNECTED");
})

function startConnection() {
    connection.query(queryType, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            console.log(
                "ID: " + item.item_id + " " +
                "Product Name: " + item.product_name + " " +
                "Price: " + item.price
            );
        }
        inquirer.prompt([{
                type: "input",
                name: "idValue",
                message: "Please enter the product ID you'd like to buy."
            },

            {
                type: "input",
                name: "quantity",
                message: "Please enter how many items you would like to purchase."
            }

        ]).then(function(product) {
            console.log("ID", product.idValue);
            console.log("Quant", product.quantity);
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(product.idValue)) {
                    chosenItem = res[i];
                }
            }
            if (parseInt(product.quantity) < chosenItem.stock_quantity) {
                // fulfill order and update inventory
                connection.query(

                    "UPDATE products SET ? WHERE ?",

                    [{
                            stock_quantity: parseInt(chosenItem.stock_quantity) - parseInt(product.quantity)
                        },

                        {
                            item_id: product.idValue
                        }

                    ],
                    function(err) {
                        if (err) throw err;
                        var customerPrice = product.quantity * chosenItem.price;
                        console.log(`The total price of your purchase is: $${customerPrice}`);
                        anotherPurchase();
                    }
                );
            } else {
                console.log("Inventory is low for that item. Please select a smaller quantity or something else.");
                anotherPurchase();
            }
            // connection.end();
        })
        // connection.end();
    })
    // connection.end();
}

startConnection();

function anotherPurchase() {
  inquirer.prompt([
  {
    type: "list",
    name: "continue",
    message: "Would you like to make another purchase",
    choices: ["yes", "no"]
  }

    ]).then(function(res) {
      if(res.continue === "yes") {
        startConnection();
      } else {
        connection.end();
      }

    })
}


// function promptUserForProduct() {

//   inquirer.prompt([
//     {
//       type: "input",
//       name: "idValue",
//       message: "Please enter the product ID you'd like to buy."
//     },

//     {
//       type: "input",
//       name: "quantity",
//       message: "Please enter how many items you would like to purchase."
//     }

//     ]).then(function(res) {
//       console.log("ID", res.idValue);
//       console.log("Quant", res.quantity);
//     });
// }

// function checkInventory(resId, resQuantity, inventoryItem) {
//   var chosenItem;
//   for(var i = 0; i < results.length; i++) {
//     if(resId === inventoryItem) {
//       chosenItem = results[i];
//       console.log(chosenItem);
//     }
//   }
// }
