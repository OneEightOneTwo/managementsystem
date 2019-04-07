//每次进行一次数据库炒作，都会进行一次连接，前端页面那道数据比较慢，不要用
const MongoClient = require('mongodb').MongoClient;

let mongoUrl = 'mongodb://localhost:27017';
let dbName = 'myproject';
let conn = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) {
                reject(err);
            } else {
                let db = client.db(dbName);
                resolve(db);
            }
        })
    })
}

let insert = async (col, obj) => {
    try {
        let db = await conn();
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
    } catch (error) {
        throw error;
    }
}

let select = async (col, obj) => {
    try {
        let db = await conn();
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
    } catch (error) {
        throw error;
    }
};

let update = async (col, selectObj, updateObj) => {
    try {
        let db = await conn();
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
    } catch (error) {
        throw error;
    }
};

let remove = async (col,deletObj)=>{
    try {
        let db = await conn();
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
                db.close();
            })
        })
    } catch (error) {
        throw error;
    }
};

module.exports = {
    remove,
    update,
    select,
    insert
}