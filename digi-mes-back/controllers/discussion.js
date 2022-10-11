const Discussion = require("../models/discussion");

exports.createMessage = (request, response) => {
    const discussionObject = request.body;
    const discussion = new Discussion({
        ...discussionObject,
    });

    discussion
        .save()
        .then((discussion) => response.status(201).json({ discussion }))
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.getMessages = (request, response) => {
    Discussion.find()
        .then((discussions) => {
            response.status(200).json(discussions);
        })
        .catch((error) => {
            response.status(400).json({
                error: error,
            });
        });
};

exports.getOneMessage = (request, response) => {
    Discussion.findOne({
        _id: request.params.id,
    })
        .then((discussion) => {
            response.status(200).json(discussion);
        })
        .catch((error) => {
            response.status(404).json({
                error: error,
            });
        });
};

exports.modifyMessage = (request, response) => {
    Discussion.updateOne(
        { _id: request.params.id },
        { ...request.body, _id: request.params.id }
    )
        .then(() => {
            response.status(200).json({ message: "Message Updated" });
        })
        .catch((error) => response.status(401).json({ error }));
};

exports.deleteMessage = (request, response) => {
    Discussion.deleteOne({ _id: request.params.id })
        .then(() => {
            response.status(200).json({ message: "Message Deleted" });
        })
        .catch((error) => response.status(401).json({ error }));
};
