const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// validationResult
const { validationResult } = require('express-validator');
// check validate field
const us_patten = '[a-z0-9]{6,12}';
const pass_patten = '[a-z0-9]';

const register = async (req, res, next) => {
    // Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Get user input
        const { username, password } = req.body;
        if (username.indexOf(' ') != -1)
        return res.status(400).json('username không được chứa Khoảng trắng và các ký tự đặc biệt.');

        if (Boolean(username.match(us_patten)) == false)
        return res.status(400).json('username không được chứa Khoảng trắng và các ký thự đặc biệt.');

        if (Boolean(password.match(pass_patten)) == false)
             return res.status(400).json('password không được chứa Khoảng trắng và các ký thự đặc biệt.');
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.status(400).send('User đã tồn tại. Xin vui lòng đăng nhập');
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username: username.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '2h',
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
    // Our register logic ends here
};

const login = async (req, res) => {
    // Our login logic starts here
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    // Get user input
    const { username, password } = req.body;
    //validate username
    try {
        if (username.indexOf(' ') != -1) {
            return res.status(400).json({
                errors: 'username không được chứa Khoảng trắng và các ký tự đặc biệt.',
            });
        }

        if (Boolean(username.match(us_patten)) == false) {
            return res
                .status(400)
                .json({ errors: 'username không được dưới 6 kí tự.' });
        }

        const user = await User.findOne({ username });

        if (!user)
            return res.status(400).json({ errors: 'username không đúng' });

        // if (!user.isVerified)
        // res.status(400).json({ errors: 'Tài khoản chưa được kích hoạt!' });

        // Result: boolean
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(400).json({ errors: 'password không đúng' });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '2h',
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error.message);
        // return next(error);
    }

    // Our register logic ends here
};
module.exports = { login, register };
