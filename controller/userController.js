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
                user: data
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