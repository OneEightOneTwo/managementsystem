const jwt = require('jsonwebtoken');

//拦截验证token;
module.exports = () => {
    return (req, res, next) => {
        let urlArr = req.url.split('.');
        if (urlArr[1] != 'html' || urlArr[0] == '/login') {
            next();
        } else {
            let token = req.cookies.token;
            let secretOrPrivateKey = '2834u10asj';
            if (token) {
                jwt.verify(token, secretOrPrivateKey, (err, decode) => {
                    if (err) { //token验证不通过
                        return res.redirect('/login.html');
                    } else { 
                        next();
                    }
                })
            } else { //cookie中没有token
                return res.redirect('/login.html');
            }
        }
    }



}