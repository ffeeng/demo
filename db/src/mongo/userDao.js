// MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
//   const coll = 'vue', doc = 'user';
//   if (err) throw err;
//   dbUtil.createCollection(conn, coll, doc);
//   for (let index = 0; index < 20; index++) {
//     dbUtil.insertRow(conn, coll, doc, { name: "hello" ,age:index});
//   }
//   dbUtil.insertRows(conn, coll, doc, [{ name: "world" }]);
//   dbUtil.findAll(conn, coll, doc, { name: 'hello' });
//   dbUtil.findByCondition(conn, coll, doc, { name: 'hello' });
//   dbUtil.updateRow(conn,coll,doc,{name:'hello'}, { $set: { "url": "https://www.runoob.com" } });
//   dbUtil.updateRows(conn,coll,doc,{name:'world'},{ $set: { "url": "https://www.runoob.com" } });
//   dbUtil.sort(conn,coll,doc,{name:1});
//   dbUtil.findAll(conn,coll,doc);
//   dbUtil.findByPage(conn, coll, doc, 1, 10);
//   dbUtil.deleteRow(conn,coll,doc,{name:'world'});
//   dbUtil.deleteCollection(conn, coll, doc);
// });
const dbUtil = require("./dbUtil");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/runoob';
const coll = 'vue', doc = 'user';
let conn;


class UserDao {
  constructor() {

    // this.conn = conn;

  }

  async getConn() {

    this.conn = res;

  }

  close() {
    this.conn.close();
  }


 getUsers() {
   return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true }, function (err, conn) {
        if (err) throw err;
        var dbo = conn.db(coll);
        dbo.collection(doc).find({}).toArray(function (err, result) {
          if (err)
            throw err;
          resolve(result);
          // console.dir(JSON.stringify(result, null, 4));
          conn.close();
        });
      });
    });
  }
}


new UserDao().getUsers().then(console.log);
