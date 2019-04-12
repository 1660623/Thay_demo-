const User = require('../models/user');
const Router = require('express-promise-router');
const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const upload = require('../middleware/upload');

Promise.promisifyAll(fs);

const router = new Router();

router.get('/upload', function (req, res) {
    console.log(req.currentUser)
  if (!req.currentUser) {
    res.redirect('/auth/login');
  } else {
    res.render('profile/profile');
  }
});

router.post('/upload', upload.single('avatar'), async function (req, res, next) {
  const { file } = req;
  console.log(file);
  const ext = await path.extname(file.originalname);
  console.log(ext);
//   console.log(req.currentUser.id);
  const fileName = req.currentUser.id + ext;
  const sourcePath = path.join(__dirname, '..', 'uploads', file.filename);
  const destPath = path.join(__dirname, '..', 'public', 'avatars',fileName);
  await fs.renameAsync(sourcePath, destPath);
  res.redirect('/');
});

module.exports = router;
