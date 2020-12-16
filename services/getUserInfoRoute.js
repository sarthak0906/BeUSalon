const { getUserOrders }= require('../controllers/Users');

const getUserInfo = async(req, res) => {
  console.log("Router");
  const userInfo = await getUserOrders();
  console.log("Router ret => " , userInfo[0]);
  if (!userInfo) return [];
  return res.send(userInfo);
}

exports = module.exports = getUserInfo;