const userDb = require("../model/userModel")
const adminDb = require("../model/adminModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")


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

        res.cookie("token", token);

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

        const userId = req.user.id;

        const user = await userDb.findById(userId)
        console.log("User Id :- ", user)

        if (!user) {
            res.status(404).json({ message: "Sorry, user not found" })
        }

        if (!user.isActive) {
            res.status(404).json({ message: "Sorry, user deactivated" })
        }

        res.status(200).json({ message: "Authorized user" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}


const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, email, mobile } = req.body;

        if (!name && !email && !mobile) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        if (email) {
            const existingUserWithEmail = await userDb.findOne({ email });
            if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
                return res.status(400).json({ error: "Email already in use by another user" });
            }
        }

        if (mobile) {
            const existingUserWithMobile = await userDb.findOne({ mobile });
            if (existingUserWithMobile && existingUserWithMobile._id.toString() !== userId) {
                return res.status(400).json({ error: "Mobile number already in use by another user" });
            }
        }

        const user = await userDb.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.isActive) {
            res.status(404).json({ message: "Sorry, user deactivated" })
        }

        if (name)
            user.name = name

        if (email)
            user.email = email

        if (mobile)
            user.mobile = mobile


        await user.save();

        const updatedUserProfile = await userDb.findById(userId).select("-password");

        console.log(updatedUserProfile)

        res.status(200).json({ message: "User profile updated successfully", data: updatedUserProfile });


    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
}

const userLogout = async (req, res) => {
    try {

        const userId = req.user.id

        const user = await userDb.findById(userId)
        if (!user.isActive) {
            res.status(404).json({ message: "Sorry, you can not logout, because your account has been deactivated!" })
        }

        res.clearCookie("token")

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

        // Fetch the user
        const user = await userDb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Sorry, user not found" }); // Added return
        }

        // Check if the requester is an admin
        const admin = await adminDb.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: "Sorry, only admin can access" }); // Added return
        }

        // Check if the user is already deactivated
        if (!user.isActive) {
            return res.status(400).json({ message: "User is already deactivated!" }); // Added return
        }

        // Deactivate the user
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


module.exports = { register, login, userProfile, checkUser, updateUserProfile, userLogout, deactivateUser, activateUser, deleteUser, getAllUsers,  }    