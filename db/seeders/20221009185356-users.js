const { User } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            User.create({
                username: 'Jack',
                password: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            User.create({
                username: 'Jill',
                password: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            User.create({
                username: 'John',
                password: '123',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
