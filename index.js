require("dotenv").config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRouter = require('./routes/Products')
const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Orders')
const categoryRouter = require('./routes/Categories')
const brandRouter = require('./routes/Brands')
const paymentRoute = require('./routes/Payments')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport');
const { User } = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const SECRET_KEY = "SECRET_KEY";
const JwtStrategy = require('passport-jwt').Strategy;
const cookieParser = require('cookie-parser');
const path = require('path');
const { env } = require('process');



server.use(cors({}))

server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


server.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

// server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(cookieParser())
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate('session'));
server.use('/api/v1/products', productRouter.router)
server.use('/api/v1/users', isAuth(), userRouter.router)
server.use('/api/v1/auth', authRouter.router)
server.use('/api/v1/cart', isAuth(), cartRouter.router)
server.use('/api/v1/orders', isAuth(), orderRouter.router)
server.use('/api/v1/categories', categoryRouter.router)
server.use('/api/v1/brands', brandRouter.router)
server.use("/api/v1/payments", isAuth(),paymentRoute.router);

server.get('*', (req, res) =>
    res.sendFile(path.resolve('dist', 'index.html'))
);


server.post("/create-checkout-session", async (req, res) => {
    const products = req.body;

    
    const lineItems = products.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.product?.title,
                images: [item.product?.thumbnail]
            },
            unit_amount: item.product.discountedPrice * 100,
        },
        quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:8070/order-success",
        cancel_url: "http://localhost:8070/order-cancel",
    });

    res.json({ id: session.id })

})

// passport Strategies
passport.use('local',
    new LocalStrategy({ usernameField: 'email' },
        async function (email, password, done) {
            try {

                const user = await User.findOne({ email: email }).exec()
                if (!user) {
                    done(null, false, { message: "no such user email" })
                }
                crypto.pbkdf2(
                    password,
                    user.salt,
                    310000,
                    32,
                    'sha256', async function (err, hashedPassword) {
                        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                            done(null, false, { message: "Invalid Credential" })
                        }
                        const token = jwt.sign(
                            sanitizeUser(user),
                            SECRET_KEY
                        );
                        done(null, { id: user.id, role: user.role, token })

                    })
            } catch (error) {
                done(error)
            }
        }
    ));

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (user) {
            return done(null, sanitizeUser(user)); // this calls serializer
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
})
);


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});




mongoose.connect("mongodb+srv://onlineAdmin:password%40123@cluster0.0dql0q8.mongodb.net/OnlineShore").then(console.log("Database connected successfully!!"))


server.get('/', (req, res) => {
    res.json({ status: 'success' })
})


server.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`);
})


