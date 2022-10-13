const jsonWebToken = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = (request, response) => {
    console.log(request.body.password);
    console.log(request.body.email);
    bcrypt
        .hash(request.body.password, 10)
        .then((hash) => {
            const user = new User({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: hash
                // imageUrl: request.body.imageUrl,
            });
            user.save()
                .then(() =>
                    response.status(201).json({ 
                        success: true, 
                        message: "User created",
                        user: {
                            id: user._id,
                            firstName: user.firstName
                        }
                     })
                )
                .catch((error) => response.status(400).json({ error }));
        })
        .catch((error) => response.status(500).json({ error }));
};

exports.login = (request, response) => {
    User.findOne({ email: request.body.email })
        .then((user) => {
            if (!user) {
                return response.status(401).json({ message: "Invalid mail" });
            }
            bcrypt
                .compare(request.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return response
                            .status(401)
                            .json({ message: "Invalid password" });
                    }
                    response.status(200).json({
                        userId: user._id,
                        token: jsonWebToken.sign(
                            { userId: user._id },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => response.status(500).json({ error }));
        })
        .catch((error) => response.status(500).json({ error }));
};

// exports.getUsers = (request, response) => {
//     User.find()
//         .then((user) => response.status(200).json(user))
//         .catch((error) => response.status(400).json({ error }));
// };

// exports.getOneUser = (req, res) => {
//     User.findOne({
//         _id: req.params.id,
//     })
//         .then((user) => {
//             res.status(200).json(user);
//         })
//         .catch((error) => {
//             res.status(404).json({
//                 error: error,
//             });
//         });
// };
