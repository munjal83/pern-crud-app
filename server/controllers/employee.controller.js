const db = require('../models');
const Employee = db.employees;

exports.create = (req, res) => {

    const employee = {
        name: req.body.name,
        code: req.body.code,
        profession: req.body.profession,
        color: req.body.color,
        city: req.body.city,
        branch: req.body.branch,
        assigned: req.body.assigned ? req.body.assigned : false
    }

    Employee.create(employee)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating an Employee"
            });
        });
};

exports.findAll = (req, res) => {

    Employee.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while fetching employees"
            })
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was updated sucessfully!"
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            })
        })

};

exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message:  `Cannot delete Employee with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id="+ id
            })
        })
};