const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    categoryList,
    createCategory,
    deleteCategory,
    updateCategory,
    createCategoryCheck,
    categoryOption,
}=require('../controller/category');
const handlerCategoryRoute=(req,res)=>{
    const method=req.method||'';
    const categoryData=req.body||'';
    if(method==='GET'&&req.path==='/api/category/list'){
        const {currentPage,pageSize,cid}=req.query;
        return categoryList(cid,currentPage,pageSize).then(res=>{
            return new SuccessModel(res);
        }).catch(err=>{
            return new ErrorModel(err)
        })
    }
    if(method==='POST'&&req.path==='/api/category/new'){
        return createCategory(categoryData).then(res=>{
            if(res){
                return new SuccessModel("新增成功");
            }
            return new ErrorModel('新增失败');
        }).catch(err=>{
            return new ErrorModel('新增失败');
        })
    }
    if(method==='POST'&&req.path==='/api/category/find'){
        return createCategoryCheck(categoryData.cname).then(res=>{
            return new SuccessModel(res);
        }).catch(err=>{
            return new ErrorModel(err);
        });
    }
    if(method==='POST'&&req.path==='/api/category/delete'){
        return deleteCategory(categoryData).then(res=>{
            if(res){
                return new SuccessModel("删除成功"); 
            }
            return new ErrorModel('删除失败');
        }).catch(err=>{
            return new ErrorModel('删除失败');
        })
    }
    if(method==='POST'&&req.path==='/api/category/update'){
        return updateCategory(categoryData).then(res=>{
            if(res){
                return new SuccessModel("修改成功"); 
            }else{
                return new ErrorModel('修改失败'); 
            }
        }).catch(err=>{
            return new ErrorModel('修改失败',err);
        })
    }
    if(method==='GET'&&req.path==='/api/category/option'){
        return categoryOption().then(res=>{
            return new SuccessModel(res); 
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}
module.exports=handlerCategoryRoute;