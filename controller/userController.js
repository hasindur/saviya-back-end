import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
                message: "User saved successfully",
               
            });
        })
        .catch((error) => {
            console.error("Error saving user :", error);
            res.status(500).json({
                message: "user not saved successfully",
                
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
            if (isPasswordValid) {

                // Create a token payload with user data
                // You can include any user information you want in the token
                  const userData = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isDisabled: user.isDisabled,
                    isEmailVerified: user.isEmailVerified,    
                     
                  };
                  // Sign the token with a secret key and set an expiration time
                const token = jwt.sign(userData, "random456");
                return res.status(200).json({ message: "Login successful", token });
            }else {
                 return res.status(401).json({ message: "Invalid password" });
            }

           
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        });
}