const { SuccessModel,ErrorModel } = require("../model/resModel");
const {
    bannerCreate,
    deleteBanner,
    bannerList,
}=require('../controller/banner');
const {uploadImg}=require('../utils/index');
const handleBannerRoute=(req,res)=>{
    const method=req.method||'';
    const bannerData=req.body||{};
    if(method==='POST'&&req.path==='/api/banner/upload'){
        const {imgType,imgBase64,bauthor}=bannerData;
        return uploadImg(req,res,imgType,imgBase64,'/public/banner/').then(res=>{
            return bannerCreate(bauthor,res.url).then(result=>{
                return new SuccessModel({...res,...result});
            }).catch(err=>{
                return new ErrorModel(err);
            });
        });
    }
    if(method==='POST'&&req.path==='/api/banner/delete'){
        return deleteBanner(bannerData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/banner/list'){
        return bannerList(bannerData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
}
module.exports=handleBannerRoute;

