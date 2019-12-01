// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/runoob';
// const coll = 'vue', doc = 'user';

function getConn(){
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
        if (err) throw err; 
    });
        //   const coll = 'vue', doc = 'user';
}

function getDbo(){

}

function insertRows(conn, coll, doc, data) {
    var dbo = conn.db(coll);
    // var data = [
    //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn' },
    //     { name: 'Google', url: 'https://www.google.com', type: 'en' },
    //     { name: 'Facebook', url: 'https://www.google.com', type: 'en' }
    // ];
    dbo.collection(doc).insertMany(data, function (err, res) {
        if (err)
            throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        conn.close();
    });
}

function insertRow(conn, coll, doc, data) {
    var dbo = conn.db(coll);
    // var data = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection(doc).insertOne(data, function (err, res) {
        if (err)
            throw err;
        console.log("文档插入成功");
        conn.close();
    });
}

function createCollection(conn, coll, doc) {
    var dbase = conn.db(coll);
    console.log('数据库已创建');
    dbase.createCollection(doc, function (err, res) {
        if (err)
            throw err;
        console.log("创建集合!");
        conn.close();
    });
}

function findAll(conn, coll, doc) {
    return new Promise((resolve, reject) => {
        var dbo = conn.db(coll);
        dbo.collection(doc).find({}).toArray(function (err, result) {
            if (err)
                throw err;
            resolve(result);
            // console.dir(JSON.stringify(result, null, 4));
            conn.close();
        });

    })

}

function findByCondition(conn, coll, doc, condition) {
    var dbo = conn.db(coll);
    // var condition = { "name": '菜鸟教程' }; // 查询条件
    dbo.collection(doc).find(condition).toArray(function (err, result) {
        if (err)
            throw err;
        console.dir(JSON.stringify(result, null, 4));
        conn.close();
    });
}
function updateRow(conn, coll, doc, where, update) {
    var dbo = conn.db(coll);
    // var where = { "name": '菜鸟教程' }; // 查询条件
    // var update = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection(doc).updateOne(where, update, function (err, res) {
        if (err)
            throw err;
        console.log("文档更新成功");
        conn.close();
    });
}
function updateRows(conn, coll, doc, where, update) {
    var dbo = conn.db(coll);
    // var where = { "type": 'en' }; // 查询条件
    // var update = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection(doc).updateMany(where, update, function (err, res) {
        if (err)
            throw err;
        console.log(res.result.nModified + " 条文档被更新");
        conn.close();
    });
}
function sort(conn, coll, doc, sort) {
    var dbo = conn.db(coll);
    // var sort = { type: 1 };
    dbo.collection(doc).find().sort(sort).toArray(function (err, result) {
        if (err)
            throw err;
        console.dir(JSON.stringify(result, null, 4));
        conn.close();
    });
}
function findByPage(conn, coll, doc, page = 1, pageSize = 10) {
    var dbo = conn.db(coll);
    dbo.collection(doc).find().skip((page - 1) * pageSize).limit(pageSize).toArray(function (err, result) {
        if (err)
            throw err;
        console.dir(JSON.stringify(result, null, 4));
        conn.close();
    });
}
function deleteRow(conn, coll, doc, where) {
    var dbo = conn.db(coll);
    // var where = { "name": '菜鸟教程' }; // 查询条件
    dbo.collection(doc).deleteOne(where, function (err, obj) {
        if (err)
            throw err;
        console.log("文档删除成功");
        conn.close();
    });
}
function deleteCollection(conn, coll, doc) {
    var dbo = conn.db(coll);
    // 删除 test 集合
    dbo.collection(doc).drop(function (err, delOK) {
        if (err)
            throw err;
        if (delOK)
            console.log("集合已删除");
        conn.close();
    });
}
// exports =  {
//     insertRow,
//     insertRows,
//     deleteRow,
//     deleteCollection,
//     updateRow,
//     updateRows,
//     findAll,
//     findByCondition,
//     findByPage,
//     sort
// }
exports.createCollection = createCollection;
exports.insertRow = insertRow;
exports.insertRows = insertRows;
exports.deleteRow = deleteRow;
exports.deleteCollection = deleteCollection;
exports.updateRow = updateRow
exports.updateRows = updateRows;
exports.findAll = findAll;
exports.findByCondition = findByCondition;
exports.findByPage = findByPage;
exports.sort = sort
