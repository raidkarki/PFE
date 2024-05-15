import { Teacher } from "../database/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import dockerhub from "../database/docker.js";



// Update the path

export const register = async (req, res) => {
     const { name, password, secondname, email } = req.body;
    console.log(req.body);

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
    console.log("l email"+email, password); 

    try {
        const teacher = await Teacher.findOne({ email });
        //const dockerToken = await dockerhub();
        
        //console.log("dockerToken"+dockerToken);
        if (teacher) {
            const isPasswordValid = await bcrypt.compare(password, teacher.password);

            if (isPasswordValid) {
                const token = jwt.sign({ name: teacher.name, id: teacher._id }, "test", { expiresIn: "1h" });
                res.status(200).json({ teacher, token});

            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "Teacher not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

