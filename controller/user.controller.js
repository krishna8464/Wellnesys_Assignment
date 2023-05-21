
const fs = require("fs");


//Handle GET requests to "/api/users" and retrieve user information from the JSON file.
const getUser = (req, res) => {
  fs.readFile(`./config/db.json`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const users = JSON.parse(data);
      res.json(users);
    }
  });
};


//Handle POST requests to "/api/users" and save user information to a JSON file.
const saveUser = (req, res) => {
  let newUser = req.body;
  fs.readFile(`./config/db.json`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      data = JSON.parse(data);
      data.users.push(newUser);
      fs.writeFile("./config/db.json", JSON.stringify(data), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(201).json("User created successfully");
        }
      });
    }
  });
};



module.exports = { saveUser, getUser };