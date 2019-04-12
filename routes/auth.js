const User = require('../models/user');
const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');

// const bcrypt = require('bcrypt');
const router = new Router();

router.get('/login', async function(req, res) {
  res.render('auth/login');
});

 
router.get('/signup', async (req, res)=>{
  res.render('auth/signup');
})
 

//Đăng nhập
router.post('/signup', async (req, res)=>{
  const {email, password, displayName} = req.body;
  
const user = await  User.findOne({
    where:{
        email 
    }
})
   if(!user){
    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(password, salt, (err, hash)=>{
          const newUser = User.create({
              email,
              password: hash,
              displayName
          })
        })
      })
      
      res.redirect('/auth/login')
    
   }
   else{
      return res.json({
         error: true,
         status: "email đã tồn tại"
      })
   }
})

router.post('/login', async (req,res)=>{
  const {email, password} = req.body
   
  const user = await User.findOne({
      where:{
        email
      }
  }).then(user=>{
      if(user){
          bcrypt.compare(password, user.password)
          .then(isMatch=>{
              if(isMatch){
                  
                  req.session.userId = user.id;
                  res.redirect('/todo');
              }
              else{
                  
                  return res.json({
                      error: true,
                      status: "Mật khẩu không đúng"
                  })
              }
          })
      }
      else{
           return res.json({
              error: true,
              status: "Tên đăng nhập không tồn tại"
          })
          
      }
  })
})


// router.post('/login', async (req, res)=>{
//     const {email, password} = req.body
//     const user = await User.findOne({ // có async thì bắt buộc phải có await
//         //để xử lý bất đồng bộ khi chạy nhiều thứ 1 lúc
//         where:{
//             email // select tất cả nhũng thằng có email  trùng với thằng đăng nhập
//         }
//     })
//     if(!user){
//         return res.json({
//             error: true,
//             message: "email không tồn tại"
//         })
//     }
//     const matchPassword = await bcrypt.compare(password, user.password)
//     if(!matchPassword){
//         return res.json({
//             error: true,
//             message: "mật khẩu không khớp"
//         })
//     }
//     req.session.userId = user.id;
//     res.redirect('/todo');
//     console.log(req.session.userId )
// })

// router.post('/login', async function(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({
//     where: { email },
//   });
//   if (!user) {
//     throw Error('Wrong email/password');
//   }
//   if (!bcrypt.compareSync(password, user.password)) {
//     throw Error('Wrong email/password');
//   }
//   req.session.userId = user.id;
//   console.log(req.session);
//   res.redirect('/');
// });
router.get('/logout',  function(req, res) {
  // delete req.session.userId;
  res.redirect('/');
});

module.exports = router;
