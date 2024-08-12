const { Cart } = require("../models/Cart");

exports.addToCart = async (req, res) => {

    
    try {
        if (!req.user) {
            return   res.status(400)
        }
        const { id } = req.user;
        const product = new Cart({ ...req.body, user: id })
        const doc = await product.save();
        const result = await doc.populate('product');
        res.status(201).json(result);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.updateCart = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Cart.findByIdAndUpdate(id, req.body)
        const doc = await product.save();
        const result = await doc.populate('product');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json(result);

    } catch (err) {
        res.status(400).json(err);

    }

}


exports.fetchCartByUserId = async (req, res) => {
    
    try {
        const { id } = req.user;
        const product = await Cart.find({ user: id }).populate('user',"id email name image").populate('product').exec()
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product <= 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.deleteCart = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Cart.findOneAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product Deleted' });

    } catch (err) {
        res.status(400).json(err);

    }

}