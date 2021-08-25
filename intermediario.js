function senha (req, res, next) {
    if (req.query.senha === "123" || req.method === "GET") {
        next();
    } else {
        res.status(401).json({
            erro: "Senha incorreta!"
        });
    }
}


module.exports = senha;