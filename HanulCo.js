require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		
		isDevMode : true,
		
		defaultBoxName : 'HanulCo',
		
		title : 'Hanul\'s Components',
		
		webServerPort : 8131
	},
	
	NODE_CONFIG : {
		
		isNotUsingCPUClustering : true,
		
		dbName : 'HanulCo'
	}
});
