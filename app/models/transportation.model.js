
// Define Transportation
module.exports = (sequelize, Sequelize) => {
    const Transportation = sequelize.define("transportation", {
        name: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.STRING
        },
        enabled: {
            type: Sequelize.BOOLEAN
        }
    });

    return Transportation;
};