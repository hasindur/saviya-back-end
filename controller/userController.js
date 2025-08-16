import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export function saveUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      
    });
   user.save()
        .then((data) => {
            res.status(201).json({
                message: "User created successfully",
               
            });
        })
        .catch((error) => {
            console.error("Error saving user:", error);
            res.status(500).json({
                message: "Error saving user",
                error: error.message
            });
        });
   
   
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((user) => {
           
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            res.status(200).json({
                message: "Login successful",
                
            });
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        });
}