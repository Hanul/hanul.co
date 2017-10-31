HanulCo.ReverseLines = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

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
					c : 'Reverse Lines'
				}), P({
					c : '여러 문자열의 순서를 역순으로 변환하는 툴입니다.'
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
				}), UUI.FULL_SUBMIT({
					style : {
						marginTop : 8,
						borderRadius : 4
					},
					value : '역순으로 변환하기',
					on : {
						tap : () => {
							
							let newValue = '';
							
							REVERSE_EACH(textarea.getValue().split('\n'), (line, i) => {
								newValue += line;
								if (i > 0) {
									newValue += '\n';
								}
							});
							
							textarea.setValue(newValue);
						}
					}
				})]
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
