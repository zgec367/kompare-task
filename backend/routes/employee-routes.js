const router = require("express").Router();

let Employee = require("../models/employee.model");

router.route("/").get((req, res) => {
  Employee.find()
    .then((employees) => {
      console.log(employees);
      res.json(employees);
    })
    .catch((err) => res.status(400).send("Something went wrong"));
});

router.route("/add").post((req, res) => {
  console.log("ADD USAO");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  if (firstName && lastName && email) {
    const newEmployee = new Employee({ firstName, lastName, email });
    newEmployee
      .save()
      .then((employees) => {
        console.log(employees);
        res.json(employees);
      })

      .catch((err) => res.status(400).send("Something went wrong"));
  }
});

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted."))
    .catch((err) => res.status(400).json("Something went wrong"));
});

module.exports = router;
