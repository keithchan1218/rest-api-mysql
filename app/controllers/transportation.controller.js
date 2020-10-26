const db = require("../models");
const Transportation = db.Transportation;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const item = {
        name: req.body.name,
        capacity: req.body.capacity,
        enabled: req.body.enabled ? req.body.enabled : false
    };

    // Save Tutorial in the database
    console.log('00000');
    Transportation.create(item)
        .then(data => {
            console.log('111111');
            res.send(data);
        })
        .catch(err => {
            console.log('222222');
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });

        console.log('333333');
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Transportation.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transportations."
            });
        });
};

exports.findOne = (req, res) => {
    const name = req.params.name;

    Transportation.findByPk(name)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Transportation with name=" + name
            });
        });
};

exports.update = (req, res) => {
    const name = req.params.name;

    Transportation.update(req.body, {
        where: { name: name }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transportation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Transportation with name=${name}. Maybe Transportation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transportation with name=" + name
            });
        });
};

exports.delete = (req, res) => {
    const name = req.params.name;

    Transportation.destroy({
        where: { name: name }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Transportation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Transportation with name=${name}. Maybe Transportation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transportation with name=" + name
            });
        });
};

exports.deleteAll = (req, res) => {
    Transportation.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Transportations were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Transportations."
            });
        });
};

exports.findAllEnabled = (req, res) => {
    Transportation.findAll({ where: { enabled: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Transportations."
            });
        });
};