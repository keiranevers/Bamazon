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
      choices: ["VIEW ALL ITEMS", "BUY ITEM", "END"]
    }).then(function(answer) {
      // based on their answer, either call the bid or the post functions or end the set
      if (answer.action.toUpperCase() === "VIEW ALL ITEMS") {
        selectAll();
      } else if (answer.action.toUpperCase() === "BUY ITEM") {
        buyItem();
      } else  if (answer.action.toUpperCase() === "END") {
      	connection.end();
      }
    });
};

function buyItem() {
  //promt  the user to select an item to buy
    inquirer.prompt([
        {
          type: "input",
          name: "item_id",
          message: "Select the Item ID you'd like to purchase."
        },
        {
          type: "input",
          name: "quantity",
          message: "How many of the items would you like to purchase?"
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var currentItem = answer.item_id;
        var currentAmount = answer.quantity;
        //Process transaction if stock_quantity is available, else choose another item and quantity
        connection.query('select * from products where ?',{
          item_id: answer.item_id
        },function(err,results) {
          if(currentAmount > results[0].stock_quantity) {
            console.log("Sorry, we do not have enough of those items in stock!");
            buyItem();
          } else {
            console.log("Thank you.  I will check you out!");

            //update db with remaining quantity of purchased item
            var newQuantity = (results[0].stock_quantity - currentAmount);
            var totalCost = (results[0].price*currentAmount);
            connection.query('update products set ? where ?',[{
              stock_quantity: newQuantity
            },{
              item_id: currentItem
            }], function(err,results){
              console.log("Thank you!  You were charged $" + totalCost + ". Please come again!");
              start();
            })
          }
        })
      })
    }

function selectAll() {
	connection.query("select * from products", function(err, results) {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);

		}
		start();
	});
};




//connection.end();
