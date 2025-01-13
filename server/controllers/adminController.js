const adminDb = require("../model/adminModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { catchErrorHandler } = require("../utils/catchErrorHandler");


const registerAdmin = async (req, res) => {

    try {

        const { name, email, mobile, role, password, qualification } = req.body

        if (!name || !email || !mobile || !role || !password || !qualification) {
            res.status(400).json({ message: "All fields are required" })
        }

        const adminEmailExist = await adminDb.findOne({ email })

        if (adminEmailExist) {
            return res.status(400).json({ error: "This Email already registered with another admin" });
        }


        const adminMobileExist = await adminDb.findOne({ mobile })

        if (adminMobileExist) {
            return res.status(400).json({ error: "This Mobile number already registered with another admin" });
        }

        const salt = await bcrypt.genSalt()
        const adminHashedPassword = await bcrypt.hash(password, salt)
        const newAdmin = new adminDb({
            name, email, mobile, role, password: adminHashedPassword, qualification
        })

        const savedAdmin = await newAdmin.save()

        const { password: _, ...userData } = savedAdmin.toObject();

        res.status(200).json({ message: "Admin created successfully", data: userData })

        console.log(userData)


    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const admin = await adminDb.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        if (!admin.isActive) {
            return res.status(400).json({ error: "Admin profile is deactivated" });
        }

        const token = generateToken(admin, "admin");
        console.log(token)

        res.cookie("admin_token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        res.status(200).json({ message: "Login successfully", data: admin });
        console.log(admin)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};


const checkAdmin = (req, res) => {
    try {

        res.status(200).json({ message: "Authorized admin" })


    } catch (error) {
        console.error("Error during admin login:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


// const adminLogout = async (req, res) => {
//     try {
//         res.clearCookie("admin_token")

//         res.status(200).json({ message: "Admin logout successfull" })

//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
//     }

// }

const adminLogout = async (req, res) => {
    try {

        const adminId = req.user.id;

        const admin = await adminDb.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin account not found." });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                message: "Logout failed. Your account is deactivated.",
            });
        }

        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        res.status(200).json({ message: "Admin logout successful." });
    } catch (error) {
        console.error("Error during admin logout:", error);

        res.status(error.status || 500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

module.exports = adminLogout;


const updateAdminProfile = async (req, res) => {

    try {

        const adminId = req.user.id


        const { name, email, mobile, role, qualification } = req.body


        if (!name && !email && !mobile && !role && !qualification) {
            res.status(400).json({ message: "All fields are required" })
        }

        if (email) {
            const existingAdminEmail = await adminDb.findOne({ email });
            if (existingAdminEmail && existingAdminEmail._id.toString() !== adminId) {
                return res.status(400).json({ error: "This Email already registered with another seller" });
            }
        }


        if (mobile) {
            const existingAdminMobile = await adminDb.findOne({ mobile });
            if (existingAdminMobile && existingAdminMobile._id.toString() !== adminId) {
                return res.status(400).json({ error: "This Mobile number already registered with another admin" });
            }
        }

        const admin = await adminDb.findById(adminId)


        if (!admin) {
            return res.status(404).json({ error: "Sorry, admin not found" });
        }

        if (name)
            admin.name = name

        if (email)
            admin.email = email

        if (mobile)
            admin.mobile = mobile

        if (role)
            admin.role = role

        if (qualification)
            admin.qualification = qualification


        await admin.save()

        const updatedAdminProfile = await adminDb.findById(adminId).select("-password");

        if (!updatedAdminProfile) {
            res.status(400).jsaon({ message: "Sorry, admin profile is not updated" })
        }

        console.log(updatedAdminProfile)

        res.status(200).json({ message: "Admin profile updated successfully", data: updatedAdminProfile })


    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
}



const adminProfile = async (req, res) => {
    try {
        const adminId = req.user.id
        const AdminData = await adminDb.findById(adminId).select("-password")
        res.status(200).json({ message: "Admin profile fetched", data: AdminData })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
}


const adminForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const admin = await adminDb.findOne({ email, role: "admin" });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        admin.resetToken = resetToken;
        admin.resetTokenExpires = Date.now() + process.env.TOKEN_EXPIRATION * 60 * 1000;

        await admin.save();

        const resetLink = `${process.env.CORS}/admin/admin-reset-password/${resetToken}`;

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
            subject: "Reset your H&M Admin password",
            text: `We have received a password reset request from your account. If you have not issued a password reset request, you can safely ignore this mail, and your account will not be affected. Click the link to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: "Reset email sent!" });
    } catch (error) {
        catchErrorHandler(res, error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
};


const adminResetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {

        if (!newPassword || newPassword.trim().length < 8) {
            return res.status(400).json({
                message: "Invalid password. Password must be at least 8 characters long.",
            });
        }

        const admin = await adminDb.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        admin.resetToken = undefined;
        admin.resetTokenExpires = undefined;

        await admin.save();

        res.status(200).json({ message: "Your password has been reset successfully!" });
    } catch (error) {
        console.error("Error in adminResetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { registerAdmin, loginAdmin, checkAdmin, adminLogout, updateAdminProfile, adminProfile, adminResetPassword, adminForgotPassword }