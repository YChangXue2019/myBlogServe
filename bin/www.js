const http=require('http');
const {severHandler}=require('../app');
const PORT='5000';
const sever=http.createServer(severHandler);
sever.listen(PORT,()=>{
    console.log('服务启动成功',PORT);
})