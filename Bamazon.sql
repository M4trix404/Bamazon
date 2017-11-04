
CREATE DATABASE Bamazon;

 USE Bamazon;


CREATE TABLE Products (

  ID INTEGER(11) AUTO_INCREMENT NOT NULL,
  --unique id for each product--
  Product_name VARCHAR(30) NOT NULL,
  --name of product--
  Department_name VARCHAR(30) NOT NULL,
  --department name of product--
  Price INTEGER(200) NOT NULL,
  --price of product--
  Stock_Quantity INTEGER(200) NOT NULL,
  --number of items currently in stock--
 Primary Key (id)
);

DROP TABLE products;

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("4312", "iPad", "electronics", 549.99, 60);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2315", "iPod", "electronics", 129.99, 100);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2317", "Bose", "electronics", 99.99, 50);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("3208", "Kettlebell", "equipment", 39.99, 40);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("3321", "Dumbbells", "equipment", 24.99, 61);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2913", "Jumprope", "equipment", 15.99, 58);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2210", "Megabars", "nutrition", 11.99, 43);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("1298", "Wheygood", "nutrition", 36.99, 37);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2335", "Speltbars", "nutrition", 9.99, 25);

INSERT INTO products (ID, product_name, department_name, price, stock_quantity)
VALUES ("2564", "Red Tote", "luggage", 59.99, 30);

SELECT * FROM products;

select item_id, product_name, price from products;

select * from products where id=1;

select * from products where product_name like '%Spelt%';

update products

set