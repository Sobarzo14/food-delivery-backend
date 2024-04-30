const express = require("express");
const cors = require("cors");
const fs = require("fs");
var bodyParser = require('body-parser')
const PORT = 3000;
const app = express()

app.use(cors());


// GET Methods


app.get("/login/:username/:password", (req, res) => {
    const username = req.params.username;
    let exists = false;
    fs.readFile("./database/users.json", (err, data) => {
        let json = JSON.parse(data);
        json.forEach((element) => {
            if (element.username = username) {
                exists = true;
            }
        });
        console.log(exists)
        res.send(exists);
    })
});

app.get("/getMenu/:restaurant", (req, res) => {
    fs.readFile("./database/restaurants.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.restaurants;
        json.forEach(element => {
            if (req.params.restaurant == element.name) {
                res.send(element.menu);
            }
        });
    })
});

app.get("/getAll/", (req, res) => {
    fs.readFile("./database/restaurants.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.restaurants;
        res.send(json)
    })
});

app.get("/getOrder/", (req, res) => {
    fs.readFile("./database/orders.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.currentOrder;
        res.send(json)
    })
});

app.get("/getOrders/", (req, res) => {
    fs.readFile("./database/orders.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.pastOrders;
        res.send(json)
    })
});

// POST Methods

app.post("/addRestaurant/", (req, res) => {
    const name = req.body;
    console.log(name)
    fs.readFile("./database/users.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.restaurants;
        json.push(addedRestaurant);
        fs.writeFile("reservations.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        });
    });
})

app.post("/signup/:user/:password", (req, res) => {
    const user = req.params.user;
    const password = req.params.password;
    const addedUser = {
        username: user,
        password: password,
        page: "./views/dashboard.html"
    }
    fs.readFile("./database/users.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.users;
        json.push(addedUser);
        fs.writeFile("./database/users.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        });
    });
})

app.put("/addToOrder/:item", (req, res) => {
    fs.readFile("./database/restaurants.json", (err, data) => {
        let json = JSON.parse(data);
        json = json.restaurants;
        json.forEach(element => {
            element.menu.forEach(item => {
                if (item.name == req.params.item) {
                    fs.readFile("./database/orders.json", (err, data) => {
                        let json = JSON.parse(data);
                        console.log(json)
                        let tempArray = json.currentOrder.order;
                        json.currentOrder.total += item.price;
                        tempArray.push(item);
                        json.currentOrder.order = tempArray;
                        fs.writeFile("./database/orders.json", JSON.stringify(json), (err) => {
                            if (err) throw err;
                        });
                    });
                }
            })
        });
    });

});

app.put("/checkOut", (req, res) => {
    fs.readFile("./database/orders.json", (err, data) => {
        let json = JSON.parse(data);
        console.log(json)
        let currentOrder = json.currentOrder;
        json.pastOrders.push(currentOrder);
        json.currentOrder = {
            id: json.pastOrders.length,
            order: [],
            total: 0,
            review: ""
        }
        console.log(json)
        fs.writeFile("./database/orders.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        });
    });
});

// DELETE Methods

app.delete("/deleteOrder/:id", (req, res) => {
    let id = req.params.id
    fs.readFile("./database/orders.json", (err, data) => {
        let json = JSON.parse(data);
        const index = json.pastOrders.findIndex(item => item.id == id);
        if (index != -1) {
            json.pastOrders.splice(index, 1);
            fs.writeFile("./database/orders.json", JSON.stringify(json), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
            })
        }
    });
});

app.delete("/deleteOrders", (req, res) => {
    fs.readFile("./database/orders.json", (err, data) => {
        let json = JSON.parse(data);
        json.pastOrders = [];
        fs.writeFile("./database/orders.json", JSON.stringify(json), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
        })
    });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});