const request = require("supertest")
const app = require('../../../app')
require('mysql2/node_modules/iconv-lite').encodingExists('foo')
const db = require('../../models/index')
const User = db.sequelize.models.User
const { hashPassword } = require("../../utils/pwd_hasher")
const { v4: uuid } = require('uuid')
const moment = require('moment')
const { generateJwt } = require('../../utils/generateJwt')

const Token1 = uuid()
const Token2 = uuid()
const userId = uuid()
const expiry = moment().add(15, 'm')
let jwtToken
beforeAll(async () => {
    const { token } = await generateJwt("test3@test.com", userId)
    jwtToken = token
    const hashedPassword = await hashPassword('12345678')
    await db.sequelize.sync({ force: true })
    await User.create({
        email: "test1@test.com", //user no activated account
        password: hashedPassword,
        emailToken: Token1,
        emailTokenExpires: expiry,
        resetPasswordToken: Token1,
        resetPasswordExpires: expiry
    });
    await User.create({
        email: "test3@test.com", //user with actived account
        password: hashedPassword,
        accessToken: jwtToken,
        active: 1,
        emailToken: Token2,
        emailTokenExpires: expiry,
        resetPasswordToken: Token2,
        resetPasswordExpires: moment().subtract(15, 'm')
    });
});

describe('userController Sign Up', () => {

    let validFormData = {
        email: "test1@test.com",
        password: "12345678",
        confirmPassword: "12345678"
    }

    it('should fail with invalid form data', async (done) => {
        const email = "dza@zad"
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                ...validFormData,
                email
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        done()
    }),
        it('should fail if email already exist', async (done) => {
            const res = await request(app)
                .post('/api/users/signup')
                .send(
                    validFormData
                )
            expect(res.body).toStrictEqual({
                error: true,
                message: "Email is already in use"
            })
            done()
        }),
        it('should fail sending email', async (done) => {
            const email = "dyder1493@gmail.com"
            const res = await request(app)
                .post('/api/users/signup')
                .send({
                    ...validFormData,
                    email
                })
            expect(res.statusCode).toEqual(500)
            expect(res.body).toHaveProperty('error')
            done()
        })
})

describe('userController Login', () => {

    let validFormData = {
        email: "test3@test.com",
        password: "12345678"
    }

    it('should fail invalid formData', async (done) => {
        const email = "dza@zad"
        const res = await request(app)
            .post('/api/users/login')
            .send({
                ...validFormData,
                email
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        done()
    }),
        it('should fail no user found', async (done) => {
            const email = "test2@test.com"
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    ...validFormData,
                    email
                })
            expect(res.statusCode).toEqual(500)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Account not found"
            })
            done()
        }),
        it('should fail account not verified', async (done) => {
            const email = "test1@test.com"
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    ...validFormData,
                    email
                })
            expect(res.statusCode).toEqual(500)
            expect(res.body).toStrictEqual({
                error: true,
                message: "You must verify your email to activate your account"
            })
            done()
        }),
        it('should fail invalid password', async (done) => {
            const password = '12345678910'
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    ...validFormData,
                    password
                })
            expect(res.statusCode).toEqual(500)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Invalid password"
            })
            done()
        }),
        it('should success', async (done) => {
            const res = await request(app)
                .post('/api/users/login')
                .send(validFormData)
            expect(res.body).toHaveProperty('success')
            done()
        })
})

describe('userController activate', () => {

    it('should fail no id param', async (done) => {
        const res = await request(app)
            .patch(`/api/users/activate/`)
        expect(res.statusCode).toEqual(400)
        expect(res.body).toStrictEqual({
            error: true,
            message: "Please make a valid request"
        })
        done()
    }),
        it('should fail invalid details', async (done) => {
            const res = await request(app)
                .patch(`/api/users/activate/123456`)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Invalid details"
            })
            done()
        }),
        it('should fail already activated', async (done) => {
            const res = await request(app)
                .patch(`/api/users/activate/${Token2}`)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Account already activated"
            })
            done()
        }),
        it('should success', async (done) => {
            const res = await request(app)
                .patch(`/api/users/activate/${Token1}`)
            expect(res.statusCode).toEqual(200)
            expect(res.body).toStrictEqual({
                success: true,
                message: "Account activated"
            })
            done()
        })
})

describe('userController forgot password', () => {
    let validFormData = {
        email: "test3@test.com"
    }
    it('should fail invalid email format', async (done) => {
        const email = 'test'
        const res = await request(app)
            .patch(`/api/users/forgot`)
            .send({
                ...validFormData,
                email
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        done()
    }),
        it('should fail not user found', async (done) => {
            const email = 'test2@test.com'
            const res = await request(app)
                .patch(`/api/users/forgot`)
                .send({
                    ...validFormData,
                    email
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toStrictEqual({
                error: true,
                message: "If that email address is in our database, we will send you an email to reset your password"
            })
            done()
        }),
        it('should fail', async (done) => {
            const res = await request(app)
                .patch(`/api/users/forgot`)
                .send(validFormData)
            expect(res.statusCode).toEqual(500)
            done()
        })
})

describe('userController reset password', () => {
    let validFormData = {
        token: Token2,
        newPassword: "12345678",
        confirmPassword: "12345678"
    }

    it('should fail invalid format', async (done) => {
        const confirmPassword = 'test'
        const res = await request(app)
            .patch(`/api/users/reset`)
            .send({
                ...validFormData,
                confirmPassword
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        done()
    }),
        it('should fail get user by token', async (done) => {
            const token = '123'
            const res = await request(app)
                .patch(`/api/users/reset`)
                .send({
                    ...validFormData,
                    token
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Password reset token is invalid or has expired."
            })
            done()
        }),
        it('should fail expired token', async (done) => {
            const res = await request(app)
                .patch(`/api/users/reset`)
                .send(validFormData)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toStrictEqual({
                error: true,
                message: "Password reset token is invalid or has expired."
            })
            done()
        }),
        it('should success', async (done) => {
            const token = Token1
            const res = await request(app)
                .patch(`/api/users/reset`)
                .send({
                    ...validFormData,
                    token
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toStrictEqual({
                success: true,
                message: "Password has been changed"
            })
            done()
        })
})

//should test logout 