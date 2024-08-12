const { Order } = require("../models/Order");

exports.CreateOrder = async (req, res) => {
    // const { id,name,image } = req.user;
    const product = new Order({ ...req.body, user: req.user.id })
    try {
        const doc = await product.save();
        res.status(201).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.updateOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Order.findByIdAndUpdate(id, req.body, { new: true })
        const doc = await product.save();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}


exports.fetchOrderByUserId = async (req, res) => {

    const { id } = req.user;
    let query = Order.find({ user: id })
    let totalCountQuery = Order.find({})
    if (req.user.id) {
        totalCountQuery = await totalCountQuery.find({ user: id })
    }
    

    const totalOrders = (await totalCountQuery).length;


    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalOrders)
        res.status(200).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }
    // try {
    //     const product = await Order.find({ user: id}).populate('user',"id email name image")
    //     if (!product) {
    //         return res.status(404).json({ message: 'Product not found' });
    //     }

    //     res.status(200).json(product);

    // } catch (err) {
    //     res.status(400).json(err);

    // }

}

exports.deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Order.findOneAndDelete({ _id: id })
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }
        res.status(200).json({ message: 'Product Deleted' });

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.fetchAllOrders = async (req, res) => {
    let query = Order.find({}).populate('user', "id email name image")
    let totalCountQuery = Order.find({}).populate('user', "id email name image")
    if (req.query.category) {
        query = query.find({ category: req.query.category })
        totalCountQuery = totalCountQuery.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        totalCountQuery = totalCountQuery.find({ brand: req.query.brand })
    }
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }

    const totalOrders = await totalCountQuery.count().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalOrders)
        res.status(200).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}