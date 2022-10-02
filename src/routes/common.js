const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    menuList,
}=require('../controller/common');
const handleCommonRoute=(req,res)=>{
    const method=req.method||'';
    const commonData=req.body||{};
    if(method==='POST'&&req.path==='/api/common/smenu'){
        return menuList(commonData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}
module.exports=handleCommonRoute;