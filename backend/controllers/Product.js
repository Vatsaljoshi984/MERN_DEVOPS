const { Product } = require("../models/Product")

exports.createProduct = async (req, res) => {
    const discountedPrice = Math.round(
        req.body.price *
        (1 - req.body.discountPercentage / 100)
    )
    const product = new Product({ ...req.body, discountedPrice })

    try {
        const doc = await product.save();
        res.status(201).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.reviewProduct = async (req, res) => {
    const id = req.params.id;
    const { reviews } = req.body;
    const countReviews = reviews.map((el, i) => el.rating);
    const totalReviews = countReviews.reduce((total, num) => total + num);
    const totalCountReviews = totalReviews / reviews.length;
    try {
        const product = await Product.findByIdAndUpdate(id, { ...req.body, rating: totalCountReviews }, { new: true })
        const doc = await product.save();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const discountedPrice = Math.round(
        req.body.price *
        (1 - req.body.discountPercentage / 100)
    )
    try {
        const product = await Product.findByIdAndUpdate(id, { ...req.body, discountedPrice }, { new: true })
        const doc = await product.save();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.fetchAllProducts = async (req, res) => {
    let query = Product.find({ deleted: { $ne: true } })
    let totalCountQuery = Product.find({ deleted: { $ne: true } })
    if (req.query.search !== 'undefined' && req.query.search) {
        query = query.find({ title: { $regex: req.query.search, $options: 'i' } })
        totalCountQuery = totalCountQuery.find({ title: { $regex: req.query.search, $options: 'i' } })
    }
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

    const totalDocs = (await totalCountQuery.exec()).length;

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalDocs)
        res.status(200).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}

exports.fetchAllProductsForAdmin = async (req, res) => {
    let query = Product.find({})
    let totalCountQuery = Product.find({})
    if (req.query.search !== 'undefined' && req.query.search) {
        query = query.find({ title: { $regex: req.query.search, $options: 'i' } })
        totalCountQuery = totalCountQuery.find({ title: { $regex: req.query.search, $options: 'i' } })
    }
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

    const totalDocs = await totalCountQuery.count().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalDocs)
        res.status(200).json(doc);

    } catch (err) {
        res.status(400).json(err);

    }

}
exports.fetchProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(400).json(err);

    }

}