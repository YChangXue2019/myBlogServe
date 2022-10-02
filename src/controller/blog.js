const {execSQL}=require('../db/mysql');
// 获取博客列表数据
const blogList=(blogData)=>{
    const {currentPage,pageSize,cid,title,author,sTime,eTime}=blogData;
    let sql=`select sql_calc_found_rows bid,b.cid,title,content,author,sendtime,modifiytime,cname from blogs as b,category as c where b.cid=c.cid `;
    if(cid){
        sql+=`and b.cid=${cid} `
    }
    if(title){
        sql+=`and b.title='${title}' `
    }
    if(author){
        sql+=`and b.author='${author}' `
    }
    if(sTime){
        sql+=`and b.sendtime>='${sTime}' `
    }
    if(eTime){
        sql+=`and b.sendtime<='${eTime}' `
    }
    if(currentPage&&pageSize){
        sql+=`limit ${(currentPage-1)*pageSize},${pageSize}; `
    }
    sql+='select found_rows() as total;'
    return execSQL(sql,'select');
}
// 根据文章id获取博客详情数据
const blogDetail=(id)=>{
    let sql=`select * from myblog.blogs where bid="${id}"`;
    return execSQL(sql,'select');
}
// 更新博客
const updateBlog=(blogData)=>{
    const {bid,cid,title,content,author,sendtime,modifiytime}=blogData;
    const sql=`update blogs set cid='${cid}', title='${title}',content='${content}',author='${author}',sendtime='${sendtime}',modifiytime='${modifiytime}' where bid=${bid}`;
    return execSQL(sql).then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 新增博客
const createNewBlog=(blogData)=>{
    const {cid,title,content,author,sendtime}=blogData;
    let sql=`insert into blogs (cid,title,content,author,sendtime) values ('${cid}','${title}','${content}','${author}','${sendtime}')`;
    return execSQL(sql,'insert').then(res=>{
        console.log(res,123);
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 删除博客(根据id删除博客)
const deleteBlog=(blogData)=>{
    const bid=blogData.bid||'';
    let sql=`delete from blogs where bid=${bid};delete from review where bid=${bid}`;
    return execSQL(sql,'delete').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 查询是否已经点赞
const blogLikeExist=(blogData)=>{
    const {bid,lauthor}=blogData;
    let sql=`select sql_calc_found_rows * from ulike where bid=${bid} and lauthor='${lauthor}';select found_rows() as total;`;
    return execSQL(sql,'select');
}
// 查询是否已经收藏
const blogCollectExist=(blogData)=>{
    const {bid,cauthor}=blogData;
    let sql=`select sql_calc_found_rows * from collect where bid=${bid} and cauthor='${cauthor}';select found_rows() as total;`;
    return execSQL(sql,'select');
}

//查询博客下对应的评论（根据博客id）
const blogReview=(blogData)=>{
    const bid=blogData.bid||'';
    let sql=`select sql_calc_found_rows * from review where bid='${bid}';select found_rows() as total;`;
    return execSQL(sql,'select');
}
// 查询博客下对应的收藏，点赞。评论数量（根据博客id）
const blogPlayTotal=(blogData)=>{
    const bid=blogData.bid||'';
    let sql=`select sql_calc_found_rows * from (select count(r.rid) as rTotal from review as r where bid=${bid}) as rInfo
            join (select count(u.id) as uTotal from ulike as u where bid=${bid}) as uInfo
            join (select count(c.id) as cTotal from collect as c where bid=${bid}) as cInfo;
            select found_rows() as total;`;
    return execSQL(sql,'select');
}
module.exports={
    blogList,
    blogDetail,
    updateBlog,
    createNewBlog,
    deleteBlog,
    blogReview,
    blogPlayTotal,
    blogLikeExist,
    blogCollectExist
}