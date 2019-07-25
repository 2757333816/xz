const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();

//查询为数组，其余为对象
//1.用户注册
router.post('/reg',function(req,res){

  var obj=req.body;
  console.log(obj);
  //2.验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
	return;//阻止往后执行
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
	return;//阻止往后执行
  }
  if(!obj.email){
    res.send({code:403,msg:'email required'});
	return;//阻止往后执行
  }
  if(!obj.phone){
    res.send({code:404,msg:'phone required'});
	return;//阻止往后执行
  }//3.执行SQL语句
 pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
    if (err) throw err;
	//console.log(result);
  //});
 // res.send('注册成功');
    if(result.affectedRows>0){
       res.send({code:200,msg:'register suc'});
    }
  });
});

//2.用户登录
router.post('/login',function(req,res){
	//获取post数据
  var obj=req.body;
  //console.log(obj);
  //2.2 验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
	return;//阻止往后执行
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //res.send('登陆成功');
  //查询用户和密码同时满足的数据
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
    if(err) throw err;
	//console.log(result);
	//判断是否登陆成功
    if(result.length>0){
       res.send({code:200,msg:'login suc'});
    } else{
	   res.send({code:301,msg:'login err'});
	}
  });
});


//3.用户检索
router.get('/detail',function(req,res){
	//获取get数据
  var obj=req.query;
  console.log(obj);
  //3.2 验证数据是否为空
   if(!obj.uid){
     res.send({code:401,msg:'uid required'});
   return;
  }
  //查询编号的数据
  pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
    if(err) throw err;
	//res.send(result);
	//是否检索到用户，如果检索到，把该用户的对象响应到浏览器，否则响应检索不到
	if(result.length>0){
	  res.send( result[0] );
	}else{
	  res.send({code:301,msg:'can not found'});
	}
  });
});

//4.修改用户信息
router.get('/update',function(req,res){
  var obj=req.query;
  //console.log(obj);
  //遍历对象，访问每个属性
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
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
    if(err) throw err;
	console.log(result);
	//判断是否修改成功
	if(result.affectedRows>0){
	  res.send({code:200,msg:'update suc'});
	}else{
	  res.send({code:301,msg:'update error'});
	}
  });
});

//5.用户列表
router.get('/list',function(req,res){
	//获取数据
  var obj=req.query;
  console.log(obj);
  //判空，默认值
  var pno=obj.pno;
  var size=obj.size;
  //如果页码为空，默认值为1
  if(!pno)  pno=1;
  //如果大小为空，默认值为3
  if(!size) size=3;

  //转整型
  pno=parseInt(pno);
  size=parseInt(size);
   //计算开始
  var start=(pno-1)*size;
  //执行sql语句
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],function(err,result){
    if(err) throw err;
	res.send(result);

  });
});

//6.删除用户
router.get('/delete',function(req,res){
  //获取数据
  var obj=req.query;
  //console.log(obj);
  //是否为空
  if(!obj.uid){
    res.send({code:200,msg:'uid required'});
	return;
  }
  //执行SQL语句
  pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
	if(err) throw err;
	//console.log(result);
	//判断是否删除成功
	if(result.affectedRows>0){
	  res.send({code:200,msg:'del suc'});
	}else{
	  res.send({code:301,msg:'del err'});
	}
  });
});
/*
//7.商品列表
router.get('/list',function(req,res){
	//获取数据
  var obj=req.query;
  console.log(obj);
  //判空，默认值
  var pno=obj.pno;
  var count=obj.count;
  //如果页码为空，默认值为1
  if(!pno)  pno=1;
  //如果大小为空，默认值为3
  if(!count) count=3;

  //转整型
  pno=parseInt(pno);
  count=parseInt(count);
   //计算开始
  var start=(pno-1)*count;
  //执行sql语句
  pool.query('SELECT * FROM xz_laptop LIMIT ?,?',[start,count],function(err,result){
    if(err) throw err;
	res.send(result);

  });
});
*/ 

module.exports=router;





