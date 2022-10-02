const jsonwebtoken=require('jsonwebtoken');
const fs=require('fs');
const url=require('url');
const path =require('path');
const crypto=require('crypto');
const {tokenSalt,expiresIn}=require('../config/jwt.js')

/**
 * 密码加密方法
 * @param {加密的字符串} value 
 */
const encodeString=(value)=>{
    const md5=crypto.createHash('md5');
    return md5.update(value).digest('hex');
}
/**
 * 生成token的方法
 * @param {生成token的字符串} value 
 * @param {过期时间} expires 
 * @returns 
 */
const signToken=(value,auth)=>{
    return jsonwebtoken.sign({
        value,
        auth,
    },tokenSalt,{
        expiresIn:expiresIn,
    });
}
/**
 * 图片上传的方法
 */
const uploadImg=(req,res,imgType,imgBase64,staticUrl)=>{
    console.log(imgType,imgBase64,12345678);
    return new Promise((resolve,reject)=>{
        console.log(Buffer.from(`${imgBase64}`),987456);
        // 将base64转换成二进制文件
        let buffer=Buffer.from(imgBase64,'base64');
        console.log(buffer,123456);
        // 文件名
        let fileName=`_a${Math.random().toString().slice(2)}.${imgType}`;
        // 将文件写入服务器
        const url=__dirname.replace('utils','');
        const serveUrl=url+staticUrl+fileName;
        console.log('http://localhost:5000'+staticUrl+fileName,3698512);
        fs.writeFile(serveUrl,buffer,(err,data)=>{
            if(err){
                reject({msg:'上传失败',errMsg:err});
            }else{
                resolve({msg:'上传成功',url:'http://localhost:5000'+staticUrl+fileName});
            }
        })
    })
}
module.exports ={
    encodeString,
    signToken,
    uploadImg,
};