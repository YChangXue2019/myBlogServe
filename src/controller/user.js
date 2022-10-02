const moment=require('moment')
const {execSQL}=require('../db/mysql');
const {encodeString }=require ('../utils')
// 查询用户列表
const userList=(username,manageFlag,pageSize,currentPage)=>{
    let sql=`select sql_calc_found_rows * from user where 1=1 `
    if(username){
        sql+=`and username= '${username}' `
    }
    if(manageFlag){
        sql+=`and manageFlag= '${manageFlag}' `
    }
    sql+=`limit ${(currentPage-1)*pageSize},${pageSize};select found_rows() as total;`
    return execSQL(sql,'select');
}
// 登录查询
const loginCheck=(userData)=>{
    const username=userData.username||userData||'';
    const sql=`select * from myblog.user where username='${username}'`
    return execSQL(sql);
}
// 查询该新增用户名是否已存在
const createCheck=(userData)=>{
    const username=userData.username||'';
    const sql=`select * from user where username='${username}'`
    return execSQL(sql,'select');
}
// 获取用户详情
const userDetail=(userData)=>{
    const {username,password}=userData;
    const sql=`select * from myblog.user where name='${username}' and password='${password}' `;
    return execSQL(sql,'select');
}
// 新增用户
const createUser=(userData)=>{
    const username=userData.username||'';
    const password=userData.password&&encodeString(userData.password)||'';
    const createAt=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const manageFlag=userData.manageFlag||0;
    const sql=`insert into user (username,password,createAt,manageFlag) values ('${username}','${password}','${createAt}','${manageFlag}')`;
    return execSQL(sql).then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    }).catch(err=>{
        return false
    })
}
// 删除用户
const deleteUser=(userData)=>{
    const id=userData.id||'';
    const sql=`delete from myblog.user where id=${id}`
    return execSQL(sql).then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    }).catch(err=>{
        return false
    })
}
// 更新用户
const updateUser=(userData)=>{
    const {id,username,manageFlag}=userData;
    const sql=`update user set username='${username}',manageFlag='${manageFlag}' where id=${id}`
    return execSQL(sql).then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    }).catch(err=>{
        return false
    })
}
// 更新登录时间
const updateLoginTime=(userData)=>{
    const id=userData.id||'';
    const loginTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sql=`update user set loginTime='${loginTime}' where id=${id}`;
    return execSQL(sql,'update').then(res=>{
        if(res.affectedRows>0){
            return true;
        }else{
            return false;
        }
    }).catch(err=>{
        return false
    })
}
// 修改用户头像
const updateUserAvatar=(username,avatarUrl)=>{
    const sql=`update user set avatarUrl='${avatarUrl}' where username='${username}'`;
    return execSQL(sql,'update').then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    }).catch(err=>{
        return false
    })
}
// 修改密码查询
const modifiyPwdCheck=(username,oldPwd)=>{
    const sql=`select sql_calc_found_rows * from user where username='${username}' and password='${oldPwd}';
                select found_rows() as total;`;
    return execSQL(sql,'select')
}
// 修改密码
const modifiyPwd=(username,password)=>{
    const sql=`update user set password='${password}' where username='${username}'`;
    return execSQL(sql,'update').then(res=>{
        if(res.affectedRows>0){
            return true;
        }
        return false;
    }).catch(err=>{
        return false
    })
}
// 获取菜单列表
const menuList=(id)=>{
    let sql=`select * from myblog.menu`;
    return execSQL(sql);
}
module.exports={
    userList,
    loginCheck,
    userDetail,
    createUser,
    createCheck,
    deleteUser,
    updateUser,
    updateLoginTime,
    menuList,
    updateUserAvatar,
    modifiyPwdCheck,
    modifiyPwd,
}