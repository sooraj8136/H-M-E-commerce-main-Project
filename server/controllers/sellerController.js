const sellerDb = require("../model/sellerModel")
const userDb = require("../model/userModel")
const adminDb = require("../model/adminModel")
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/token")
const { catchErrorHandler } = require("../utils/catchErrorHandler")


const registerSeller = async (req, res) => {

    try {

        const { name, email, mobile, role, password, storeName, address } = req.body

        if (!name && !email && !mobile && !role && !password && !storeName && !address) {
            res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        const mobileValidation = /^[0-9]{10,15}$/;  // Only numbers, 10-15 digits
        if (!mobileValidation.test(mobile)) {
            return res.status(400).json({ error: "Mobile number must be between 10 and 15 digits" });
        }

        const sellerEmailExist = await sellerDb.findOne({ email }).select("-password");

        if (sellerEmailExist) {
            return res.status(400).json({ error: "This Email already registered with another seller" });
        }

        const sellerMobileExist = await sellerDb.findOne({ mobile }).select("-password");

        if (sellerMobileExist) {
            return res.status(400).json({ error: "This Mobile number already registered with another seller" });
        }

        const salt = await bcrypt.genSalt()
        const sellerHashedPassword = await bcrypt.hash(password, salt)
        const newSeller = new sellerDb({
            name, email, mobile, role, password: sellerHashedPassword, storeName, address
        })

        const savedSeller = await newSeller.save()

        res.status(200).json({ message: "Seller registered successfully", data: savedSeller })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


const loginSeller = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const seller = await sellerDb.findOne({ email });

        if (!seller) {
            return res.status(400).json({ error: "Seller not found" });
        }

        const passwordMatch = await bcrypt.compare(password, seller.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        if (!seller.isActive) {
            return res.status(400).json({ error: "Seller profile is deactivated" });
        }

        const token = generateToken(seller, "seller");
        console.log(token)

        res.cookie("seller_token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        res.status(200).json({ message: "Seller login successfully", data: seller });
        console.log(seller)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


const checkSeller = (req, res) => {

    try {
        res.status(200).json({ message: "Authorized Seller" })
    } catch (error) {
        console.error("Error during admin login:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const sellerProfile = async (req, res) => {

    try {
        const sellerId = req.user.id
        const sellerData = await sellerDb.findById(sellerId).select("-password")
        res.status(200).json({ message: "Seller profile fetched", data: sellerData })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
}


const updateSellerProfile = async (req, res) => {

    try {
        const sellerId = req.user.id;
        const { name, email, mobile, storeName, address } = req.body;

        if (!name && !email && !mobile && !storeName && !address) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        if (email) {
            const existingSellerEmail = await sellerDb.findOne({ email });
            const existingUserEmail = await userDb.findOne({ email });
            const existingAdminEmail = await adminDb.findOne({ email });

            if (
                (existingSellerEmail && existingSellerEmail._id.toString() !== sellerId) || existingUserEmail || existingAdminEmail
            ) {
                return res.status(400).json({ error: "This email is already registered with another Users" });
            }
        }

        if (mobile) {
            const existingSellerMobile = await sellerDb.findOne({ mobile });
            if (existingSellerMobile && existingSellerMobile._id.toString() !== sellerId) {
                return res.status(400).json({ error: "This mobile number is already registered with another seller" });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (mobile) updateData.mobile = mobile;
        if (storeName) updateData.storeName = storeName;
        if (address) updateData.address = address;

        const updatedSellerProfile = await sellerDb
            .findByIdAndUpdate(sellerId, updateData, { new: true })
            .select("-password");

        if (!updatedSellerProfile) {
            return res.status(404).json({ error: "Sorry, seller not found" });
        }

        console.log(updatedSellerProfile);

        res.status(200).json({ message: "Seller profile updated successfully", data: updatedSellerProfile });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};



const sellerLogout = async (req, res) => {

    try {
        res.clearCookie("seller_token", {
            sameSite: "None",
            secure: true,
            httpOnly: true
        })

        res.status(200).json({ message: "Seller logout successfull" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}

const deleteSeller = async (req, res) => {

    try {

        const { sellerId } = req.params;

        console.log("Seller Id :- ", sellerId);

        const seller = await sellerDb.findByIdAndDelete(sellerId);

        if (!seller) {
            return res.status(404).json({ message: "Sorry, Seller not found" });
        }

        return res.status(200).json({ message: "Successfully deleted Seller account" });

    } catch (error) {
        console.error("Error deleting Seller:", error);
        return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};


const getAllSellers = async (req, res) => {

    try {
        const users = await sellerDb.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};



const sellerForgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        const seller = await sellerDb.findOne({ email:email.toLowerCase()});

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        console.log(seller)

        const resetToken = crypto.randomBytes(32).toString("hex");

        console.log(resetToken)

        seller.resetToken = resetToken;
        seller.resetTokenExpires = Date.now() + process.env.TOKEN_EXPIRATION * 60 * 1000;

        await seller.save();

        const resetLink = `${process.env.CORS}/seller/seller-reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"H&M" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset your H&M Seller Password",
            text: `We have received a password reset request from your account. If you have not issued a password reset request, you can safely ignore this email, and your account will not be affected. Click the link to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: "Reset email sent!" });
    } catch (error) {
        catchErrorHandler(res, error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const sellerResetPassword = async (req, res) => {

    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        if (!newPassword || newPassword.trim().length < 8) {
            return res.status(400).json({
                message: "Invalid password. Password must be at least 8 characters long.",
            });
        }

        const seller = await sellerDb.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() },
        });

        console.log("Seller found:", seller);

        if (!seller) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        seller.password = hashedPassword;
        seller.resetToken = undefined;
        seller.resetTokenExpires = undefined;

        await seller.save();

        res.status(200).json({ message: "Your password has been reset successfully!" });
    } catch (error) {
        console.error("Error in sellerResetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { registerSeller, loginSeller, checkSeller, sellerProfile, updateSellerProfile, sellerLogout, deleteSeller, getAllSellers, sellerForgotPassword, sellerResetPassword }