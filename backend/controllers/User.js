const { User } = require("../models/User");


exports.updateUser = async (req, res) => {
    const id = req.user.id;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        const doc = await user.save();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.fetchUserById = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id,"id email role addresses name image")
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(user);

    } catch (err) {
        res.status(400).json(err);

    }

}

