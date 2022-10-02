const querystring = require('querystring');
const urlModule=require('url');
const path =require('path');
const fs=require('fs');
const handlerBlogRoute=require('./src/routes/blog');
const handlerUserRoute=require('./src/routes/user');
const handlerReviewRoute=require('./src/routes/review');
const handlerCategoryRoute=require('./src/routes/category');
const handlerDataViewRoute=require('./src/routes/dataview');
const handleCollectRoute=require('./src/routes/collect');
const handleLikeRoute=require('./src/routes/like');
const handleBannerRoute=require('./src/routes/banner');
const handleCommonRoute=require('./src/routes/common');

// 处理post请求，post数据异步获取
const getPostData=(req)=>{
    const promise=new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({});
            return;
        }
        let postData='';
        req.on('data',(chunk)=>{
            postData+=chunk.toString();
        } );
        req.on('end',()=>{
            if(!postData){
                resolve({});
                return
            };
            resolve(JSON.parse(postData))
        })
    });
    return promise;
}
const severHandler=(req,res)=>{
    // 设置响应格式
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Expose-Headers", "*");    
    res.setHeader('Content-Type','application/json');    
    // 获取path
    const url=req.url;
    req.path=url.split('?')[0];//将path添加到req对象中
    // 解析query
    req.query=querystring.parse(url.split('?')[1]);//奖query添加到req对象中
    // 防止中文乱码
    if(url.includes('public')){
        const imageTypeObj={
            '.jpg':'image/jpg',
            '.jpeg':'image/jpeg',
            '.png':'image/png',
        };
        const pathName=encodeURI(urlModule.parse(url).pathname);
        const curl='/src'+pathName;
        // 转化为绝对路径
        const filePath=path.resolve(__dirname+curl);
        // 获取文件扩展名
        const extName=path.extname(pathName);
        const contentType=imageTypeObj[extName]||'text/plain';
        fs.stat(filePath,(err,stats)=>{
            if(err){
                res.writeHead(404,{'content-Type':'text/html'});
                res.end(`<h1>404 Not Found 999</h1>`);
                // res.end(err);
            }
            if(!err && stats.isFile()){
                readFile(filePath,contentType);
            }
        });
        const readFile=(filePath,contentType)=>{
            // 设置头
            res.writeHead(200,{'content-Type':contentType});
            // 创建流
            const stream=fs.createReadStream(filePath);
            // 流错误处理
            stream.on('error',(err)=>{
                res.writeHead('error',{'content-Type':'text/html'});
                res.end(`<h1>500</h1>`);
            })
            stream.pipe(res);
        }
    }else{
        getPostData(req,res).then(postData=>{
            req.body=postData||'';
            // 获取博客路由请求数据
            const routeDataBlogPromise=handlerBlogRoute(req,res);
            // 如果有数据返回数据
            if(routeDataBlogPromise){ 
                routeDataBlogPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 获取用户路由请求数据
            const routeDataUserPromise=handlerUserRoute(req,res);
            // 如果有数据返回
            if(routeDataUserPromise){ 
                routeDataUserPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 获取评论路由数据
            const routeDataReviewPromise=handlerReviewRoute(req,res);
            // 如果有数据返回
            if(routeDataReviewPromise){ 
                routeDataReviewPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 获取文章分类数据
            const routeDataCategoryPromise=handlerCategoryRoute(req,res);
            if(routeDataCategoryPromise){ 
                routeDataCategoryPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 收藏管理
            const routeCollectPromise=handleCollectRoute(req,res);
            if(routeCollectPromise){ 
                routeCollectPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 点赞管理
            const routeLikePromise =handleLikeRoute(req,res);
            if(routeLikePromise){ 
                routeLikePromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // banner图管理
            const routeBannerPromise =handleBannerRoute(req,res);
            if(routeBannerPromise){ 
                routeBannerPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 首页数据统计数据
            const routeHomeReviewPromise= handlerDataViewRoute(req,res);
            if(routeHomeReviewPromise){ 
                routeHomeReviewPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 公共接口
            const routeCommonPromise=handleCommonRoute(req,res);
            if(routeCommonPromise){ 
                routeCommonPromise.then(result=>{
                    res.end(
                        JSON.stringify(result)
                    );
                }).catch(err=>{
                    res.end(
                        JSON.stringify(err)
                    );
                });
                return
            }
            // 未匹配到任何路由
            res.writeHead(404,{'Content-type':'text/plain'});
            res.write('404 Not Found');
            res.end();
        })
    }
}
module.exports ={
    severHandler,
};