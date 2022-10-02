const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    reviewList,
    createReview,
    updateReview,
    deleteReview,
    detailReview,
}=require('../controller/review');
const handlerReviewRoute=(req,res)=>{
    const method=req.method||'';
    const reviewData=req.body||'';
    if(method==='POST'&&req.path==='/api/review/list'){
        return reviewList(reviewData).then(res=>{
            return new SuccessModel(res);
        }).catch(err=>{
            return new ErrorModel(err)
        })
    }
    if(method==='POST'&&req.path==='/api/review/new'){
        return createReview(reviewData).then(res=>{
            if(res){
                return new SuccessModel("发布评论成功");
            }
            return new ErrorModel('发布评论失败');
        }).catch(err=>{
            return new ErrorModel('发布评论失败',err);
        })
    }
    if(method==='POST'&&req.path==='/api/review/delete'){
        return deleteReview(reviewData).then(res=>{
            if(res){
                return new SuccessModel("删除成功"); 
            }
            return new ErrorModel('删除失败');
        }).catch(err=>{
            return new ErrorModel('删除失败');
        })
    }
    if(method==='POST'&&req.path==='/api/review/update'){
        return updateReview(reviewData).then(res=>{
            if(res){
                return new SuccessModel("修改成功"); 
            }
            return new ErrorModel('修改失败'); 
        }).catch(err=>{
            return new ErrorModel('修改失败');
        })
    }
    if(method==='POST'&&req.path==='/api/review/detail'){
        return detailReview(reviewData).then(res=>{
            return new SuccessModel(res); 
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}
module.exports=handlerReviewRoute;