const express=require('express');
//�������ӳ�ģ��
const pool=require('../pool.js');
//����·��������
const router=express.Router();


//1.��Ʒ�б�
router.get('/list',function(req,res){
	//��ȡ����
  var obj=req.query;
  console.log(obj);
  //�пգ�Ĭ��ֵ
  var pno=obj.pno;
  var count=obj.count;
  //���ҳ��Ϊ�գ�Ĭ��ֵΪ1
  if(!pno)  pno=1;
  //�����СΪ�գ�Ĭ��ֵΪ9
  if(!count) count=9;
  //ת����
  pno=parseInt(pno);
  count=parseInt(count);
   //���㿪ʼ
  var start=(pno-1)*count;
  //ִ��sql���
  pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,count],function(err,result){
    if(err) throw err;
	res.send(result);
  });
});

//2.��Ʒ����

//3.��Ʒ���
router.post('add',function(req,res){
  var obj=req.body;
  console.log(obj);
  var i=400;
    for(var key in obj){
	  i++;
    //console.log(key,obj[key]);
	//�������ֵΪ�գ���ʾ����������
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

//4.ɾ����Ʒ
//5.�޸���Ʒ
module.exports=router;


