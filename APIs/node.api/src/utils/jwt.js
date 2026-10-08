import jwt from "jsonwebtoken";

const secret = "Essa é a chave";

function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: 60*60*5 });
}

function authenticate(req, res, next) {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send({error: "Token não fornecido"});
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer") {
        return res.status(401).send({error: "Token não possui bearer"});
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(401).send({error: "Acesso não autorizdo. Token inválido"});
        req.user = user;
        next();
    });
}

export { generateToken, authenticate };