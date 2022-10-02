const moment=require('moment')
const {execSQL}=require('../db/mysql');

// 点赞
const likeCreate=(likeData)=>{
    const {cid,bid,lauthor}=likeData;
    const ltime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sql=`insert into ulike (cid,bid,lauthor,ltime) values(${cid},${bid},'${lauthor}','${ltime}');`
    return execSQL(sql,'insert');
}
// 删除点赞
const deleteLike=(likeData)=>{
    const {id}=likeData;
    const sql=`delete from ulike where id=${id};`
    return execSQL(sql,'delete');
}
// 点赞列表查询
const likeList=(likeData)=>{
    const {cid,title,lauthor,sTime,eTime,pageSize,currentPage}=likeData;
    let sql=`select sql_calc_found_rows li.id, ca.cname as cname,bl.title as title,li.lauthor,li.ltime 
                from ulike as li,blogs as bl,category as ca 
                where li.cid=ca.cid and li.bid=bl.bid`
    if(cid){
        sql+=` and li.cid=${cid}`
    }
    if(title){
        sql+=` and bl.title='${title}'`
    }
    if(lauthor){
        sql+=` and li.lauthor='${lauthor}'`
    }
    if(sTime){
        sql+=` and date(li.ltime)>=date('${sTime}')`
    }
    if(eTime){
        sql+=` and date(li.ltime)<=date('${eTime}')`
    }            
    sql+=` order by li.ltime desc limit ${(currentPage-1)*pageSize},${pageSize};select found_rows() as total;`
    return execSQL(sql,'select');
}




module.exports={
    likeCreate,
    deleteLike,
    likeList,
}