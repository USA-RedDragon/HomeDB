'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');

module.exports = [
  {
    method: 'GET',
    path: '/api/user',
    handler: (request, h) => {
      if(!request.auth.credentials.admin){
        return h.response().code(403);
      }
      const User = request.getModel('users');
      return User.findAll().then(models => {
        return models;
      });
    }
  },
  {
    method: 'GET',
    path: '/api/user/{id}',
    handler: (request, h) => {
      const User = request.getModel('users');

      // users can read their own user
      if(request.params.id !== 'current' && !request.auth.credentials.admin){
        return h.response().code(403);
      }

      const user_id = (request.params.id === 'current' ? request.auth.credentials.user_id : request.params.id);

      return User.findById(user_id, {attributes: {exclude: ['password']}}).then(user => {
        return h.response(user);
      });
    }
  },
  {
    method: 'PUT',
    path: '/api/user/{id}',
    handler: async (request, h) => {
      // users can edit their own user
      if(request.params.id !== 'current' && !request.auth.credentials.admin){
        return h.response().code(403);
      }
      
      const user_id = (request.params.id === 'current' ? request.auth.credentials.user_id : request.params.id);

      const user = await request.getModel('users').findById(user_id);
      
      if(request.payload.password && request.payload.password !== ''){
        if(request.params.id === 'current'){
          // User must enter current password to change password
          const isValid = await bcrypt.compare(request.payload.current_password, user.password);
          if(!isValid){
            delete request.payload.password;
            delete request.payload.current_password;
            return h.response({message: 'Current password invalid.'}).code(422);
          }
        }
      } else {
        // don't change to blank password
        delete request.payload.password;
        delete request.payload.current_password;
      }

      if(request.params.id === 'current'){
        if(request.payload.password && request.payload.password !== ''){
          const isValid = await bcrypt.compare(request.payload.current_password, user.password);
          if(!isValid){
            delete request.payload.password;
            delete request.payload.current_password;
            return h.response({message: 'Current password invalid.'}).code(422);
          }
        }
      }
      request.payload.password = await bcrypt.hash(request.payload.password, 10);
      await user.update(request.payload);

      return h.response().code(204);
    },
    options: {
      validate: {
        options: {
          stripUnknown: true
        },
        payload: {
          name: Joi.string().required(),
          username: Joi.string().required(),
          phone_number: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().allow(''),
          current_password: Joi.string().allow(''),
          admin: Joi.boolean(),
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/user/{id}',
    handler: (request, h) => {
      if(!request.auth.credentials.admin){
        return h.response().code(403);
      }
      
      const User = request.getModel('users');
      return User.destroy({
        where: { id: request.params.id }
      }).then(() => {
        return h.response().code(204);
      });
    }
  },
  {
    method: 'POST',
    path: '/api/user',
    handler: async (request, h) => {
      if(!request.auth.credentials.admin){
        return h.response().code(403);
      }
      
      const users = await request.getModel('users')
      
      if(request.payload.password !== request.payload.confirm_password){
        return h.response({message: 'Passwords don\'t match'}).code(422);
      }
      request.payload.password = await bcrypt.hash(request.payload.password, 10);
      var user = await users.create(request.payload);

      return user;
    },
    options: {
      validate: {
        options: {
          stripUnknown: true
        },
        payload: {
          name: Joi.string().required(),
          username: Joi.string().required(),
          phone_number: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          confirm_password: Joi.string().required(),
          admin: Joi.boolean(),
        }
      }
    }
  }
];