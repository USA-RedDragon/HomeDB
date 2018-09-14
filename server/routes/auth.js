'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Sequelize = require('sequelize');

module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        handler: async (request, h) => {
            const user = await request.getModel('users').findOne({
                where: {
                    username: {
                        [Sequelize.Op.eq]: request.payload.username
                    }
                }
            });

            if (user) {
                const isValid = await bcrypt.compare(request.payload.password, user.password);
                if (isValid) {
                    const session = await request.getModel('sessions').create({
                        user: user.id
                    });
                    const token = await JWT.sign({
                        session_id: session.id,
                        user_id: user.id,
                        expiry: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                        admin: user.admin
                    }, process.env.APP_KEY);

                    return h.response({ token: token });
                } else {
                    return h.response({ message: 'Invalid username or password.' }).code(401);
                }
            } else {
                return h.response({ message: 'Invalid username or password.' }).code(401);
            }
        },
        options: {
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/register',
        handler: async (request, h) => {
            var user = await request.getModel('users').findOne({
                where: {
                    [Sequelize.Op.or]: [
                        {username: request.payload.username},
                        {email: request.payload.email},
                        {phone_number: request.payload.phone_number}
                    ]
                }
            });

            if (user) {
                if(user.username == request.payload.username)
                    return h.response({ message: 'Username already registered' }).code(401);
                if(user.email == request.payload.email)
                    return h.response({ message: 'Email already registered' }).code(401);
                if(user.phone_number == request.payload.phone_number)
                    return h.response({ message: 'Phone number already registered' }).code(401);
                return h.response({ message: 'Unknown error.' }).code(401);
            } else {
                user = await request.getModel('users').create({
                    name: request.payload.name,
                    username: request.payload.username,
                    email: request.payload.email,
                    phone_number: request.payload.phone_number,
                    password: await bcrypt.hash(request.payload.password, 10)
                });

                const session = await request.getModel('sessions').create({
                    user: user.id
                });

                const token = await JWT.sign({
                    session_id: session.id,
                    user_id: user.id,
                    expiry: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                    admin: user.admin
                }, process.env.APP_KEY);

                return h.response({ token: token });
            }
        },
        options: {
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    name: Joi.string().required(),
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    email: Joi.string().required(),
                    phone_number: Joi.string().required()
                }
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/logout',
        handler: async (request, h) => {
            if (request.auth.credentials) {
                const session = await request.getModel('sessions').findById(request.auth.credentials.session_id);
                if (session) {
                    session.destroy();
                }
            }
            return h.response().code(204);
        }
    },
    {
        method: 'POST',
        path: '/api/usernameExists',
        handler: async (request, h) => {
            const user = await request.getModel('users').findOne({
                where: {
                    username: {
                        [Sequelize.Op.eq]: request.payload.username
                    }
                }
            });

            if (user)
                return h.response({ exists: true });
            else
                return h.response({ exists: false });
        },
        options: {
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    username: Joi.string().required(),
                }
            },
            auth: false
        }
    }
];