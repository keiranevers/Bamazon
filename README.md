# bamazon

## Description

This application uses mySql and Inquirer package to create a database app with user input from node js.  bamazonCustomer.js takes order input from a user to create sales.  bamazonManager.js gives manager users the ability to view inventory and add inventory and new items

### MySQL Database Setup

In order to run this application, you will need to have MySQL database already set up on your machine. Once you have mysql installed, you can create the bamazon database using the bamazon.sql file in a query editor.

### Customer Interface

The customer interface allows the user to view the current inventory items.  The user is able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

You must install the npm packages (inquirer and mysql) in order to run on your local machine.

run node bamazonCustomer.js

### Manager Interace

The manager interface allows a user to view all items, as well view low inventory items with a quantity less than 10.  The manager app allows the user to add quantities to existing inventory, as well as add new items to the database.

You must install the npm packages (inquirer and mysql) in order to run on your local machine.

run node bamazonManager.js
