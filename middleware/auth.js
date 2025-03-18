exports.userAuth = (req, res, next) => {
    const headers = req.headers;
    if(!headers.authorization) {
        return res.status(401).json({status: 401, message: "You are not authorized"});
    }

    if(headers.authorization !== process.env.AUTH_TOKEN) {
        return res.status(401).json({status: 401, message: "You are not authorized"});
    }

    next();
}