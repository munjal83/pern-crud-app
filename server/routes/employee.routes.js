module.exports = app => {
    const employees = require('../controllers/employee.controller')

    const router = require('express').Router();

    router.post("/", employees.create);

    router.get("/:id", employees.findOne);

    router.get("/", employees.findAll);

    router.put("/:id", employees.update);

    router.delete("/:id", employees.delete);

    app.use('/api/employees', router)
}
