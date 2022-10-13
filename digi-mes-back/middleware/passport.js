module.exports = (request, response) => {
    return response.status(200).send({
        success: true,
        user: {
            id: request.user._id,
            email: request.user.email,
        },
    });
};
