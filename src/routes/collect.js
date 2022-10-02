const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    collectList,
    collectCreate,
    deleteCollect,
}=require('../controller/collect');
const handleCollectRoute=(req,res)=>{
    const method=req.method||'';
    const collectData=req.body||{};
    if(method==='POST'&&req.path==='/api/collect/create'){
        return collectCreate(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/collect/delete'){
        return deleteCollect(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/collect/list'){
        return collectList(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}


module.exports=handleCollectRoute;