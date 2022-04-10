const User = require('../models/users');
const Account = require('../models/account')

const editUser = async (req, res) => {
  /*try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      req.body,
      {new: true}
    );
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json(err);
  }*/
}

const getAccounts = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId})
    const accounts = await Account
      .find(
        {_id: {$in: user.accounts}},
        ['title', 'cash', 'currency']
      )
    res.status(200).send(accounts)
  } catch (e) {
    res.status(501).send(e)
  }
}

module.exports = {
  editUser,
  getAccounts
}
