HanulCo.GooglePaymentsCSV = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

		let table;
		let wrapper = DIV({
			c : [UUI.FULL_UPLOAD_FORM({
				style : {
					border : '1px solid #999'
				},
				box : HanulCo
			}, {
				overSizeFile : (maxUploadFileMB) => {
					alert('파일 용량은 ' + maxUploadFileMB + 'mb를 넘을 수 없습니다.');
				},
				success : (fileData, form) => {
					
					table.empty();
					
					GET('__RF/HanulCo/' + fileData.id, (content) => {
						
						let array = [];
						
						EACH(content.split('\n'), (line, i) => {
							
							let split = line.split(',');
							
							if (i === 0) {
								table.append(TR({
									c : [TH({
										c : '일자'
									}), TH({
										c : '이름'
									}), TH({
										c : '국가'
									}), TH({
										c : '종류'
									}), TH({
										c : '액수 (원)'
									})]
								}));
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
							
							table.append(TR({
								c : [TD({
									c : (split[1] + split[2] + ' ' + split[3]).replace(/"/g, '')
								}), TD({
									c : split[7]
								}), TD({
									c : split[12]
								}), TD({
									c : split[5]
								}), TD({
									c : isNaN(split[19]) === true ? split[20] : split[19]
								})]
							}));
							
							total += REAL(isNaN(split[19]) === true ? split[20] : split[19]);
						});
						
						table.append(total);
					});
				}
			}), table = TABLE()]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
