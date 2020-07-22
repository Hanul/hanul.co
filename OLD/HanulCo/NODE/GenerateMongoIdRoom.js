HanulCo.GenerateMongoIdRoom = OBJECT({
	
	init : () => {
		
		const ObjectID = require("bson-objectid");
		
		HanulCo.ROOM('generateMongoIdRoom', (clientInfo, on, off) => {
			
			on('getIds', (data, ret) => {
				
				let ids = '';
				
				REPEAT(100, () => {
					ids += ObjectID() + '\n';
				});
				
				ret(ids);
			});
		});
	}
});
