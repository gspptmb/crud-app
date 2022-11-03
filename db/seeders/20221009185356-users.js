const { registerUser } = require('../../src/api/services/users/write');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            await registerUser({
                username: 'Jack',
                password: '123',
            }),
            registerUser({
                username: 'Jill',
                password: '123',
            }),
            registerUser({
                username: 'John',
                password: '123',
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
