const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../mongodb/db-asyncv2')
const node_xlsx = require('node-xlsx'); //解析excel文件
const nodeExcel = require('excel-export'); //生成excel文件
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');

// const upload = multer({
// 	dest: './upload'
// });
// const storage = multer.diskStorage({ //储存到磁盘
// 	destination: function (req, res, cb) {
// 		let _path = path.join(__dirname, "./upload");
// 		if (!fs.existsSync(_path)) {
// 			fs.mkdirSync(_path);
// 		}
// 		cb(null, _path); //_path要是已存在的路径
// 	},
// 	filename: function (req, file, cb) {
// 		let filenameArr = file.originalname.split('.');
// 		cb(null, Date.now() + '-' + filenameArr[filenameArr.length - 1]);
// 	}
// });

// const upload = multer({
// 	storage
// });


var storage = multer.memoryStorage(); //储存到内存
var upload = multer({
	storage: storage
});

/* GET users listing. */
router.get('/list', async (req, res, next) => {
	let data = await db.select('orders', {});
	res.send(data);
	// db.select('orders', {}, data => {
	// 	res.send(data);
	// })
});


router.post('/upload', upload.single('excel'), async (req, res, next) => {
	//注1意，multer只能处理multipart/form-data数据，也就是postman里面的form-data,不是binary
	console.log(req.body);
	console.log(req.file);
	let splitName = req.file.originalname.split('.');
	let filetypename = splitName[splitName.length - 1];
	//判断文件类型
	if (filetypename != 'xlsx' && filetypename != 'xls' && filetypename != 'xlsm' && filetypename != 'xltx' && filetypename != 'xltm' && filetypename != 'xlsb' && filetypename != 'xlam') {
		res.send({
			msg: '请上传excel文件'
		});
	} else {

		//读取file文件下的buffer，进行解析
		let obj = node_xlsx.parse(req.file.buffer);
		let excleObj = obj[0].data;
		let insertData = [];

		for (let i = 1; i < excleObj.length; i++) {
			let tempObj = {};
			for (let j = 0; j < excleObj[0].length; j++) {
				tempObj[excleObj[0][j]] = excleObj[i][j];
			}
			insertData.push(tempObj);
		}

		let data = await db.insert('orders', insertData);
		res.send(data);


		// db.insert('orders', insertData, data => {
		// 	res.send(data);
		// })

	}
});

router.get('/download', async (req, res, next) => {
	let data = await db.select('orders', {});
	let conf = {}; //创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
	let cols = ['_id', 'status', 'orderID', 'data', 'consignee', 'phone', 'payStyle', 'logInfo', 'orderPrice']; //手动创建表头中的内容
	conf.cols = []; //在conf中添加cols

	for (let i = 0; i < cols.length; i++) {
		let tits = {}; //创建表头数据所对应的类型,其中包括 caption内容 type类型
		tits.caption = cols[i]; //添加内容
		tits.type = 'string'; //添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
		conf.cols.push(tits); //将每一个表头加入cols中
	}

	let rows = [];

	data.dataList.forEach(col => { //遍历查询到的数据
		let row = [];
		cols.forEach(tit => {
			row.push(col[tit])
		})
		rows.push(row);
	})
	conf.rows = rows; //将所有行加入rows中
	let result = nodeExcel.execute(conf); //将所有数据写入nodeExcel中
	res.setHeader('Content-Type', 'application/vnd.openxmlformats');//设置响应头，让浏览器下载而不是打开
	res.setHeader("Content-Disposition", "attachment; filename=order-" + Date.now() + ".xlsx");
	res.end(result, 'binary');

});



module.exports = router;