# 一、项目介绍
本项目为个人博客服务端项目。主要使用原生node.js和JavaScript开发。数据库使用 MySql 8.0。
# 二、数据库名称
myblog
# 二、数据库表及建表语句
## user  （用户表）
create table user(
    id int primary key auto_increment,
    username varchar(20),
    password varchar(50),
    createAt datetime,
    loginTime datetime, 
    manageFlag varchar(5),
    avatarUrl varchar(150)
) auto_increment 1;
## blogs （博客表）
create table blogs(
	bid int primary key auto_increment,
    cid int,
    title varchar(50),
    content longtext,
    author varchar(20),
    sendtime date,
    modifiytime datetime default null
) auto_increment 1;
## category （博客类别表）
create table category(
	cid int primary key auto_increment,
    cname varchar(20)
) auto_increment=1001;
## review （文章评论表）
create table review(
	rid int primary key auto_increment,
    cid int,
    bid int,
    rauthor varchar(20),
    rcontent longtext,
    rtime datetime
) auto_increment 1;
## collect （文章收藏表）
create table collect(
	id int primary key auto_increment,
    cid int,
    bid int,
    cauthor varchar(20),
    ctime datetime
) auto_increment 1;
## ulike (文章点赞表)
create table ulike(
	id int primary key auto_increment,
    cid int,
    bid int,
    lauthor varchar(20),
    ltime datetime
) auto_increment 1;
## smenu （侧栏菜单表）
create table smenu(
	id int primary key,
    pid int,
    title varchar(50),
    path varchar(150),
    name varchar(150),
    icon varchar(150)
);
## banner (轮播图表)
create table banner(
	id int primary key auto_increment,
    bannerUrl varchar(150),
    bauthor varchar(20),
    btime datetime
) auto_increment 1;


##MySqL的常用Sql语句
关掉数据库的安全模式
set sql_safe_updates = off;

向表blogs中插入一条数据

blogs(对应表的列字段) values(对应列字段的值)
insert into blogs (title,content,author,createAt,type) values ('HTML介绍','HTML是一种id执行在浏览器端的超文本标记语言','南山行者','12312312312','1');

查数据

查myblog数据库中blogs表中的所有数据
SELECT * FROM myblog.blogs;

查myblog数据库中blogs表中的id和title数据
SELECT id,title FROM myblog.blogs;

条件查询
条件查询
查询类型为1并且author为“南山行者”数据
SELECT * FROM myblog.blogs where type='1' and author='南山行者';
查询类型为1或者author为“南山行者”数据
SELECT * FROM myblog.blogs where type='1' or author='南山行者';

模糊查询
SELECT * FROM myblog.blogs where author like '%南%';

排序（更具id倒叙排列desc）
SELECT * FROM myblog.blogs where author like '%南%' order by id desc;


更新（where条件最好是主键）
UPDATE myblog.blogs set title='JavaScript语法介绍' where id='1';

如果where条件不是主键可能会报错，需要先执行SET SQL_SAFE_UPDATES = 0;再执行更新语句
SET SQL_SAFE_UPDATES = 0;
UPDATE myblog.blogs set title='js' where type='1';


删除（如果没有where条件会删除整个表格）
delete from myblog.blogs where title='js';

<!-- 软删除 改变状态即可  <>表示不等于 -->
update myblog.blogs set state=0 where type='1';

update myblog.blogs set state=0 where type<>'1';


##node连接MySql

<!-- 引入mysql模块 -->
const mysql=require('mysql');
<!-- 创建连接对象 -->
const connection=createConnection({
    host:'localhost',//主机
    user:'root',//mysql用户名
    port:3306,//mysql端口号
    password:'ycx240118',//数据库密码
    database:'myblog',//数据库名称
})
<!-- 开始连接 -->
connection.connect();
<!-- 执行sql语句 -->
const sql=`SELECT * FROM myblog.blogs`;
connection.query(sql,(err,res)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(res);
})

<!-- 关闭连接 -->
connection.end();


<!-- JSON数据 -->
{
    "title":"java技术",
    "content":"java是后端开发技术",
    "author":"李四",
    "type":"1",
    "createAt":"12312312342"
}
