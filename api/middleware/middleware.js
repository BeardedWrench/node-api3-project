const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log( `METHOD: ${req.method} URL: ${req.url} TIME: ${new Date().toISOString()}` )
  next();
}

async function validateUserId (req, res, next) {
  // DO YOUR MAGIC
  const user = await Users.getById(req.params.id)
  try{
    if( !user ){
      res.status( 404 ).json({ message: "user not found" } )
    }else{
      req.user = user;
      next();
    }
  }
  catch ( err ){
   res.status( 500 ).json({ message: err } );
    next( err )
  }

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    if(Object.keys(req.body).length === 0){
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


function validatePost(req, res, next) {
  // DO YOUR MAGIC
 if( !req.body ) {
  res.status( 400 ).json({
    message: 'missing post data'
  })
 }else{
   if( !req.body.text || !req.body.user_id ){
     res.status( 400 ).json({
       message: 'missing required text or user_id fields'
     })
   }else{
     next();
   }
 }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

// do not forget to expose these functions to other modules
