require(process.env.UPPERCASE_PATH + '/index.js');

BOOT({
	CONFIG : {
		
		isDevMode : true,
		
		defaultBoxName : 'HanulCo',
		
		title : 'Hanul\'s Components',
		
		webServerPort : 8131
	},
	
	NODE_CONFIG : {
		
		isSingleCoreMode : true,
		
		dbName : 'HanulCo'
	}
});
