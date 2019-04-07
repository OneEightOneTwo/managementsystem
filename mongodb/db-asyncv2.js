const MongoClient = require('mongodb').MongoClient;
let mongoUrl = 'mongodb://localhost:27017';
let dbName = 'myproject';
let db;
MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
});
let insert = (col, obj) => {
    return new Promise((resolve, reject) => {
        db.collection(col).insertMany(obj, (err, res) => {
            if (err) {
                throw err;
            } else {
                resolve({
                    code: 1,
                    msg: '插入成功'
                });
            }
        })
    })
};
let select =  (col, obj) => {
    return new Promise((resolve, reject) => {
        db.collection(col).find(obj).toArray((err, res) => {
            if (err) {
                throw err;
            } else {
                resolve({
                    code: 1,
                    msg: '查询成功',
                    dataList: res
                });
            }
        })
    })
};
let update =  (col, selectObj, updateObj) => {
    return new Promise((resolve, reject) => {
        db.collection(col).updateMany(selectObj, updateObj, (err, res) => {
            if (err) {
                throw err;
            } else {
                resolve({
                    code: 1,
                    msg: '更新成功'
                });
            }
        })
    })
};
let remove =  (col, deletObj) => {
    return new Promise((resolve, reject) => {
        db.collection(col).deleteMany(deletObj, (err, res) => {
            if (err) {
                throw err;
            } else {
                resolve({
                    code: 1,
                    msg: '删除成功'
                });
            }
        })
    })
};

module.exports = {
    remove,
    update,
    select,
    insert
}