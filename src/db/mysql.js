const mysql=require('mysql');
const {MYSQL_CONFIG}=require('../config/db');
const connection=mysql.createConnection(MYSQL_CONFIG);

connection.connect();

const execSQL=(sql,type)=>{
    console.log(sql);
    const promise=new Promise((resolve,reject)=>{
        connection.query(sql,(err,res)=>{
            if(err){
               reject(err);
                return
            }else{
                let info={};
                if(type=='select'){
                    if(res.length>1){
                        info={
                            total:res[1][0].total,
                            list:res[0],
                        }
                    }else{
                        info={
                            list:res[0]
                        }
                    }
                }else if(type==='line'){
                    info=handleSqlInfo(res);
                }else if(res.length==1){
                    info=res;
                }else if(res.length>1){
                    info=res[res.length-1];
                }else{
                    info=res;
                }
                resolve(info); 
            }
        })
    });
    return promise;
}
const handleSqlInfo=(res)=>{
    let dateList=[];
    const info=res[0];
    info.forEach(item => {
        dateList.push(item.eTime);
    });
    return {
        dateList,
        aList:res[0],
        rList:res[1],
        cList:res[2],
        uList:res[3],
    };
}
module.exports={
    execSQL
}
