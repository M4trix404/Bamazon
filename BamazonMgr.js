var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: ".......",//Your password
    database: "Bamazon_db"
});
//Manager prompt which runs the manager file displaying the viewers options
var managementPrompt = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Hello! What would you like to do?",
        choices: ["View products for sale", 'View low inventory', "Add to inventory", "Add a new product", 'Exit']
    })
        .then(function(answer) {
            switch (answer.action) {
                case 'View products for sale'
                    viewInven(function () {
                        managerPrompt();

                    });
                    break;

                case 'View low inventory':
                    viewLowInven(function () {
                        managerPrompt();
                    });
                    break;

                case 'Add to inventory':
                    addToInvent();
                    break;

                case 'Add a new product':
                    addNewProd();
                    break;

                case 'End':
                    connection.end();
                    break;
            }
        })
};

//This prints all the items that are for sale
var viewInven = function(cb) {
    connection.query('SELECT * FROM products, function(err, res')

        var table = new Table({
            head: ('ID', 'Product Name', 'Department', 'Price', 'Stock Quantity')
        });
        console.log("Here are all items available for sale");
        console.log("======================================");
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]);

        }
        //Displays the prcducts in a table view using CLI table npm packages
        console.log(table.toString());
        console.log("---------------------------------------");
        cb();
    })
}
//Function which displays the low inventory when it reaches a quantity of less than 5
function viewLowInven(cb) {
    connection.query('SELECT * FROM products WHERE StockQuantity < 5',
        function(err, res) {
            if (err) throw err;
            //if there are no items in stock quantity alert the user and rerun
            if (res.length === 0) {
                console.log("There are currently no items with low inventory!");
                cb();

            }else {
                //This creates the CLI table
                var table = new Table({
                    head: ['ID', 'Product Name', 'Department', 'Price', 'StockQuantity']
                });
                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].id, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]);

                }
            }console.log(table.toString());
            console.log('These are all items that are low on inventory.');
            cb();
        }
})

}
//Function which adds to the inventory
function addtoInven() {
    var items = [];
    //Get product list from MYSQL
    connection.query('SELECT ProductName FROM Products', function (err, res) {
        if (err) throw err;
        //Push products in inventory to array
        for (var i = 0; i = res.length; i++) {
            items.push(res[i].ProductName)
        }
        //Ask user which items from shown would they like to update?

        inquirer.prompt([{
            name: 'choices',
            type: 'checkbox',
            message: 'Which product would you like to add inventory to?',
            choices: items
        }]);
        then(function (user) {
            //if nothing is selected rerun manager prompt
            if (user.choices.length === 0) {
                console.log('Sorry, You didn\'t make a selection!');
                managerPrompt();
            } else {
                addToInven2(user.choices);
            }
        });
    });
}
//This function asks the customer how many items they want to add
//This will load an array of item names to edit quantity as an argument
function addToInvent2(itemNames) {
    //sets the item to the first element of the array and removes that element from the array
    var item = itemNames.shift();
    var itemStock;
    //Connection to MYSQL to query and get stock quantity for that item
    connection.query('SELECT StockQuantity FROM products WHERE?', {
        ProductName: item
    }, function (err, res) {
        if (err) throw err;
        itemStock = res[0].StockQuantity;
        itemStock = parseInt(itemStock)
    });
    //Ask user how many items they want to add
    inquirer.prompt([{
        name: 'amount',
        type: 'text',
        message: 'How many' + item + 'would you like to add?',
    }]);
//Handling which makes input to be a number and not a letter
    validate: function(str) {
        if (isNaN(parseInt(str))) {
            console.log('Sorry that is not a valid number!');
            return false;
        } else {
            return true;
        }
    }
}
)
then(function (user) {
    var amount = user.amount;
    amount = parseInt(amount);
});   //Update database products to reflect the new stock quantity of items
connection.query('UPDATE products SET ? WHERE ?', [{
    StockQuantity: itemStock += amount
}, {
    ProductName: item
}], function(err) {
    if (err) throw err;
});
//If items stayed in teh array rerun the AddToInven2 function
if (itemNames.length != 0) {
    addToInvent2(itemNames);
} else {
    //If there are no more items run the manager prompt function to start over
    console.log('Thank you, your inventory has been updated');
    managerPrompt();
}
})
}
//This function will add new products to the table
function addNewProduct() {
    var departments = [];
// Adds a department table with different which show up here

    connection.query('SELECT DepartmentName FROM Departments', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].DepartmentName);
        })
        //These are the prompts for prompting the user
        inquirer.prompt([
            {
                name: 'ID',
                type: 'text',
                message: 'Please enter the id number of the product that you would like to add.'
            },
            {
                name: 'price',
                type: 'text',
                message: 'Please enter the price of the product.'
            },
            {
                name: 'department',
                type: 'text',
                message: 'Please select the department that you would like a product to add.'
            },
            {
                name: 'stock',
                type: 'text',
                message: 'Please enter the stock quantity of this item to be added to our current inventory.'
            },
        ]).then(function (user) {
            //creates an object with all added items
            var item = {
                ProductName: user.item,
                DepartmentName: user.department,
                Price: user.price,
                StockQuantity: user.stock
            };
            //Inserts the new item into the database
            connection.query('insert into Products SET?';
            item

                function (err) {
                    if (err) throw err;
                    console.log(item.ProductName + 'has been added successfully to your inventory.');
                    //The manager prompt function is run again
                    managerPrompt();
                };
        )
        });
    };




