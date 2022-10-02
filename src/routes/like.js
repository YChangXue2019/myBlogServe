const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    likeList,
    likeCreate,
    deleteLike,
}=require('../controller/like');
const handleLikeRoute=(req,res)=>{
    const method=req.method||'';
    const collectData=req.body||{};
    if(method==='POST'&&req.path==='/api/like/create'){
        return likeCreate(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/like/delete'){
        return deleteLike(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/like/list'){
        return likeList(collectData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}


module.exports=handleLikeRoute;