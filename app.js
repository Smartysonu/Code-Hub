require('dotenv').config();
let express = require("express");
let data = require("./data");
let app = express();
let employee = require("./employee");
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const products_routes = require("./routes/product")
// middleware && route
app.use(express.json());

app.use("/api/product", products_routes);


// ********************************************************************************
const start = async () =>{
  try{
    await connectDB();
    app.listen(PORT, () => {
      console.log(`${PORT} yes i am connected`)
    })
  }
  catch(error){
    console.log(error);
  }
}
start();
// ******************************************************************************

//get request
app.get("/", (req, res) => {
  res.send("Hello Sonu");
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/employee", (req, res) => {
  res.json(employee);
});
//post request
app.post("/api/employee", (req, res) => {
  if (!req.body.email) {
    res.status(400);
    return res.json({ error: "email is not present please add the email" });
  }

  let employeeDetails = {
    id: employee.length + 1,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    company: req.body.company,
    email: req.body.email,
  };

  employee.push(employeeDetails);
  res.json(employeeDetails);

  res.send("Got a PUT request at employee");
  console.log(req.body);
});
//put request
app.put("/api/employee/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let age = req.body.age;
  let gender = req.body.gender;
  let company = req.body.company;
  let email = req.body.email;

  let index = employee.findIndex((x) => {
    return x.id == Number.parseInt(id);
  });

  console.log("index", index);

  if (index >= 0) {
    let emp = employee[index];
    emp.name = name;
    emp.age = age;
    emp.gender = gender;
    emp.company = company;
    emp.email = email;
    res.json(emp);
  } else {
    res.status(400);
    res.end();
  }
  res.json(id);
});

// DELETE METHOD
app.delete("/api/employee/:id", (req, res) => {
  let id = req.params.id;
  let index = employee.findIndex((x) => {
    return x.id == Number.parseInt(id);
  });
  if (index >= 0) {
    let emp = employee[index];
    employee.splice(index, 1);
    res.json(emp);
  } else {
    res.status(400);
    res.end();
  }

  res.json(id);
});

module.exports = app;
