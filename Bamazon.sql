CREATE DATABASE bamazon;
use bamazon;
create table products (
	item_id integer(11) auto_increment not null,
	product_name varchar(30) not null,
	department_name varchar(20) not null,
	price decimal(10,2) not null,
	stock_quantity integer(11) not null,
	primary key (item_id)
);
insert into products (product_name, department_name, price, stock_quantity)
values 
("Bag of Oranges", "Produce", 3.59, 35),
("Bag of Apples", "Produce", 4.49, 42),
("Bunch of Bananas", "Produce", 2.99, 29),
("Avacado", "Produce", 3.99, 15),
("Pop Tarts", "Grocery", 1.79, 28),
("Milk", "Dairy", 3.69, 14),
("Butter", "Dairy", 4.59, 15),
("Cereal", "Grocery", 1.19, 22),
("Bagles", "Grocery", 2.27, 10),
("English Muffins", "Grocery", 1.59, 35),
("Yogurt", "Dairy", 1.18, 26),
("Ground Beef", "Meat", 3.59, 9),
("Ground Turkey", "Meat", 4.59, 8);
select * from products;
