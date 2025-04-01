// const stripe = require("stripe")(process.env.Stripe_Secret_Api_Key);
// const OrderDb = require("../model/orderModel")

// const CreateCheckoutSession = async (req, res, next) => {
//     try {
//         const { products } = req.body;

//         const lineItems = products.map((product) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: product?.productId?.title,
//                     images: [product?.productId?.image],
//                 },
//                 unit_amount: Math.round(product?.productId?.price * 100),
//             },
//             quantity: product?.quantity || 1,
//         }));

//         const totalAmount = products.reduce(
//             (sum, product) => sum + product?.productId?.price * (product?.quantity || 1),
//             0
//         );
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: `${process.env.CLIENT_DOMAIN}/user/payment-success`,
//         });

//         const order = new OrderDb({
//             userId: req.user.id,
//             items: products.map((product) => ({
//                 productId: product.productId,
//                 name: product?.productId?.title,
//                 price: product?.productId?.price,
//                 quantity: product?.quantity || 1,
//             })),

//             totalAmount,
//             orderStatus: "processing",
//         });

//         await order.save();

//         res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//         console.error(error);
//         res.status(error.status || 500).json({ error: error.message || "Internal server error" });
//     }
// };



const stripe = require("stripe")(process.env.Stripe_Secret_Api_Key);
const OrderDb = require("../model/orderModel");

const CreateCheckoutSession = async (req, res, next) => {
    try {
        const { products } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized. User ID missing." });
        }

        const lineItems = products.map((product) => {
            if (!product.productId || !product.productId.title || !product.productId.price) {
                throw new Error("Invalid product data. Missing title or price.");
            }

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.productId.title,
                        images: product.productId.image ? [product.productId.image] : [],
                    },
                    unit_amount: Math.round(product.productId.price * 100),
                },
                quantity: product.quantity || 1,
            };
        });

        const totalAmount = products.reduce(
            (sum, product) => sum + product.productId.price * (product.quantity || 1),
            0
        );

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_DOMAIN}/user/payment-success`,
            cancel_url: `${process.env.CLIENT_DOMAIN}/cart`, // ✅ Added cancel URL
        });

        const order = new OrderDb({
            userId: req.user.id,
            items: products.map((product) => ({
                productId: product.productId._id, // Ensure ID is stored correctly
                name: product.productId.title,
                price: product.productId.price,
                quantity: product.quantity || 1,
            })),
            totalAmount,
            orderStatus: "processing",
        });

        await order.save();

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};





const sessionStatus = async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "internal server error");
    }
};

module.exports = { CreateCheckoutSession, sessionStatus }