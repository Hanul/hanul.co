HanulCo.IconLaunch = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let iconLaunchRoom = HanulCo.ROOM('iconLaunchRoom');

		let table;
		let wrapper = DIV({
			style : {
				fontFamily : 'Noto Sans KR',
				fontSize : 16,
				padding : '20px 25px'
			},
			c : [HEADER({
				c : [H1({
					style : {
						fontSize : 30
					},
					c : 'Icon Launch'
				}), P({
					c : '이미지 하나로 앱 아이콘과 Launch Screen을 생성해주는 툴입니다. (현재는 Android만 가능합니다.)'
				})]
			}), DIV({
				style : {
					marginTop : 20
				},
				c : [H2({
					style : {
						fontSize : 20
					},
					c : '앱 아이콘 생성'
				}), P({
					c : '최대한 큰 앱 아이콘 이미지를 선택해주세요.'
				}), UUI.FULL_UPLOAD_FORM({
					style : {
						marginTop : 10,
						border : '1px solid #999'
					},
					box : HanulCo
				}, {
					overSizeFile : (maxUploadFileMB) => {
						alert('파일 용량은 ' + maxUploadFileMB + 'mb를 넘을 수 없습니다.');
					},
					success : (fileData) => {
						
						iconLaunchRoom.send({
							methodName : 'icon',
							data : fileData.id
						}, () => {
							
							let zip = new JSZip();
							
							let totalCount = 0;
							let doneCount = 0;
							
							EACH([
								'mdpi',
								'hdpi',
								'xhdpi',
								'xxhdpi',
								'xxxhdpi',
								'GooglePlayStore'
							], (type) => {
								totalCount += 1;
								
								let folder;
								if (type !== 'GooglePlayStore') {
									folder = zip.folder('mipmap-' + type);
								}
								
								let img = new Image();
								img.src = HanulCo.RF(fileData.id + '-' + type + '.png');
								img.onload = () => {
									
									let canvas = CANVAS({
										width : img.width,
										height : img.height
									}).appendTo(BODY);
									canvas.hide();
									
									let size = img.width;
									
									let context = canvas.getContext('2d');
									context.lineTo(size * 0.9, 0);
									context.quadraticCurveTo(size, 0, size, size * 0.1);
									context.lineTo(size, size * 0.9);
									context.quadraticCurveTo(size, size, size * 0.9, size);
									context.lineTo(size * 0.1, size);
									context.quadraticCurveTo(0, size, 0, size * 0.9);
									context.lineTo(0, size * 0.1);
									context.quadraticCurveTo(0, 0, size * 0.1, 0);
									context.clip();
									context.drawImage(img, 0, 0, size, size);
									
									if (type === 'GooglePlayStore') {
										
										let dataURL = canvas.getDataURL();
										zip.file('GooglePlayStore.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
											base64 : true
										});
										canvas.remove();
									}
									
									else {
										
										let dataURL = canvas.getDataURL();
										folder.file('ic_launcher.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
											base64 : true
										});
										canvas.remove();
										
										RUN(() => {
											
											let canvas = CANVAS({
												width : img.width,
												height : img.height
											}).appendTo(BODY);
											canvas.hide();
											
											let context = canvas.getContext('2d');
											context.arc(img.width / 2, img.width / 2, img.width / 2, 0, Math.PI * 2);
											context.clip();
											context.drawImage(img, 0, 0, img.width, img.height);
											
											let dataURL = canvas.getDataURL();
											folder.file('ic_launcher_round.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
												base64 : true
											});
											canvas.remove();
										});
									}
									
									doneCount += 1;
									
									if (totalCount === doneCount) {
										zip.generateAsync({
											type : 'blob'
										}) .then((content) => {
											saveAs(content, 'icons.zip');
										});
									}
								};
							});
							
							EACH([
								'iPhoneNotification2x',
								'iPhoneNotification3x',
								'iPhoneSettings2x',
								'iPhoneSettings3x',
								'iPhoneSpotlight2x',
								'iPhoneSpotlight3x',
								'iPhoneApp2x',
								'iPhoneApp3x',
								'iPadNotification1x',
								'iPadNotification2x',
								'iPadSettings1x',
								'iPadSettings2x',
								'iPadSpotlight1x',
								'iPadSpotlight2x',
								'iPadApp1x',
								'iPadApp2x',
								'iPadProApp2x',
								'AppStore'
							], (type) => {
								totalCount += 1;
								
								let folder;
								if (type !== 'AppStore') {
									folder = zip.folder('AppIcon');
								}
								
								let img = new Image();
								img.src = HanulCo.RF(fileData.id + '-' + type + '.png');
								img.onload = () => {
									
									let canvas = CANVAS({
										width : img.width,
										height : img.height
									}).appendTo(BODY);
									canvas.hide();
									
									let size = img.width;
									
									let context = canvas.getContext('2d');
									context.drawImage(img, 0, 0, size, size);
									
									if (type === 'AppStore') {
										
										let dataURL = canvas.getDataURL();
										zip.file('AppStore.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
											base64 : true
										});
										canvas.remove();
									}
									
									else {
										
										let dataURL = canvas.getDataURL();
										folder.file(type + '.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
											base64 : true
										});
										canvas.remove();
									}
									
									doneCount += 1;
									
									if (totalCount === doneCount) {
										zip.generateAsync({
											type : 'blob'
										}) .then((content) => {
											saveAs(content, 'icons.zip');
										});
									}
								};
							});
						});
					}
				})]
			}), DIV({
				style : {
					marginTop : 20
				},
				c : [H2({
					style : {
						fontSize : 20
					},
					c : 'Launch 이미지 생성'
				}), P({
					c : '최대한 큰 Launch 이미지를 선택해주세요.'
				}), UUI.FULL_UPLOAD_FORM({
					style : {
						marginTop : 10,
						border : '1px solid #999'
					},
					box : HanulCo
				}, {
					overSizeFile : (maxUploadFileMB) => {
						alert('파일 용량은 ' + maxUploadFileMB + 'mb를 넘을 수 없습니다.');
					},
					success : (fileData) => {
						
						iconLaunchRoom.send({
							methodName : 'launchImage',
							data : fileData.id
						}, () => {
							
							let zip = new JSZip();
							
							let totalCount = 0;
							let doneCount = 0;
							
							EACH(HanulCo.LaunchImageMap, (size, type) => {
								totalCount += 1;
								
								let img = new Image();
								img.src = HanulCo.RF(fileData.id + '-' + type + '.png');
								img.onload = () => {
									
									let canvas = CANVAS({
										width : img.width,
										height : img.height
									}).appendTo(BODY);
									canvas.hide();
									
									let size = img.width;
									
									let context = canvas.getContext('2d');
									context.drawImage(img, 0, 0, img.width, img.height);
									
									let dataURL = canvas.getDataURL();
									zip.file(type + '.png', dataURL.substring(dataURL.indexOf('base64,') + 7), {
										base64 : true
									});
									canvas.remove();
									
									doneCount += 1;
									
									if (totalCount === doneCount) {
										zip.generateAsync({
											type : 'blob'
										}) .then((content) => {
											saveAs(content, 'launchimages.zip');
										});
									}
								};
							});
						});
					}
				})]
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
