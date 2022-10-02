# 一、项目介绍
本项目为个人博客服务端项目。主要使用原生node.js和JavaScript开发。数据库使用 MySql 8.0。
# 二、数据库名称
myblog
# 三、数据库表及建表语句
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

# 四、开发中用到的sql语句（比较乱，可自行整理）

insert into category (cid,cname) values(null,'HTML&CSS');  
insert into category (cid,cname) values(null,'JavaScript');  
select * from category;  

select sql_calc_found_rows * from category;  
select found_rows() as total;  

insert into blogs values(null,1001,'HTML&CSS','HTML和CSS就像好东西','行者','2022-09-14',null);  
select bid,b.cid,title,content,author,sendtime,modifiytime,cname, count(bid) as total  from blogs as b,category as c where b.cid=c.cid;    
select * from blogs;  

insert into review values(null,1002,1,'行者行者','这篇文章写的真的好，字字珠玑，总结的非常到位，很实用',now());  
select r.rid,r.cid,r.bid,r.rauthor,r.rcontent,r.rtime,c.cname,b.title from review as r,category as c,blogs as b where r.cid=c.cid and r.bid=b.bid and r.rid=1;  
select count(*) as total from review;  
select * from review;  
select * from category;  
select * from blogs order by cid;  
insert into review (cid,bid,rauthor,rcontent,rtime) values (1002,4,'行者行者','但是但是多所多所3999s9ss放的地方','2022-09-13 20:39:05');  

select   
	c.cname,b.cid,count(b.bid) as blogTotal,count(r.rid) as reviewTotal   
from   
	category as c,blogs as b,review as r   
where   
	b.cid=c.cid and b.cid=r.cid  
group by c.cid;  

select sql_calc_found_rows c.cid,cname,count(b.bid) as bTotal from category c left outer join blogs as b on c.cid=b.cid group by c.cid order by c.cid;  
select found_rows() as total;  


select c.cid,count(r.rid) from category as c,review as r where c.cid=r.cid group by c.cid order by c.cid;  
select * from review;  
select * from review  where bid=4;   
delete from review where bid=1;  

select * from user;  
select sql_calc_found_rows c.cid,cname,count(b.bid) as bTotal from category c left outer join blogs as b on c.cid=b.cid group by c.cid having c.cid=1002;  

select * from review where date(rtime)='2022-09-17';  
update user set username='南瓜' where id=16;  

select * from user;  
delete from user;  
select * from blogs;  
insert into user(username,password,createAt,manageFlag) values('楠楠','123456',now(),'1');  
select date(now());  
select c.cid,c.cname,count(b.bid) as total from category as c,blogs as b where c.cid=b.cid group by c.cid;  

### 查询当日数据
select c.cid,c.cname,count(b.bid) as dTotal   
from category as c   
left outer join blogs as b   
on c.cid=b.cid and TO_DAYS(b.sendtime) = TO_DAYS(NOW())   
group by c.cid;  
### 查询本月数据
select c.cid,c.cname,count(b.bid) as mTotal   
from category as c left outer join blogs as b   
on c.cid=b.cid and DATE_FORMAT(b.sendtime, '%Y%m' ) = DATE_FORMAT( CURDATE() , '%Y%m' )   
group by c.cid;  
### 查询所有数据
select c.cid,c.cname,count(b.bid) as allTotal   
from category as c   
left outer join blogs as b   
on c.cid=b.cid   
group by c.cid;  

select sql_calc_found_rows d.cid,d.cname,d.dTotal,m.mTotal,a.aTotal from (select c.cid,c.cname,count(b.bid) as dTotal   
from category as c   
left outer join blogs as b   
on c.cid=b.cid and TO_DAYS(b.sendtime) = TO_DAYS(NOW())   
group by c.cid) as d join (select c.cid,c.cname,count(b.bid) as mTotal   
from category as c left outer join blogs as b   
on c.cid=b.cid and DATE_FORMAT(b.sendtime, '%Y%m' ) = DATE_FORMAT( CURDATE() , '%Y%m' )   
group by c.cid) as m join (select c.cid,c.cname,count(b.bid) as aTotal   
from category as c   
left outer join blogs as b   
on c.cid=b.cid   
group by c.cid) as a where d.cid=m.cid and m.cid=a.cid;  





select c.cid,c.cname,count(b.bid) as dTotal from category as c left outer join blogs as b on c.cid=b.cid and TO_DAYS(b.sendtime) = TO_DAYS(NOW()) group by c.cid  
union  
select c.cid,c.cname,count(b.bid) as mTotal from category as c left outer join blogs as b on c.cid=b.cid and DATE_FORMAT(b.sendtime, '%Y%m' ) = DATE_FORMAT( CURDATE() , '%Y%m' ) group by c.cid  
union  
select c.cid,c.cname,count(b.bid) as allTotal from category as c left outer join blogs as b on c.cid=b.cid group by c.cid;  

### 今天的日期
select date(subdate(curdate(),date_format(curdate(),'%w')-1)) as today;

## 昨天的日期
select  date(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 1 day)) as lastweek;

SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 1 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=lastweek;  


SELECT sql_calc_found_rows DATE(subdate(curdate(),date_format(curdate(),'%w')-1)) as lastweek,count(b.bid) as total from blogs as b where b.sendtime=date(now())  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 1 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 1 day))  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 2 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 2 day))  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 3 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 3 day))  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 4 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 4 day))  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 5 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 5 day))  
union all  
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 6 day)) as lastweek,count(b.bid) as total 
from blogs as b where b.sendtime=DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 6 day));

select found_rows() as total;  




SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 0 day)) as lastweek  
	union all  
SELECT  DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 1 day)) as lastweek    
	union all    
SELECT  DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 2 day)) as lastweek    
	union all    
SELECT  DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 3 day)) as lastweek    
	union all    
SELECT  DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 4 day)) as lastweek    
	union all    
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 5 day)) as lastweek    
	union all    
SELECT DATE(DATE_SUB(subdate(curdate(),date_format(curdate(),'%w')-1), interval 6 day)) as lastweek;  


select * from blogs  where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(sendtime) group by sendtime;  

SELECT DATE_FORMAT(DATE_SUB(NOW(), INTERVAL day_p DAY), '%Y-%m-%d') as all_day;  

	  SELECT  
      date_sub( curdate( ), INTERVAL 6 DAY ) AS dTime UNION  
      SELECT  
      date_sub( curdate( ), INTERVAL 5 DAY ) AS dTime UNION  
      SELECT
      date_sub( curdate( ), INTERVAL 4 DAY ) AS dTime UNION    
      SELECT  
      date_sub( curdate( ), INTERVAL 3 DAY ) AS dTime UNION  
      SELECT  
      date_sub( curdate( ), INTERVAL 2 DAY ) AS dTime UNION  
      SELECT  
      date_sub( curdate( ), INTERVAL 1 DAY ) AS dTime UNION  
      SELECT  
      date_sub( curdate( ), INTERVAL 0 DAY ) AS dTime;  

select count(b.bid) from blogs as b  where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(sendtime) group by sendtime;  
select DATE_FORMAT(SUBDATE(NOW(),interval sntable.sn day),'%Y-%m-%d') as statDate
from (select 0 as sn union select 1 as sn union select 2 union select 3 union select 4 union select 5 union select 6) sntable;  

## 查询近七日文章数量
select sql_calc_found_rows dTime.statDate as eTime,ifnull(sevevInfo.total,0) as total  
	from (  
		select DATE_FORMAT(SUBDATE(NOW(),interval sntable.sn day),'%Y-%m-%d') as statDate  
		from (  
			select 0 as sn union   
			select 1 as sn union   
            select 2 as sn union   
            select 3 as sn union   
            select 4 as sn union   
            select 5 as sn union   
            select 6) sntable  
	) as dTime   
    left outer join (  
		select b.sendtime,count(b.bid) as total from blogs as b   
        where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(sendtime)  
		group by sendtime) as sevevInfo   
        on dTime.statDate=sevevInfo.sendtime   
        group by dTime.statDate   
        order by dTime.statDate asc;  
        

        
## 查询近七日评论数量
select sql_calc_found_rows dTime.statDate as eTime,ifnull(rInfo.rTotal,0) as total  
	from (  
		select DATE_FORMAT(SUBDATE(NOW(),interval sntable.sn day),'%Y-%m-%d') as statDate  
		from (  
			select 0 as sn union   
			select 1 as sn union   
            select 2 as sn union   
            select 3 as sn union   
            select 4 as sn union   
            select 5 as sn union   
            select 6) sntable  
	) as dTime   
    left outer join (  
		select date(r.rtime) as rTime,count(r.rid) as rTotal from review as r group by date(r.rtime)) as rInfo   
        on dTime.statDate=rInfo.rTime   
        group by dTime.statDate   
        order by dTime.statDate asc;  
## 近七日收藏数量
select sql_calc_found_rows dTime.statDate as eTime,ifnull(ukInfo.ukTotal,0) as total  
	from (  
		select DATE_FORMAT(SUBDATE(NOW(),interval sntable.sn day),'%Y-%m-%d') as statDate  
		from (  
			select 0 as sn union   
			select 1 as sn union   
            select 2 as sn union   
            select 3 as sn union   
            select 4 as sn union   
            select 5 as sn union   
            select 6) sntable  
	) as dTime   
    left outer join (  
		select date(uk.ltime) as ukTime,count(uk.id) as ukTotal from ulike as uk group by date(uk.ltime)) as ukInfo   
        on dTime.statDate=ukInfo.ukTime   
        group by dTime.statDate   
        order by dTime.statDate asc;  

 

select date(b.sendtime) as bTime, count(b.bid) as bTotal from blogs as b group by date(b.sendtime);  
select date(r.rtime) as rTime,count(r.rid) as rTotal from review as r group by date(r.rtime);  
    


select found_rows() as total;  
select * from blogs;  


select * from review;  


select * from category;select count(cid) as total from category;  

select sql_calc_found_rows r.rid,r.rauthor,r.rcontent,r.rtime,c.cname,b.title from review as r,category as c,blogs as b where r.cid=c.cid and r.bid=b.bid;  

select date(rtime),count(rid) as total from review where  TO_DAYS(rtime) = TO_DAYS(NOW());  

insert into collect (cid,bid,cauthor,ctime) values(1001,1,'楠楠','2022-09-21 18:19:32');  
select * from collect;  

select sql_calc_found_rows co.id, ca.cname as cname,bl.title as title,co.cauthor,co.ctime   
from collect as co,blogs as bl,category as ca
where co.cid=ca.cid and co.bid=bl.bid  
limit 1,2;  
select found_rows() as total;  

select * from ulike;  

select count(r.rid) as rTotal from review as r where  TO_DAYS(rtime) = TO_DAYS(NOW());  
select count(b.bid) as bTotal from blogs as b ;  
select count(c.id) as cTotal from collect as c where TO_DAYS(c.ctime) = TO_DAYS(NOW());  
select count(u.id) as uTotal from uLike as u where TO_DAYS(u.ltime) = TO_DAYS(NOW());  

select sql_calc_found_rows * from (select count(r.rid) as rTotal from review as r) as rInfo   
join (select count(b.bid) as bTotal from blogs as b) as bInfo   
join(select count(c.id) as cTotal from collect as c) as cInfo  
join (select count(u.id) as uTotal from uLike as u) as uInfo;  

select sql_calc_found_rows * from(select count(r.rid) as rTotal from review as r where  TO_DAYS(rtime) = TO_DAYS(NOW())) as rInfo  
join (select count(c.id) as cTotal from collect as c where TO_DAYS(c.ctime) = TO_DAYS(NOW())) as cInfo  
join (select count(u.id) as uTotal from uLike as u where TO_DAYS(u.ltime) = TO_DAYS(NOW())) as uInfo;  

select count(r.rid) as rTotal from review as r,blogs as b where b.bid=r.bid;  
select sql_calc_found_rows * from(select count(r.rid) as rTotal from review as r,blogs as b where b.bid=r.bid) as rInfo  
join (select count(c.id) as cTotal from collect as c) as cInfo  
join (select count(u.id) as uTotal from uLike as u) as uInfo;  

select count(r.rid) as rTotal from review as r where bid=1;  
select count(u.id) as uTotal from ulike as u where bid=1;  
select count(c.id) as cTotal from collect as c where bid=1;  

select * from ulike;  

select * from (select count(r.rid) as rTotal from review as r where bid=1) as rInfo  
join (select count(u.id) as uTotal from ulike as u where bid=1) as uInfo  
join (select count(c.id) as cTotal from collect as c where bid=1) as cInfo;  

select * from ulike where bid=1;  
select * from collect where bid=1 and cauthor='行者';  

select * from ulike where bid=1 and lauthor='行者';  



## 关掉数据库的安全模式
set sql_safe_updates = off;

## 向表blogs中插入一条数据

### blogs(对应表的列字段) values(对应列字段的值)
insert into blogs (title,content,author,createAt,type) values ('HTML介绍','HTML是一种id执行在浏览器端的超文本标记语言','用户名','12312312312','1');

### 查数据

### 查myblog数据库中blogs表中的所有数据
SELECT * FROM myblog.blogs;

### 查myblog数据库中blogs表中的id和title数据
SELECT id,title FROM myblog.blogs;

条件查询
## 条件查询
### 查询类型为1并且author为“用户名”数据
SELECT * FROM myblog.blogs where type='1' and author='用户名';
### 查询类型为1或者author为“用户名”数据
SELECT * FROM myblog.blogs where type='1' or author='用户名';

## 模糊查询
SELECT * FROM myblog.blogs where author like '%南%';

## 排序（更具id倒叙排列desc）
SELECT * FROM myblog.blogs where author like '%南%' order by id desc;


## 更新（where条件最好是主键）
UPDATE myblog.blogs set title='JavaScript语法介绍' where id='1';

## 如果where条件不是主键可能会报错，需要先执行SET SQL_SAFE_UPDATES = 0;再执行更新语句
SET SQL_SAFE_UPDATES = 0;
UPDATE myblog.blogs set title='js' where type='1';


## 删除（如果没有where条件会删除整个表格）
delete from myblog.blogs where title='js';

<!-- 软删除 改变状态即可  <>表示不等于 -->
update myblog.blogs set state=0 where type='1';

update myblog.blogs set state=0 where type<>'1';


## node连接MySql

### 引入mysql模块 
const mysql=require('mysql');
### 创建连接对象
const connection=createConnection({  
    host:'localhost',//主机  
    user:'root',//mysql用户名  
    port:3306,//mysql端口号  
    password:'ycx240118',//数据库密码  
    database:'myblog',//数据库名称  
})
### 开始连接
connection.connect();  
### 执行sql语句 
const sql=`SELECT * FROM myblog.blogs`;  
connection.query(sql,(err,res)=>{  
    if(err){  
        console.log(err);  
        return  
    }
    console.log(res);  
})

## 关闭连接 
connection.end();


<!-- JSON数据 -->
{  
    "title":"java技术",    
    "content":"java是后端开发技术",    
    "author":"李四",    
    "type":"1",    
    "createAt":"12312312342"    
}  
