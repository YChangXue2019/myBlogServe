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
