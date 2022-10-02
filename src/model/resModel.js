// 基础模型
class BaseModel {
    constructor(data,message){
        if(typeof data === 'string'){
            this.message=data;
            data=null;
            message=null;
        }
        if(data){
            return data
        }
        if(message){
            return message;
        }
    }
}
// 成功模型
class SuccessModel extends BaseModel {
    constructor(data,token,message){
        super(data,message);
        if(token){
            this.token=token;
        }
        this.statusCode='000000';
    }
}
// 失败模型
class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.statusCode='CCCCCC';
    }
}
module.exports={
    SuccessModel,
    ErrorModel,
}