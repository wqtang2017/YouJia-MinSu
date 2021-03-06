/**
 * Created by dongyang on 2018.01.29.
 */
function mysqlClass() {
    var connection;
    //初始化
    this.init=function () {
        //调用mysql模块
        var mysql=require('mysql');
        connection=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            port:'3306',
            database:'minsu'
        });
        //连接数据库
        connection.connect();
    }
    //插入函数
    this.insertuser=function(name,pwd,callback) {
        //插入语句
        var adduser='INSERT INTO user(username,password) VALUES(?,?)';
        //字段的值
        var addparams=[name,pwd];
        connection.query(adduser,addparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else {
                console.log(result);
                callback(err,result);
            }
        });
        //关闭数据库
        connection.end();
    }
    this.deleteuser=function(name) {
        //删除语句
        var deluser='DELETE FROM user WHERE username=?';
        //字段的值
        var delparams=[name];
        connection.query(deluser,delparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
        });
        //关闭数据库
        connection.end();
    }
    this.uplostuserpwd=function(passwd,uid,callback) {
        //更新语句
        var upuser='UPDATE user SET password=? WHERE uid=?';
        //字段的值
        var upparams=[passwd,uid];
        connection.query(upuser,upparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }else{
                callback(err,'ok');
            }
        });
        //关闭数据库
        connection.end();
    }
    this.queryinfo=function(username,passwd,callback) {
        //查询语句
        var queuser='SELECT * FROM admin WHERE adname=? AND adpassword=?';
        var queparams=[username,passwd];
        connection.query(queuser,queparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            else{
                if(result.length==0){
                    // console.log(result);
                    callback(err,result);
                }else {
                    // console.log(result);
                    callback(err,result);
                }
            }
        });
    }
    this.lostqueryuser=function(username,usertel,callback) {
        //查询语句
        var queuser='SELECT * FROM user WHERE username=? AND usertel=?';
        var queparams=[username,usertel];
        connection.query(queuser,queparams,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            else{
                if(result.length==0){
                    // console.log(result);
                    callback(err,result);
                }else {
                    // console.log(result);
                    callback(err,result);
                }
            }
        });
        connection.end();
    }
    this.close=function () {
        //关闭数据库
        connection.end();
    }
}
//暴露接口
module.exports=mysqlClass;