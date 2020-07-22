HanulCo.GenerateMongoId = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let generateMongoIdRoom = HanulCo.ROOM('generateMongoIdRoom');

		let textarea;
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
					c : 'Generate Mongo ID'
				}), P({
					c : 'MongoDB ID를 생성하는 툴입니다.'
				})]
			}), DIV({
				style : {
					marginTop : 15
				},
				c : [textarea = TEXTAREA({
					style : {
						width : '100%',
						height : 300
					}
				})]
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
		
		generateMongoIdRoom.send('getIds', textarea.setValue);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
