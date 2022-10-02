const moment=require('moment')
const {execSQL}=require('../db/mysql');

// 收藏
const collectCreate=(collectData)=>{
    const {cid,bid,cauthor}=collectData;
    const ctime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sql=`insert into collect (cid,bid,cauthor,ctime) values(${cid},${bid},'${cauthor}','${ctime}');`
    return execSQL(sql,'insert');
}
// 删除收藏
const deleteCollect=(collectData)=>{
    const {id}=collectData;
    const sql=`delete from collect where id=${id};`
    return execSQL(sql,'delete');
}
// 收藏列表查询
const collectList=(collectData)=>{
    const {cid,title,cauthor,sTime,eTime,pageSize,currentPage}=collectData;
    let sql=`select sql_calc_found_rows co.id, ca.cname as cname,bl.title as title,co.cauthor,co.ctime 
                from collect as co,blogs as bl,category as ca 
                where co.cid=ca.cid and co.bid=bl.bid`
    if(cid){
        sql+=` and co.cid=${cid}`
    }
    if(title){
        sql+=` and bl.title='${title}'`
    }
    if(cauthor){
        sql+=` and co.cauthor='${cauthor}'`
    }
    if(sTime){
        sql+=` and date(co.ctime)>=date('${sTime}')`
    }
    if(eTime){
        sql+=` and date(co.ctime)<=date('${eTime}')`
    }            
    sql+=` order by co.ctime desc limit ${(currentPage-1)*pageSize},${pageSize};select found_rows() as total;`
    return execSQL(sql,'select');
}




module.exports={
    collectCreate,
    collectList,
    deleteCollect,
}