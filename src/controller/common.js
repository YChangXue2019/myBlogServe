const {execSQL}=require('../db/mysql');

// 点赞
const menuList=()=>{
    const sql=`select sql_calc_found_rows * from smenu;select found_rows() as total;`
    return execSQL(sql,'select');
}
module.exports={
    menuList,
}