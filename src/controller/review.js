const {execSQL}=require('../db/mysql');
// 查询评论列表
const reviewList=(reviewData)=>{
    const {cid,title,rauthor,sTime,eTime,pageSize,currentPage}=reviewData;
    let sql=`select sql_calc_found_rows r.rid,r.rauthor,r.rcontent,r.rtime,c.cname,b.title from review as r,category as c,blogs as b where r.cid=c.cid and r.bid=b.bid `
    if(cid){
        sql+=` and r.cid=${cid}`
    }
    if(title){
        sql+=` and b.title='${title}'`
    }
    if(rauthor){
        sql+=` and r.rauthor='${rauthor}'`
    }
    if(sTime){
        sql+=` and date(r.rtime)>='${sTime}'`
    }
    if(eTime){
        sql+=` and date(r.rtime)<='${eTime}'`
    }
    sql+=` order by r.rid asc limit ${(currentPage-1)*pageSize},${pageSize};select found_rows() as total;`
    return execSQL(sql,'select')
}
// 发表评论
const createReview=(reviewData)=>{
    const {cid,bid,rauthor,rcontent,rtime}=reviewData;
    const sql=`insert into review (cid,bid,rauthor,rcontent,rtime) values (${cid},${bid},'${rauthor}','${rcontent}','${rtime}')`;
    return execSQL(sql,'insert').then(res=>{
        console.log(res,147852);
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 修改评论
const updateReview=(reviewData)=>{
    const id=reviewData.id||'';
    const articleId=reviewData.articleId||'';
    const articelTitle=reviewData.articelTitle||'';
    const content=reviewData.content||'';
    const userId=reviewData.userId||'';
    const username=reviewData.username||'';
    const createAt=reviewData.createAt||Date.now()||'';
    const sql=`update myblog.blogs set title='${articleId}',articelTitle='${articelTitle},'content='${content}',userId='${userId}',username='${username}',createAt='${createAt}' where id=${id}`;
    return execSQL(sql).then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    });
}
// 删除评论
const deleteReview=(reviewData)=>{
    const id=reviewData.rid||'';
    let sql=`delete from review where rid=${id} `;
    return execSQL(sql,'delete').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 评论详情
const detailReview=(reviewData)=>{
    const rid=reviewData.rid&&reviewData.rid||'';
    const sql=`select r.rid,r.cid,r.bid,r.rauthor,r.rcontent,r.rtime,c.cname,b.title from review as r,category as c,blogs as b where r.cid=c.cid and r.bid=b.bid and r.rid=${rid}`;
    return execSQL(sql,'select');
}
module.exports={
    reviewList,
    createReview,
    updateReview,
    deleteReview,
    detailReview,
}