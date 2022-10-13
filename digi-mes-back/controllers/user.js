const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = (request, response) => {
    bcrypt
        .hash(request.body.password, 10)
        .then((hash) => {
            const user = new User({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: hash,
                // imageUrl: request.body.imageUrl,
            });
            user.save()
                .then(() =>
                    response.status(201).json({
                        success: true,
                        message: "User created",
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                        },
                    })
                )
                .catch((error) => response.status(400).json({ error }));
        })
        .catch((error) => response.status(500).json({ error }));
};

exports.getUsers = (request, response) => {
    User.find()
        .then((users) => response.status(200).json({ users }))
        .catch((error) => response.status(500).json({ error }));
};

exports.login = (request, response) => {
    User.findOne({ email: request.body.email }).then((user) => {
        if (!user) {
            return response.status(401).send({
                success: false,
                message: "Cannot find user",
            });
        }

        if (bcrypt.compare(request.body.password, user.password)) {
            return response.status(401).send({
                success: false,
                message: "Incorrect password",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        };

        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

        return response.status(200).send({
            success: true,
            message: "Logged In successfully",
            token: `Bearer ${token}`,
        });
    });
};
