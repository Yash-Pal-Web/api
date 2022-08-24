const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

//const User = require('../model/user');


//  router.get('/',(req,res,next)=>{
//      res.status(200).json({
//          message : 'user route working'
//      })
// })

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err

            })
        }
        else
        {
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:hash
                
               
                


            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})


router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
               return res.status(401).json({
                    msg: 'password matching fail'
                })
            }
            if(result)
            {
                const token=jwt.sign({
                    firstname:user[0].firstname,
                    lastname:user[0].lastname,
                    email:user[0].email
                    
                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    firstname:user[0].firstname,
                    lastname:user[0].lastname,
                    email:user[0].email,
                    
                    token:token
                })


            }

        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    });
});



//delete request
router.delete('/:id',(req,res,next)=>{
    User.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'User deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//patch request
router.patch('/:id',(req,res,next)=>{
    console.log(req.params.id);
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            firstname:req.body.firstname,
            lastname: req.body.lastname
            
            
            

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })


})



router.get('/',(req,res,next)=>{
    User.find()
    .then(result=>{
      res.status(200).json({
          userData:result
  
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      })
    });
  })









module.exports = router;










