HanulCo.IconLaunchRoom = OBJECT({
	
	init : () => {
			
		let rootPath = process.cwd();
		
		HanulCo.ROOM('iconLaunchRoom', (clientInfo, on, off) => {
			
			on('icon', (fileId, ret) => {
				
				let filePath = rootPath + '/__RF/HanulCo/' + fileId;
				
				let totalCount = 0;
				let doneCount = 0;
				
				EACH(HanulCo.IconSizeMap, (size, name) => {
					totalCount += 1;
					
					GRAPHICSMAGICK_CONVERT([filePath, '-resize', size + 'x' + size + '^', '-gravity', 'center', '-crop', size + 'x' + size + '+0+0', filePath + '-' + name + '.png'], {
						error : (errorMsg) => {
							console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
						},
						success : () => {
							doneCount += 1;
							
							if (totalCount === doneCount) {
								ret();
							}
						}
					});
				});
			});
			
			on('launchImage', (fileId, ret) => {
				
				let filePath = rootPath + '/__RF/HanulCo/' + fileId;
				
				GRAPHICSMAGICK_IDENTIFY(filePath, (features) => {
						
					let totalCount = 0;
					let doneCount = 0;
					
					if (features.width > features.height) {
						
						EACH(HanulCo.LaunchImageMap, (size, name) => {
							totalCount += 1;
							
							GRAPHICSMAGICK_CONVERT([filePath, '-resize', size.height + 'x' + size.width + '^', '-gravity', 'center', '-crop', size.height + 'x' + size.width + '+0+0', filePath + '-' + name + '.png'], {
								error : (errorMsg) => {
									console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
								},
								success : () => {
									doneCount += 1;
									
									if (totalCount === doneCount) {
										ret();
									}
								}
							});
						});
					}
					
					else {
						
						EACH(HanulCo.LaunchImageMap, (size, name) => {
							totalCount += 1;
							
							GRAPHICSMAGICK_CONVERT([filePath, '-resize', size.width + 'x' + size.height + '^', '-gravity', 'center', '-crop', size.width + 'x' + size.height + '+0+0', filePath + '-' + name + '.png'], {
								error : (errorMsg) => {
									console.log('오류가 발생했습니다. 오류 메시지: ' + errorMsg);
								},
								success : () => {
									doneCount += 1;
									
									if (totalCount === doneCount) {
										ret();
									}
								}
							});
						});
					}
				});
			});
		});
	}
});
