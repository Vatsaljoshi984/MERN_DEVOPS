const { User } = require("../models/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "SECRET_KEY"

exports.createUser = async (req, res) => {
    try {

        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256', async function (err, hashedPassword) {
                const user = new User({ ...req.body, password: hashedPassword, salt })
                const doc = await user.save();
                req.login((doc), () => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        const token = jwt.sign(
                            sanitizeUser(doc),
                            SECRET_KEY
                        );
                        res.cookie('jwt', token, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true,
                        }).status(201).json({massage:"User Successfully Registered!!!" });
                    }
                })
            })
    } catch (err) {
        res.status(400).json(err);

    }

}

// exports.loginUser = async (req, res) => {
//     const {email,password} = req.body
//     try {
//         const user = await User.findOne({email})
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(404).json({ message: 'Wrong Password' });
//         }
//         res.status(200).json({"id":user.id,"name":"Tem","email":user.email,"addresses":user.addresses});

//     } catch (err) {
//         res.status(400).json(err);

//     }

// }

exports.checkUser = async (req, res) => {
    if (req.user) {
        res.json(req.user);
      } else {
        res.sendStatus(401);
      }
}
exports.loginUser = async (req, res) => {
    const user = req.user;

    res.cookie('jwt', user.token, {
        sameSite:'lax',
        secure:false,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }).status(200).json(user);
    // res.status(200).json(user)
};

exports.logout = async (req, res) => {
    res
      .cookie('jwt', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .sendStatus(200)
  };
