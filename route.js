
const Api = require('./api')
const url = require('url')
const routes = {
	'GET':{
		'/':Api.getRoot,
	},
	"POST":{
		'/file':Api.createFile
	}
}


const handleRoutes = (req,res) => {
	const method = req.method;
	const parsedUrl = url.parse(req.url,true)
	const path_name = parsedUrl.pathname
	try {
	if(routes[method][path_name]){
		routes[method][path_name](req,res)
	}
	else{
		Api.notFoundRoot(req,res)
	}
	}
	catch {
      Api.rootError(req,res)
	}
	
}
module.exports = handleRoutes