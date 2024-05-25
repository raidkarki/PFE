import { Teacher } from "../database/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const secret=process.env.SECRET_KEY||"mysecretkey";

export const register = async (req, res) => {
     const { name, password, secondname, email } = req.body;
  

    try {
        const isExist = await Teacher.findOne({ email });

        if (!isExist) {
            throw new Error("Contact your admin");
        }

        const hash = await bcrypt.hash(password, 10);
        const teacher = await Teacher.updateOne({  email }, { password: hash,loggedIn: true });

        res.status(201).json({ teacher });
    } catch (error) {
        if (error.message === "Contact your admin") {
            res.status(400).json({ message: "Contact your admin" });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });
        
        if (!teacher) {
            return res.status(404).json({ message: "Account not exist contact admin" });
        }

        const isPasswordValid = await bcrypt.compare(password, teacher.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(teacher);
        res.status(200).json({ teacher, token });

    } catch (error) {
        console.error('Login error:', error); // Log de l'erreur côté serveur
        res.status(500).json({ message: "Internal server error" });
    }
};

const generateToken = (teacher) => {
    return jwt.sign({ name: teacher.name, id: teacher._id }, secret, { expiresIn: "2h" });
};

