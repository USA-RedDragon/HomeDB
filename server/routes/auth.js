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
            const user = await request.getModel('User').findOne({
                where: {
                    email: {
                        [Sequelize.Op.iLike]: request.payload.email
                    }
                }
            });

            if (user) {
                const isValid = await bcrypt.compare(request.payload.password, user.password);
                if (isValid) {
                    const session = await request.getModel('Session').create({
                        user_id: user.id
                    });
                    const token = await JWT.sign({
                        session_id: session.id,
                        user_id: user.id,
                        expiry: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                        admin: user.admin
                    }, process.env.APP_KEY);

                    return h.response({ token: token });
                } else {
                    return h.response({ message: 'Invalid email or password.' }).code(401);
                }
            } else {
                return h.response({ message: 'Invalid email or password.' }).code(401);
            }
        },
        options: {
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
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
                const session = await request.getModel('Session').findById(request.auth.credentials.session_id);
                if (session) {
                    session.destroy();
                }
            }
            return h.response().code(204);
        }
    }


];