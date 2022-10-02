const {execSQL}=require('../db/mysql');
// 用户基本信息查询
const userInfo=(viewInfo)=>{
    const {username}=viewInfo;
    const sql=`select * from user where username='${username}'`
    return execSQL(sql,'select');
}
// 类别信息查询
const categoryInfo=()=>{
    const sql=`
        select sql_calc_found_rows * from (select count(r.rid) as rTotal from review as r) as rInfo 
        join (select count(b.bid) as bTotal from blogs as b) as bInfo 
        join(select count(c.id) as cTotal from collect as c) as cInfo
        join (select count(u.id) as uTotal from uLike as u) as uInfo;
        select found_rows() as total`
    return execSQL(sql,'select');
}
// 轮播图信息查询
const swiperInfo=()=>{
    const sql=`select sql_calc_found_rows * from banner;
               select found_rows() as total;`
    return execSQL(sql,'select');
}
// 获取文章信息数据
const articleInfo=()=>{
    const sql=`select sql_calc_found_rows d.cid,d.cname,d.dTotal,m.mTotal,a.aTotal from (select c.cid,c.cname,count(b.bid) as dTotal 
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
        select found_rows() as total;`
    return execSQL(sql,'select');
}
// 今日数据
const todayInfo=()=>{
    const sql=`
            select sql_calc_found_rows * from(select count(r.rid) as rTotal from review as r 
            where  TO_DAYS(rtime) = TO_DAYS(NOW())) as rInfo
            join (select count(c.id) as cTotal from collect as c where TO_DAYS(c.ctime) = TO_DAYS(NOW())) as cInfo
            join (select count(u.id) as uTotal from uLike as u where TO_DAYS(u.ltime) = TO_DAYS(NOW())) as uInfo;
            select found_rows() as total;`
    return execSQL(sql,'select');
}
//近七日走势图数据
const articleSevenInfo=()=>{
    const sql1=`select sql_calc_found_rows dTime.statDate as eTime,ifnull(sevevInfo.total,0) as total 
	            from (
	            	select date_format(subdate(now(),interval sntable.sn day),'%Y-%m-%d') as statDate
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
                    where date_sub(curdate(), interval 7 day) <= date(sendtime)
	            	group by sendtime) as sevevInfo 
                    on dTime.statDate=sevevInfo.sendtime 
                    group by dTime.statDate 
                    order by dTime.statDate asc;`
    const sql2=`select sql_calc_found_rows dTime.statDate as eTime,ifnull(rInfo.rTotal,0) as total
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
                    order by dTime.statDate asc;`
    const sql3=`select sql_calc_found_rows dTime.statDate as eTime,ifnull(cInfo.cTotal,0) as total
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
	            	select date(c.ctime) as cTime,count(c.id) as cTotal from collect as c group by date(c.ctime)) as cInfo 
                    on dTime.statDate=cInfo.cTime 
                    group by dTime.statDate 
                    order by dTime.statDate asc;`
    const sql4=`select sql_calc_found_rows dTime.statDate as eTime,ifnull(ukInfo.ukTotal,0) as total
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
                    order by dTime.statDate asc;`
    const sql=`${sql1}${sql2}${sql3}${sql4}`;
    return execSQL(sql,'line');
}

module.exports={
    userInfo,
    categoryInfo,
    articleInfo,
    articleSevenInfo,
    todayInfo,
    swiperInfo,
}
