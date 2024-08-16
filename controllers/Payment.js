const crypto = require("crypto");
const Razorpay = require('razorpay');
const { Order } = require("../models/Order");
let currentOrder;

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

exports.checkout = async (req, res) => {
    try {
        currentOrder = req.body.order;
        const options = {
            amount: Number(req.body.body?.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // order comes here
        try {

            const order = new Order({ ...currentOrder, user: req.user.id })
            const doc = await order.save();

            res.redirect(
                `/order-success/${doc.id}`
            );

        } catch (err) {
            res.status(400).json(err);

        }


    } else {
        
        res.status(400).json({
            success: false,
        });
    }
};