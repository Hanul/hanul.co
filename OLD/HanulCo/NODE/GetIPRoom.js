HanulCo.GetIPRoom = OBJECT({
	
	init : () => {
		
		HanulCo.ROOM('getIPRoom', (clientInfo, on, off) => {
			
			on('getIP', (data, ret) => {
				ret(clientInfo.ip);
			});
		});
	}
});
