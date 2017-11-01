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
						
						let str = '';
						let line = 0;
						
						let array = [];
						
						EACH(content.split('\n'), (line, i) => {
							
							let split = line.split(',');
							
							if (i === 0) {
								str += '일자\t이름\t국가\t종류\t액수 (원)';
								line += 1;
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
							
							str += '\n';
							str += (split[1] + split[2] + ' ' + split[3]).replace(/"/g, '') + '\t';
							str += split[7] + '\t';
							str += split[12] + '\t';
							str += split[5] + '\t';
							str += (isNaN(split[19]) === true ? split[20] : split[19]);
							
							total += REAL(isNaN(split[19]) === true ? split[20] : split[19]);
							
							line += 1;
						});
						
						result.setValue(str);
						
						result.addStyle({
							height : (line + 1) * 24
						});
					});
				}
			}), result = UUI.FULL_TEXTAREA({
				style : {
					marginTop : 15
				}
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
