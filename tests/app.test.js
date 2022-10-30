const { User, sequelize } = require('../src/models/index');
const {
    registerUser,
    updateUser,
    deleteExistingUser,
} = require('../src/services/users/write');
const { fetchAllUsers, fetchOneUser } = require('../src/services/users/read');
const { up: table } = require('../db/migrations/20221009185040-create-user');
const { up: seed } = require('../db/seeders/20221009185356-users');
const Sequelize = require('sequelize');

const truthy_user = 'Jack';
const truthy_password = '123';

const falsey_user = 'Kai';
const falsey_password = '321';

const new_user = 'Har';
const new_user_pass = '123';

process.env.JWT_SECRET = 'jest123';

beforeAll(async () => {
    console.log('db connection init');
    console.log('creating users table...');
    //migrations
    await table(sequelize.getQueryInterface(), Sequelize);
    console.log('seeding users...');
    await seed();
    console.log('users seeded.');
});

afterAll(async () => {
    await sequelize.close();
    console.log('db connection closed');
});

describe('Auth Service', () => {
    it('should login user and return jwt', async () => {
        expect(
            await User.authenticate(truthy_user, truthy_password)
        ).toBeTruthy();
    });

    it('should throw error if username incorrect', async () => {
        expect(await User.authenticate(falsey_user, truthy_password)).toEqual(
            Error('Invalid password or username.')
        );
    });

    it('should throw error if password incorrect', async () => {
        expect(await User.authenticate(truthy_user, falsey_password)).toEqual(
            Error('Invalid password or username.')
        );
    });
    it('should find user by token', async () => {
        //authenticate registered user and generate token.
        const token = await User.authenticate(truthy_user, truthy_password);
        expect(await User.findByToken(token)).toBeTruthy();
    });
    it('should throw error if token is invalid', async () => {
        const invalid_token = 'badtok33';
        expect(await User.findByToken(invalid_token)).toEqual(
            Error('Token is either Invalid or has expired.')
        );
    });
    it('should return the same user that was authenticated', async () => {
        const token = await User.authenticate(truthy_user, truthy_password);
        const user = await User.findByToken(token);
        expect(user.id).toEqual(1);
    });
});

describe('Register Service', () => {
    it('should return a token on successful registration', async () => {
        expect(
            await registerUser({ username: new_user, password: new_user_pass })
        ).toBeTruthy();
    });

    it('should return error if username already exists', async () => {
        expect(
            await registerUser({ username: new_user, password: new_user_pass })
        ).toEqual(Error('This user is already activated.'));
    });
});

describe('Write Service', () => {
    it('should update the user\'s "username"', async () => {
        const newName = 'kacj';
        await updateUser({ username: newName }, { id: 1 });
        expect(
            (await User.findOne({ where: { username: newName } })).username
        ).toEqual('kacj');
    });
    it("should return an error if the user's updated name is already associate with another account", async () => {
        const newName = 'John';
        expect(await updateUser({ username: newName }, { id: 1 })).toEqual(
            Error(
                "Sorry, we can't let you do that. This username is already taken."
            )
        );
    });
    it('should remove a user if their account is terminated', async () => {
        //find the id of John to test deletion
        const { id } = await User.findOne({ where: { username: 'John' } });
        await deleteExistingUser(id);
        expect(await User.findOne({ where: id })).toBeFalsy();
    });
});

describe('Read Service', () => {
    it('should fetch all users', async () => {
        const users = await fetchAllUsers();
        expect(users.length).toEqual(3);
    });
    it('should fetch one user', async () => {
        //Use Jill's id to check fetchOne
        const user = await fetchOneUser(2);
        expect(user).toBeTruthy;
        expect(user.username).toEqual('Jill');
    });
});

describe('Middleware Service', () => {
    it('should find user by token and return the user', () => {});
});
