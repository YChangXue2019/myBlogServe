const moment=require('moment')
const {execSQL}=require('../db/mysql');

// 新增banner图信息
const bannerCreate=(bauthor,bannerUrl)=>{
    const btime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sql=`insert into banner (bannerUrl,bauthor,btime) values('${bannerUrl}','${bauthor}','${btime}')`;
    return execSQL(sql,'insert');
}
//查询banner图list数据
const bannerList=(bannerData)=>{
    const {currentPage,pageSize}=bannerData;
    const sql=`select sql_calc_found_rows * from banner limit ${(currentPage-1)*pageSize},${pageSize};
              select found_rows() as total;`;
    return execSQL(sql,'select');
}
//删除banner
const deleteBanner=(bannerData)=>{
    const {id}=bannerData;
    const sql=`delete from banner where id=${id}`;
    return execSQL(sql,'delete');
}
module.exports={
    bannerCreate,
    bannerList,
    deleteBanner,
}