module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        name: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        profession: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        assigned: {
            type: Sequelize.BOOLEAN
        },
    }, {
        tableName: 'employees'
    });
    return Employee;
}
