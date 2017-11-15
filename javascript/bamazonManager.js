var inquirer = require("inquirer");
var mysql = require("mysql");

// Inquirer Prompt for manager options
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rolltribe1",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
})

function showManagerMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to check on?",
      choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
               ]
    }

    ]).then(function(res){
        checkPromptAnswer(res.menu);
    })
}

showManagerMenu();

function checkPromptAnswer(res) {
  switch(res) {
    case "View Products for Sale":
    viewProductsForSale();
    break;

    case "View Low Inventory":
    viewLowInventory();
    break;

    case "Add to Inventory":
    addToInventory();
    break;

    case "Add New Product":
    console.log("Add new product");
    addNewProduct();
    break

    default:
    "Please select an option!"
  }
}

function viewProductsForSale() {
  console.log("View products function now running...");
  var queryAllProducts = "SELECT * FROM products";
  connection.query(queryAllProducts, function(err, res) {
        if (err) throw err;
        console.log("\n" + "Here are the current items for sale:" + "\n");
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            console.log(
                "ID: " + item.item_id + " " +
                "Product Name: " + item.product_name + " " +
                "Price: " + item.price
            );
        }
        showManagerMenu();
  })
}

function viewLowInventory() {
  var queryProductsLessThanFive = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(queryProductsLessThanFive, function(err,res) {
    if(err) throw err;
    console.log("\n" + "Here are the current products that have less than five items in their inventory:" + "\n");
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            console.log(
                "ID: " + item.item_id + " " +
                "Product Name: " + item.product_name + " " +
                "Price: " + item.price +
                "\n"
            );
        }
    showManagerMenu();
  })
}

function addToInventory() {
  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message: "Please enter the product name you'd like increase the inventory for:"
    },
    {
      type: "input",
      name: "quantity",
      message: "Please enter the amount you'd like to add to this product inventory:"
    }

    ]).then(function(res) {
      updateInventoryWithUserQuantity(res);
    })
}

function updateInventoryWithUserQuantity(res) {
  // SELECT ALL FROM PRODUCTS
  // check if prompt res === name of product in table
  // If so then update table with the quantity user inputed
  var queryAll = "SELECT * FROM PRODUCTS";
  connection.query(queryAll, function(err, table) {
    if(err) throw err;
    var chosenItem = '';
    for (var i = 0; i < table.length; i++) {
      var item = table[i];
      if(item.product_name === res.product) {
        chosenItem = item;
      };
    } 
      connection.query(
                    "UPDATE products SET ? WHERE ?", 
                    [
                      {
                        stock_quantity: chosenItem.stock_quantity + parseInt(res.quantity)
                      },
                      {
                        item_id: chosenItem.item_id
                      }
                    ], function(err) {
                    if (err) throw err;
                    console.log("Product inventory updated.");
                    showManagerMenu();
                  }) 
  })
};

function addNewProduct() {
  inquirer.prompt([
      {
        type: "input",
        name: "product",
        message: "What is the name of the product you would like to add?"
      },

      {
        type: "input",
        name: "department",
        message: "Which department should this product be placed?"
      },

      {
        type: "input",
        name: "price",
        message: "What is the price for this item?"
      },

      {
        type: "input",
        name: "quantity",
        message: "How many items of this product would you like to add to inventory?"
      },

    ]).then(function(res){
      var newProduct = {product_name: res.product, department_name: res.department, price: res.price, stock_quantity: res.quantity}
      var query = connection.query('INSERT INTO products SET ?', newProduct, function(err, res) {
        if (err) throw err;
          console.log("Product Added.");
      showManagerMenu();
  }) 
 
  })
}


// function showManagerMenu() {
//   inquirer.prompt([
//     {
//       type: "list",
//       name: "menu",
//       message: "What would you like to check on?",
//       choices: ["View Products for Sale",
//                 "View Low Inventory",
//                 "Add to Inventory",
//                 "Add New Product"
//                ]
//     }

//     ]).then(function(res){
//         checkPromptAnswer(res.menu);
//     })
// }

// Switch statement for manager selection

// Functions for each case