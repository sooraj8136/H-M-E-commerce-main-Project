const userDb = require("../model/userModel")
const adminDb = require("../model/adminModel")
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/token")
const { cloudinaryInstance } = require("../config/cloudinaryConfig")


const register = async (req, res) => {

    try {
        const { name, email, mobile, password } = req.body
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const userAlreadyExistWithEmail = await userDb.findOne({ email })

        if (userAlreadyExistWithEmail) {
            return res.status(400).json({ error: "User with this email already exists" })
        }

        const userAlreadyExistWithMobile = await userDb.findOne({ mobile })

        if (userAlreadyExistWithMobile) {
            return res.status(400).json({ error: "User with this mobile number already exists" })
        }

        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(password, salt)
        console.log(hashedpassword);


        const newUser = new userDb({
            name, email, password: hashedpassword, mobile
        })

        const savedUser = await newUser.save()

        const { password: _, ...userData } = savedUser.toObject();

        res.status(200).json({ message: "User registered successfully", data: userData })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All feilds are required" });
        }

        const user = await userDb.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!user.isActive) {
            res.status(404).json({ message: "Sorry, you can not login, because your account has been deactivated! Contact Admin..." })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const token = generateToken(user, "user");
        console.log(token, "=======token")

        // res.cookie("token", token, {
        //     sameSite: "None",
        //     secure: true,
        //     httpOnly: true
        // });

        {
            const { password, ...userWithoutPassword } = user._doc;

            res.status(200).json({ message: "login successfully", data: userWithoutPassword });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


const userProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userDb.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "Sorry, user not found" })
        }

        if (!user.isActive) {
            return res.status(404).json({ message: "Sorry, user deactivated" })
        }

        res.status(200).json({ message: "User profile fetched", data: user })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}


const checkUser = async (req, res) => {
    try {
        console.log("Decoded User from Token:", req.user);
        const userId = req.user?.id;

        console.log("User Id =======",userId)

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const user = await userDb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Authorized User", user });

    } catch (error) {
        console.error("Error in checkUser:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, mobile } = req.body;

        console.log("REQ.BODY === ", req.body);

        if (!name && !email && !mobile) {
            return res.status(400).json({ error: "At least one field (name, email, or mobile) is required to update" });
        }

        const updatedUserData = await userDb.findByIdAndUpdate(
            userId,
            {
                name: name || undefined,
                email: email || undefined,
                mobile: mobile || undefined,
            },
            { new: true }
        );

        res.status(200).json({ message: "User profile details updated", data: updatedUserData });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};



const userLogout = async (req, res) => {
    try {

        const userId = req.user.id

        const user = await userDb.findById(userId)
        if (!user.isActive) {
            res.status(404).json({ message: "Sorry, you can't logout, because your account has been deactivated!" })
        }

        // res.clearCookie("token", {
        //     sameSite: "None",
        //     secure: true,
        //     httpOnly: true
        // });

        res.status(200).json({ message: "User logout successfull" })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}

const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const adminId = req.user.id;

        console.log("User Id :- ", userId);
        console.log("Admin Id :- ", adminId);

        const user = await userDb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Sorry, user not found" }); 
        }

        const admin = await adminDb.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: "Sorry, only admin can access" }); 
        }

        if (!user.isActive) {
            return res.status(400).json({ message: "User is already deactivated!" }); 
        }

        user.isActive = false;
        await user.save();

        return res.status(200).json({
            message: "User account has been deactivated successfully",
            data: user,
        });

    } catch (error) {
        console.error(error);
        res
            .status(error.status || 500)
            .json({ error: error.message || "Internal Server Error" });
    }
};



const activateUser = async (req, res) => {

    try {

        const { userId } = req.params
        const adminId = req.user.id

        console.log("User Id :- ", userId)
        console.log("Admin Id :- ", adminId)

        const user = await userDb.findById(userId)
        if (!user) {
            res.status(404).json({ message: "Sorry, user not found " })
        }

        const admin = await adminDb.findById(adminId)
        if (!admin || admin.role !== 'admin') {
            res.status(404).json({ message: "Sorry, only admin can access " })
        }

        if (user.isActive) {
            res.status(404).json({ message: "User is already active!" })
        }

        user.isActive = true;

        await user.save()

        res.status(200).json({ message: "User account has been activated successfully", data: user })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("User Id :- ", userId);

        const user = await userDb.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "Sorry, user not found" });
        }

        return res.status(200).json({ message: "Successfully deleted User account" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userDb.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};


const userForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await userDb.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user);

        const resetToken = crypto.randomBytes(32).toString("hex");

        console.log("Generated reset token:", resetToken);

        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + process.env.TOKEN_EXPIRATION * 60 * 1000;

        await user.save();

        const resetLink = `${process.env.CORS}/user/user-reset-password/${resetToken}`;

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
            subject: "Reset your H&M User Password",
            text: `We have received a password reset request for your account. 
                If you did not request this, you can safely ignore this email. 

                lick the link below to reset your password:
                ${resetLink}`,
        });

        res.status(200).json({ message: "Reset email sent!" });
    } catch (error) {
        console.error("Error in userForgotPassword:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const userResetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        if (!newPassword || newPassword.trim().length < 8) {
            return res.status(400).json({
                message: "Invalid password. Password must be at least 8 characters long.",
            });
        }

        const user = await userDb.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() },
        });

        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Your password has been reset successfully!" });
    } catch (error) {
        console.error("Error in userResetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { register, login, userProfile, checkUser, updateUserProfile, userLogout, deactivateUser, activateUser, deleteUser, getAllUsers, userForgotPassword, userResetPassword }    