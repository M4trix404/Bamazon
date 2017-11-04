var inquirer = require('inquirer');
var mysql = require('mysql');
var prompt = require ('prompt')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "1234",//Your password
    database: "Bamazon_db"
})

//*
//This logs whether you are connected or not and what is your connection id
//connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected as id " + connection.threadId);
//  };

//**
//This logs all the items in the database as a whole and an object
//connection.query('SELECT * from products, function(err, res) {
// if (err) throw err;
// console.log(res);


var viewAllItems = function() {

    console.log("Here's a list of our products, please make a selection...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++){
            // Pushing into product array.
            console.log("Product Number: " + res[i].id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Price: " + res[i].price + "\n" + "Stock Quantity: " + res[i].stock_quantity + "\n-----------");
        }
        questionOne();
    });
}



function questionOne(){
    inquirer.prompt([
        {
            type: "input",
            message: "Select the number of the product you would you like to buy!",
            name: "selection"

        }

    ]).then(function(answers) {

        connection.query("SELECT * FROM products WHERE id =?", [answers.selection], function(err, res) {
            if (err) throw err;
            console.log("Item details: ");
            console.log("Product name: " + res[0].product_name);
            console.log("Price: $" + res[0].price);
            console.log(res[0].stock_quantity + " left in stock.");

            questionTwo(res);


        });
    });
}

function questionTwo(res){
    inquirer.prompt([
        {
            type: "input",
            message: "How many items would you like to buy?",
            name: "selection"

        }

    ]).then(function(answers) {

        if(answers.selection < res[0].stock_quantity){
            console.log("Cart loaded, Enjoy!");
            var updatedStock = res[0].stock_quantity - answers.selection;
            update(res, updatedStock);
        }
        else {

            console.log("Sorry! We don't have that many available!");
            viewAll();

        }


    });
}

function update(res, updatedStock) {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updatedStock
            },
            {
                product_name: res[0].product_name
            }

        ],
        function(err, res) {
            // console.log("Thanks for shopping with us!");
            connection.end();


        }
    );
}

