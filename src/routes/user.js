const { SuccessModel,ErrorModel } = require("../model/resModel");
const users=require('../model/data/user');
const { signToken,encodeString }=require ('../utils')
const Auth =require ('../utils/Auth')
const {
    userList,
    loginCheck,
    userDetail,
    createCheck,
    createUser,
    deleteUser,
    updateUser,
    updateLoginTime,
    menuList,
    modifiyPwdCheck,
    modifiyPwd,
}=require('../controller/user')
const handlerUserRoute=(req,res)=>{
    const method=req.method||'';
    const userData=req.body||{};
    if(method==='GET'&&req.path==='/api/user/list'){
        // console.log(req.query.token);
        const token=req.query.token||'';
        const isValid=Auth.verifiyToken(token);
        const {username,manageFlag,pageSize,currentPage}=req.query;
        return userList(username,manageFlag,pageSize,currentPage).then(result=>{
            return new SuccessModel(result);
        }).catch((err)=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/user/login'){
        return loginCheck(userData).then(result=>{
            if(result.length===0){
                return new ErrorModel('用户名不存在');
            }else{
                const data=result[0];
                const password=encodeString(userData.password);
                if(data.manageFlag==='1'){
                    if(!data.username){
                        return new ErrorModel('用户名不存在');
                    }else{
                        if(data.password===password){
                            const token=signToken(data.id,2);
                            return updateLoginTime(data).then(res=>{
                                if(res){
                                    return new SuccessModel('登录成功',token);
                                }else{
                                    return new SuccessModel('登录失败'); 
                                }
                            }).catch(err=>{
                                if(err){
                                    return new SuccessModel('登录失败'); 
                                }
                            });
                        }else if(data.password!==userData.password){
                            return new ErrorModel('密码错误');
                        }
                    }
                }else{
                    return new ErrorModel('您不是管理员，没有权限使用该系统，请联系管理员添加您的操作权限。');
                }
            }
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/user/modifiyPwd'){
        const oldPwd=encodeString(userData.oldPwd);
        const newPwd=encodeString(userData.newPwd);
        const username=userData.username;
        return modifiyPwdCheck(username,oldPwd).then(result=>{
            if(result.total>0&&result.list[0].password==oldPwd){
                return modifiyPwd(username,newPwd).then(res=>{
                    if(res){
                        return new SuccessModel('修改密码成功'); 
                    }else{
                        return new SuccessModel('修改密码失败');  
                    }
                }).catch(err=>{
                    return new SuccessModel('修改密码失败'); 
                })
            }else{
                return new ErrorModel('原密码输入不正确，请确认');  
            }
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/user/find'){
        return createCheck(userData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/user/detail'){
        return userDetail(userData).then(result=>{
            return new SuccessModel(result);
        }).catch(err=>{
            return new ErrorModel(err);
        })
    }
    if(method==='POST'&&req.path==='/api/user/new'){
        return createUser(userData).then(result=>{
            if(result){
                return new SuccessModel("添加用户成功");
            }
            return new ErrorModel('添加用户失败');
        }).catch(err=>{
            return new ErrorModel('添加用户失败');
        })
    }
    if(method==='POST'&&req.path==='/api/user/delete'){
        return deleteUser(userData).then(result=>{
            if(result){
                return new SuccessModel("删除用户成功");
            }
            return new ErrorModel('删除用户失败');
        }).catch(err=>{
            return new ErrorModel('删除用户失败');
        })
    }
    if(method==='POST'&&req.path==='/api/user/update'){
        return updateUser(userData).then(result=>{
            if(result){
                return new SuccessModel("修改用户成功");
            }
            return new ErrorModel('修改用户失败');
        }).catch(err=>{
            return new ErrorModel('修改用户失败');
        })
    }
    if(method==='GET'&&req.path==='/api/user/auth'){
        const {id}=req.query;
        return menuList(id).then(res=>{
            let authRouterInfo=[];
            const userInfo=users.filter((user)=>user.id===id)[0];
            userInfo.auth.map((rid)=>{
                res.map(router=>{
                    if(router.id===rid){
                        authRouterInfo.push(router) 
                    }
                })
            })
            return new SuccessModel(authRouterInfo);
        }).catch(err=>{
            return new ErrorModel('获取菜单失败');
        })
    }
}
module.exports=handlerUserRoute;