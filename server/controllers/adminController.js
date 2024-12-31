const adminDb = require("../model/adminModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")


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

        res.cookie("admin_token", token);

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


const adminLogout = async (req, res) => {
    try {
        res.clearCookie("admin_token")

        res.status(200).json({ message: "Admin logout successfull" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }

}


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

        if(!updatedAdminProfile){
            res.status(400).jsaon({message: "Sorry, admin profile is not updated"})
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



module.exports = { registerAdmin, loginAdmin, checkAdmin, adminLogout, updateAdminProfile, adminProfile }