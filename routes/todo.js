const Todo = require('../models/todo');
const User = require('../models/user');
const Router = require('express-promise-router');

const router = new Router();

router.get('/', async function(req, res) {
  const {userId} = req.session;
  if(!userId){
    res.render('todo/404')
  }
  // const todos = await Todo.findAll({
  //   where:{
  //     UserId: userId
  //   }
  // });
  // const todos = await Todo.findAll();

  // const users = await User.findAll();
  const user = await User.findOne({
    where:{
        id: userId
    }
  })
const todos = await Todo.findAll({
   where:{
      UserId: userId
   }
})
   
   
  // const user = await User.findOne()
  res.render('todo/index', { todos, user });
});

router.post('/:id/done', async function(req, res) {
  const todo = await Todo.findOne({
    where: {
      id: req.params.id,
    }
  });
  todo.done = true;
  await todo.save();
  res.redirect('/todo');
});

router.post('/', async (req, res)=>{
  // res.locals.currentUser
  const {task} = req.body;
  const {userId} = req.session;
  const todo = await Todo.create({
      task,
      UserId: userId,
      done: false
  }) 
  res.redirect('/todo');
  
})

// router.post('/', async function(req, res) {
//   console.log(req.body);
//   await Todo.create({
//     task: req.body.task,
//     done: false,
//   });
//   res.redirect('/todo');
// });

module.exports = router;
