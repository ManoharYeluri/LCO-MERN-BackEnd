const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.find().exec((err, userslist) => {
        if (err || !userslist) {
            return res.status(400).json({
                error: "Something went wrong"
            });
        }
        return res.json(userslist)
    });
}