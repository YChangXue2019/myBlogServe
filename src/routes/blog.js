const {uploadImg}=require('../utils/index');
const { SuccessModel,ErrorModel } = require("../model/resModel");
const { 
    blogList,
    blogDetail,
    updateBlog,
    createNewBlog,
    deleteBlog,
    blogReview,
    blogPlayTotal,
    blogLikeExist,
    blogCollectExist
} =require("../controller/blog");
const {loginCheck}=require("../controller/user");
const handlerBlogRoute=(req,res)=>{
    const method=req.method||'';
    const blogData=req.body||'';
    const id=req.query.bid||'';
    if(method==='GET'&& req.path==='/api/blog/list'){
        return blogList(req.query).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='GET'&& req.path==='/api/blog/detail'){
        return blogDetail(id).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&& req.path==='/api/blog/update'){
        return updateBlog(blogData).then(result=>{
            if(result){
                return new SuccessModel('修改成功');
            }
            return new ErrorModel('修改失败');
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&&req.path==='/api/blog/new'){
        return createNewBlog(blogData).then(result=>{
            if(result){
                return new SuccessModel('新增成功');
            }else{
                return new ErrorModel('新增失败',err);
            }
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&&req.path==='/api/blog/delete'){
        return deleteBlog(blogData).then(result=>{
            if(result){
                return new SuccessModel('删除成功');
            }
            return new ErrorModel('删除失败');
        }).catch(err=>{
            return new ErrorModel('删除失败');
        });
    }
    if(method==='POST'&& req.path==='/api/blog/review'){
        return blogReview(blogData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&& req.path==='/api/blog/detailTotal'){
        return blogPlayTotal(blogData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&& req.path==='/api/blog/likeExist'){
        return blogLikeExist(blogData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&& req.path==='/api/blog/collectExist'){
        return blogCollectExist(blogData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&&req.path==='/api/blog/upload'){
        const {imgType,imgBase64}=blogData;
        return uploadImg(req,res,imgType,imgBase64,'/public/upload/');
    }
};
module.exports = handlerBlogRoute;


