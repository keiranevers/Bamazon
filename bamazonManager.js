var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kmclean223',
  database : 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
	inquirer.prompt(
    {
	    name: "action",
      type: "rawlist",
      message: "Would you like to?",
      choices: ["VIEW ALL ITEMS", "VIEW LOW INVENTORY", "ADD INVENTORY", "ADD NEW ITEM", "END"]
    }).then(function(answer) {
      // based on their answer, either call the bid or the post functions or end the set
      if (answer.action.toUpperCase() === "VIEW ALL ITEMS") {
        selectAll();
      } else if (answer.action.toUpperCase() === "VIEW LOW INVENTORY") {
        lowInventory();
      }  else if (answer.action.toUpperCase() === "ADD INVENTORY") {
        addInventory();
      } else if (answer.action.toUpperCase() === "ADD NEW ITEM") {
        addItem();
      } else  if (answer.action.toUpperCase() === "END") {
      	connection.end();
      }
    });
};

function addInventory() {
  //promt  the user to select an item to buy
    inquirer.prompt([
        {
          type: "input",
          name: "item_id",
          message: "Select the Item ID you'd like to add inventory to.",
          filter: Number
        },
        {
          type: "input",
          name: "quantity",
          message: "How many items would you like add to the current inventory?",
          filter: Number
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var currentItem = answer.item_id;
        var currentAmount = answer.quantity;
        //Process transaction if stock_quantity is available, else choose another item and quantity
        connection.query('select * from products where ?',{
          item_id: answer.item_id
        },function(err,results) {
            //update db with quantity of items added
            var newQuantity = (results[0].stock_quantity + currentAmount);
            connection.query('update products set ? where ?',[{
              stock_quantity: newQuantity
            },{
              item_id: currentItem
            }], function(err,results){
              console.log("Thank you!  You've added inventory!");
              start();
            })
          })
        })
      }

function addItem() {
  //promt  the user to select an item to buy
    inquirer.prompt([
        {
          type: "input",
          name: "product_name",
          message: "Enter the product name of the item you'd like to add."
        },
        {
          type: "input",
          name: "department_name",
          message: "Enter the Department the product belongs in.",
        },
        {
          type: "input",
          name: "price",
          message: "Enter the unit price of the item you are adding.",
          filter: Number
        },
        {
          type: "input",
          name: "stock_quantity",
          message: "Enter the quantity of items to add.",
          filter: Number
        }
      ]).then(function(input) {
        // get the item to add from the user input
        var addProduct = input.product_name;
        var addDepartment = input.department_name;
        var addPrice = input.price;
        var addQty = input.stock_quantity;
        //Process transaction if stock_quantity is available, else choose another item and quantity
        connection.query('insert into products set ?',{
          product_name: addProduct,
          department_name: addDepartment,
          price: addPrice,
          stock_quantity: addQty
        },function(err,results) {
            //update db with new items added
            if (err) {
              console.log("Sorry, the items did not load, make sure your values are valid.")
            } else {
              console.log("Thank you!  You've added new inventory!");
            }
              start();
            })
          });
        }

  
function lowInventory() {
  qry = 'select * from products where stock_quantity < 10';
  connection.query(qry, function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);

    }
    start();
  });
};

function selectAll() {
	connection.query("select * from products", function(err, results) {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);

		}
		start();
	});
};





