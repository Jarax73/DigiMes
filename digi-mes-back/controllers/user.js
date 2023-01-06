const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.signup = (request, response) => {
    const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        imageUrl: request.body.imageUrl,
        messages: request.body.messages,
        password: bcrypt.hashSync(request.body.password, 10),
    });

    user.save()
        .then((user) => {
            response.send({
                success: true,
                message: "User created",
                user,
            });
        })
        .catch((error) => {
            response.send({
                success: false,
                message: "Error creating user",
                error: error,
            });
        });
};

exports.getUsers = (request, response) => {
    User.find()
        .then((users) => response.status(200).json(users))
        .catch((error) => response.status(500).json({ error }));
};

exports.getUser = (request, response) => {
    User.find({ firstName: request.query.firstName })
        .then((user) => response.status(200).json(user))
        .catch((error) => response.status(500).json({ error }));
};

exports.updateUser = (request, response) => {
    User.updateOne(
        { _id: request.params.id },
        { ...request.body, _id: request.params.id }
    )
        .then(() => {
            response.status(200).json({ message: "user Updated" });
        })
        .catch((error) => response.status(401).json({ error }));
};

exports.login = (request, response) => {
    User.findOne({ email: request.body.email }).then(async (user) => {
        if (!user) {
            return response.status(401).send({
                success: false,
                message: "Cannot find user",
            });
        }

        const valid = await bcrypt.compare(
            user.password,
            request.body.password
        );
        if (valid) {
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

        return response.status(200).json({
            success: true,
            message: "Logged In successfully",
            user,
            token: `Bearer ${token}`,
        });
    });
};

exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(() => {
            response.status(200).json({ message: "User Deleted" });
        })
        .catch((error) => response.status(401).json({ error }));
};
