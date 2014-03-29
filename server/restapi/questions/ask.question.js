var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {
    askquestion: function(client, req, res) {
       
        console.log(req.body);//请求中还有参数data,data的值为一个json字符串
	    // var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    console.log(req.body.qnum);//解析json格式数据
		res.contentType('json');//返回的数据类型

		var data = req.body;
		    

		//questionTopFun(res, data);

        res.json(question);
    }
};