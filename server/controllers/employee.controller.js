const db = require('../models');

const Employee = db.employees;

exports.create = async (req, res) => {

    const { name, code, profession, color, city, branch, assigned } = req.body;
    const employee = {
        name,
        code,
        profession,
        color,
        city,
        branch,
        assigned: assigned ? assigned : false
    }

    const data = await Employee.create(employee)
    try {
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating an Employee"
        });
    };
};

exports.findAll = async (req, res) => {

    const data = await Employee.findAll()
    try {
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occured while fetching employees"
        })
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    const data = await Employee.findByPk(id)
    try {
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Employee with id=" + id
        });
    };
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

exports.delete = async (req, res) => {
    const id = req.params.id;

    await Employee.destroy({
        where: { id: id }
    })
    try {
        data => {
            if (data == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}`
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Employee with id=" + id
        })
    }
};
