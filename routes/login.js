const express = require('express');
const router = express.Router();
const db = require('../mongodb/db');
const bodyParser = require('body-parser');
const url = require('url');
const jwt = require('jsonwebtoken');


// 1.首次登录时，后端服务器判断用户账号密码正确之后，根据用户id、用户名、定义好的秘钥、过期时间生成 token ，返回给前端；
// 2.前端拿到后端返回的 token ,存储在 localStroage 和 Vuex 里；
// 3.前端每次路由跳转，判断 localStroage 有无 token ，没有则跳转到登录页，有则请求获取用户信息，改变登录状态；
// 4.每次请求接口，在 Axios 请求头里携带 token;
// 5.后端接口判断请求头有无 token，没有或者 token 过期，返回401；
// 6.前端得到 401 状态码，重定向到登录页面。


//用户登录验证

router.post('/signin', bodyParser.urlencoded({
    extended: false
}), function (req, res) {
    console.log(req.cookies);
    //验证用户名和密码
    let name = req.body.name;
    let password = req.body.password;
    let autoLogin = req.body.auto;
    db.select('users', {
        'name': name,
        'password': password
    }, (data) => {
        if (data.dataset.length == 0) { //密码验证不通过
            res.send({
                code: 0,
                msg: '用户名或密码错误'
            })
        } else { //密码验证通过,生成token放入cookie中
            let content = {
                name: req.body.name
            }; //插入的数据，可以解析出来
            let secretOrPrivateKey = '2834u10asj'; //这是密匙
            if (autoLogin) { //选择记住我后，设置token有效期为7天
                let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: '7 days'
                })
                res.cookie('token', token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
            } else {
                let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: '1 h'
                })
                res.cookie('token', token, {
                    maxAge: 60 * 60 * 1000
                })
            }
            res.send({
                code: 1,
                msg: '登录成功'
            })
        }
    })
    //生成token 根据auto设置对应expires时间
});



module.exports = router;