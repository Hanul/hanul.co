HanulCo.IconSplash = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

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
					c : 'Icon Splash'
				}), P({
					c : '이미지 하나로 앱 아이콘과 스플래시 화면을 생성해주는 툴입니다. (iOS, Android)'
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
					c : '스플래시 이미지 생성'
				}), P({
					c : '최대한 큰 스플래시 이미지를 선택해주세요.'
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
						
					}
				})]
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
