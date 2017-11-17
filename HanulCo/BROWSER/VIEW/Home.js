HanulCo.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let itemStyle = {
			display : 'block',
			padding : '20px 25px',
			fontWeight : 'bold',
			borderRadius : 8
		};

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
					c : 'hanul.co'
				}), P({
					c : 'Hanul\'s Components'
				})]
			}), UL({
				style : {
					marginTop : 15
				},
				c : [LI({
					style : {
						flt : 'left',
						marginRight : 10
					},
					c : A({
						style : COMBINE([itemStyle, {
							backgroundColor : '#0269E2'
						}]),
						c : 'Icon Launch',
						on : {
							tap : () => {
								HanulCo.GO('iconlaunch');
							}
						}
					})
				}), LI({
					style : {
						flt : 'left',
						marginRight : 10
					},
					c : A({
						style : COMBINE([itemStyle, {
							backgroundColor : '#DE0000'
						}]),
						c : 'Reverse Lines',
						on : {
							tap : () => {
								HanulCo.GO('reverselines');
							}
						}
					})
				}), LI({
					style : {
						flt : 'left',
						marginRight : 10
					},
					c : A({
						style : COMBINE([itemStyle, {
							backgroundColor : '#99CC00'
						}]),
						c : 'Google Payments CSV Tool',
						on : {
							tap : () => {
								HanulCo.GO('googlepaymentscsv');
							}
						}
					})
				}), CLEAR_BOTH()]
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
