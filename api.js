const fs = require('fs')
const path = require('path')
const getRoot = (req,res) => {
res.statusCode = 200;
res.setHeader('Content-Type','application/json')
res.end(JSON.stringify({root:'from my first stuctred root folder'}))
}

const notFoundRoot = (req,res)=>{
	res.statusCode = 404;
	res.setHeader("Content-Type"," text/plain")
	res.end("404 PLEASE AWAY FROM THIS PAGE")
}
const rootError = (req,res)=>{
    res.statusCode = 500;
	res.setHeader("Content-Type"," text/plain")
	res.end("SOMETHING WENT WRONG")
}
const createFile = (req,res) => {
res.statusCode = 200;
res.setHeader('Content-Type','application/json')
    const filePath = path.join("./data", req.body.fileName);
res.end(JSON.stringify({messsage:'your file created successFully',status:true,path}))
}



module.exports = {
	getRoot,
	notFoundRoot,
	createFile,
	rootError
}