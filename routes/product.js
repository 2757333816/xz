const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();


//1.商品列表
router.get('/list',function(req,res){
	//获取数据
  var obj=req.query;
  console.log(obj);
  //判空，默认值
  var pno=obj.pno;
  var count=obj.count;
  //如果页码为空，默认值为1
  if(!pno)  pno=1;
  //如果大小为空，默认值为9
  if(!count) count=9;
  //转整型
  pno=parseInt(pno);
  count=parseInt(count);
   //计算开始
  var start=(pno-1)*count;
  //执行sql语句
  pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,count],function(err,result){
    if(err) throw err;
	res.send(result);
  });
});

//2.商品详情

//3.商品添加
router.post('add',function(req,res){
  var obj=req.body;
  console.log(obj);
  var i=400;
    for(var key in obj){
	  i++;
    //console.log(key,obj[key]);
	//如果属性值为空，提示属性名必须
    if(!obj[key]){
	  res.send({code:i,msg:key+' required'});
	  return;
	}
	}
	pool.query('INSERT INTO xz_loptop SET ?',[obj[key]],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});

//4.删除商品
//5.修改商品
module.exports=router;


