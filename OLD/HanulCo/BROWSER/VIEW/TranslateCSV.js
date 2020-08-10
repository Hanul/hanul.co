HanulCo.TranslateCSV = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let translateRoom = HanulCo.ROOM('translateRoom');

		let langInput;
		let loading;
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
					c : 'Translate CSV Tool'
				}), P({
					c : 'CSV파일을 번역하는 툴입니다.'
				})]
			}), H2({
				style : {
					marginTop : 10,
					fontSize : 20
				},
				c : '기본 언어'
			}), langInput = INPUT({
				style : {
					marginTop : 10,
					border : '1px solid #999'
				},
				value : INFO.getLang()
			}), H2({
				style : {
					marginTop : 10,
					fontSize : 20
				},
				c : 'CSV 파일 업로드'
			}), loading = P({
				style : {
					marginTop : 10
				}
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
				success : (fileData, form) => {
					
					GET('__RF/HanulCo/' + fileData.id, (content) => {
						
						let data = {};
						
						let langs;
						EACH(__PAPA.parse(content).data, (texts, i) => {
							
							// 첫번째 줄은 언어 설정
							if (i === 0) {
								langs = texts;
							}
							
							else {
								let subData = {};
								EACH(texts, (text, j) => {
									if (j > 0 && text !== '') {
										subData[langs[j]] = text.replace(/\\n/, '\n');
									}
								});
								data[texts[0]] = subData;
							}
						});
						
						loading.append('번역중입니다...');
						
						translateRoom.send({
							methodName : 'translate',
							data : {
								defaultLang : langInput.getValue(),
								data : data
							}
						}, (result) => {
							console.log(result);
						});
					});
				}
			}), DIV({
				style : {
					marginTop : 20
				},
				c : A({
					style : {
						color : '#3399FF',
						textDecoration : 'underline'
					},
					c : 'hanul.co로 돌아가기',
					on : {
						tap : () => {
							HanulCo.GO('');
						}
					}
				})
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
