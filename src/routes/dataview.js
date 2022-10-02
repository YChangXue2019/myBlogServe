const { SuccessModel,ErrorModel } = require("../model/resModel");
const {uploadImg}=require('../utils/index');
const {
    userInfo,
    categoryInfo,
    articleInfo,
    articleSevenInfo,
    todayInfo,
    swiperInfo,
}=require('../controller/dataview');
const {
    updateUserAvatar,
}=require ('../controller/user');
const handlerDataViewRoute=(req,res)=>{
    const method=req.method||'';
    const viewInfo=req.body||{};
    // 头像上传
    if(method==='POST'&&req.path==='/api/data/avatar'){
        const {imgType,imgBase64,username}=viewInfo;
        return uploadImg(req,res,imgType,imgBase64,'/public/avatar/').then(res=>{
            console.log(res,321456);
            return updateUserAvatar(username,res.url).then(result=>{
                return new SuccessModel({...res,...result});
            }).catch(err=>{
                return new ErrorModel(err);
            });
        });
    }
    // 用户基本信息查询
    if(method==='POST'&&req.path==='/api/data/user'){
        return userInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    // 用户基本信息查询
    if(method==='POST'&&req.path==='/api/data/category'){
        return categoryInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    // 文章统计查询
    if(method==='POST'&&req.path==='/api/data/article'){
        return articleInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    // 近七日走势图
    if(method==='POST'&&req.path==='/api/data/articleSeven'){
        return articleSevenInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    // 今日数据
    if(method==='POST'&&req.path==='/api/data/today'){
        return todayInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    // 轮播图数据
    if(method==='POST'&&req.path==='/api/data/swiper'){
        return swiperInfo(viewInfo).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}

module.exports=handlerDataViewRoute;