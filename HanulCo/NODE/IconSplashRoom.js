HanulCo.IconSplashRoom = OBJECT({
	
	init : () => {
			
		let rootPath = process.cwd();
		
		HanulCo.ROOM('iconSplashRoom', (clientInfo, on, off) => {
			
			on('icon', (fileId, ret) => {
				
				let filePath = rootPath + '/__RF/HanulCo/' + fileId;
				
				IMAGEMAGICK_CONVERT([filePath, '-resize', '300x300^', '-gravity', 'center', '-crop', '300x300+0+0', filePath + '-test.png'], {
					error : (errorMsg) => {
						console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
					},
					success : () => {
						console.log('이미지 크기를 변경하였습니다.');
					}
				});
			});
		});
	}
});
