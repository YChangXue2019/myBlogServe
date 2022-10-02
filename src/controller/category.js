const {execSQL}=require('../db/mysql');
// 查询文章分类列表
const categoryList=(cid,currentPage,pageSize)=>{
    let sql=`select sql_calc_found_rows c.cid,cname,count(b.bid) as bTotal from category c left outer join blogs as b on c.cid=b.cid group by c.cid `;
    if(cid){
        sql+=`having c.cid=${cid} `
    }
    sql+=`order by c.cid limit ${(currentPage-1)*pageSize},${pageSize};select found_rows() as total;`
    return execSQL(sql,'select');
}
// 获取分类名称
const categoryOption=()=>{
    const sql=`select * from category;select count(cid) as total from category;`
    return execSQL(sql,'select');
}   
// 新增文章分类
const createCategory=(categoryData)=>{
    const {cname}=categoryData;
    const sql=`insert into category (cname) values ('${cname}')`;
    return execSQL(sql,'insert').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 删除文章分类
const deleteCategory=(categoryData)=>{
    const cid=categoryData.cid||'';
    const sql=`delete from category where cid=${cid}`;
    return execSQL(sql,'delete').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 修改文章分类
const updateCategory=(categoryData)=>{
    const {cid,cname}=categoryData;
    const sql=`update category set cname='${cname}' where cid=${cid}`
    return execSQL(sql,'update').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    });
}
// 根据分类名称查询分类
const createCategoryCheck=(cname)=>{
    const sql=`select ifnull((select cname from category where cname='${cname}'),0) as cname`
    return execSQL(sql,'select');
}
module.exports={
    categoryList,
    createCategory,
    deleteCategory,
    updateCategory,
    createCategoryCheck,
    categoryOption,
}