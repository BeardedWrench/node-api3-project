const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const Middleware = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then( users => {
      res.status( 200 ).json( { users } )
    })
    .catch( () => {
      res.status( 500 ).json({
        error: "Couldn't fetch users."
      })
    })

});

router.get('/:id', Middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status( 200 ).json( req.user );
});

router.post('/', Middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert( req.body )
    .then( user => {
      res.status( 201 ).json( user )
    })
    .catch( () => {
      res.status( 500 ).json({
        error: "Could not create a new user."
      })
    })
});

router.put('/:id', Middleware.validateUserId, Middleware.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update( req.user.id, req.body )
    .then( user => {
      res.status( 200 ).json( user );
    })
    .catch( err => {
      res.status( 500 ).json( err );
    })
});

router.delete('/:id', Middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove( req.user.id )
    .then( () => {
      res.status( 200 ).json( req.user );
    })
    .catch( () => {
      res.status( 500 ).json({
        error: "Could not delete user."
      })
    })
});

router.get('/:id/posts', Middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts( req.user.id )
    .then( posts => {
      res.status( 200 ).json( posts );
    })
    .catch( err => {
      res.status( 500 ).json( err );
    })
});

router.post('/:id/posts', Middleware.validateUserId, Middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({
    ...req.body,
    user_id: req.params.id
  })
  .then( post => {
    res.status( 201 ).json( post )
  })
  .catch( err => {
    res.status( 500 ).json( err );
  })
});

module.exports = router;

// do not forget to export the router
