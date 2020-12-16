const { updateUser } = require('../controllers/Users');
// const _ = require('underscore');

const updateUserInfo = async(req, res) => {
  const userInfo = await updateUser();
  return res.send(userInfo);
}

exports = module.exports = updateUserInfo;