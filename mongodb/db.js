const MongoClient = require('mongodb').MongoClient;

let dbURL = 'mongodb://localhost:27017';
let dbName = 'myproject';
let db;

//连接数据库
MongoClient.connect(dbURL, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
})

module.exports = {
    insert: function (_collection, _data, _callback) {
        db.collection(_collection).insert(_data, function (error, dataset) {
            if (error) {
                _callback({
                    status: 0,
                    msg: '插入失败'
                });
                throw error;
            } else {
                _callback({
                    status: 1,
                    msg: '插入成功'
                });
            }
        });
    },
    select: function (_collection, _condition, _callback) {
        db.collection(_collection).find(_condition || {}).toArray(function (error, dataset) {
            if (error) {
                throw error;
            } else {
                _callback({
                    status: 1,
                    dataset
                });
            }
        })
    },
    update: function (_collection, _condition, _updatestr, _callback) {
        db.collection(_collection).update(_condition, __updatestr, function (error, dataset) {
            if (error) {
                throw error;
            } else {
                _callback({
                    status: 1,
                    msg: '数据更新成功'
                });
            }
        })
    },
    remove: function (_collection, _condition, _callback) {
        if (_condition != '{}') {
            var i = db.collection(_collection).deleteOne(_condition, function (error, dataset) {
                if (error) {
                    _callback({ status: 0, msg: '删除失败2' });
                    throw error;
                } else {
                    _callback({ status: 1, msg: '删除成功' });
                }
            })
        } else {
            _callback({ status: 0, msg: '删除失败1' });
        }
    }

}