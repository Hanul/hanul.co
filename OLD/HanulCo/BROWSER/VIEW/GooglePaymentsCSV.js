HanulCo.GooglePaymentsCSV = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

		let result;
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
					c : 'Google Payments CSV Tool'
				}), P({
					c : '정산 작업을 위해 Google Payments 에서 제공하는 CSV를 분석하는 툴입니다.'
				})]
			}), UUI.FULL_UPLOAD_FORM({
				style : {
					marginTop : 15,
					border : '1px solid #999'
				},
				box : HanulCo
			}, {
				overSizeFile : (maxUploadFileMB) => {
					alert('파일 용량은 ' + maxUploadFileMB + 'mb를 넘을 수 없습니다.');
				},
				success : (fileData, form) => {
					
					GET('__RF/HanulCo/' + fileData.id, (content) => {
						
						let strs = {};
						
						let line = 0;
						
						let array = [];
						
						EACH(content.split('\n'), (line, i) => {
							
							let split = line.split(',');
							
							if (i === 0) {
								// ignore.
							}
							
							else if (isNaN(split[0]) === true) {
								array.push(split);
							}
						});
						
						array.sort((a, b) => {
							return a[7].localeCompare(b[7]);
						});
						
						let total = 0;
						
						EACH(array, (split, i) => {
							
							let name = split[7];
							let appName = name.substring(name.indexOf('(') + 1);
							appName = appName.substring(0, appName.indexOf(')'));
							if (appName === '') {
								appName = name;
							}
							
							let str = strs[appName];
							if (str === undefined) {
								str = appName + '\n일자\t이름\t국가\t종류\t액수 (원)';
								line += 3;
							}
							
							str += '\n';
							str += (split[1] + split[2] + ' ' + split[3]).replace(/"/g, '') + '\t';
							str += name + '\t';
							str += split[12] + '\t';
							str += split[5] + '\t';
							str += (isNaN(split[19]) === true ? split[20] : split[19]);
							
							total += REAL(isNaN(split[19]) === true ? split[20] : split[19]);
							
							line += 1;
							
							strs[appName] = str;
						});
						
						let totalStr = '';
						EACH(strs, (str) => {
							if (totalStr !== '') {
								totalStr += '\n\n';
							}
							totalStr += str;
						});
						result.setValue(totalStr);
						
						result.addStyle({
							height : (line + 4) * 24
						});
					});
				}
			}), result = UUI.FULL_TEXTAREA({
				style : {
					marginTop : 15
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
