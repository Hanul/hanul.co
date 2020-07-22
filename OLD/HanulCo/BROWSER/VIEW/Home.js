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
				}), LI({
					style : {
						flt : 'left',
						marginRight : 10
					},
					c : A({
						style : COMBINE([itemStyle, {
							backgroundColor : '#993333'
						}]),
						c : 'Get IP',
						on : {
							tap : () => {
								HanulCo.GO('ip');
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
							backgroundColor : '#13aa52'
						}]),
						c : 'Generate Mongo ID',
						on : {
							tap : () => {
								HanulCo.GO('generatemongoid');
							}
						}
					})
				}), CLEAR_BOTH()]
			}), A({
				href : 'https://github.com/Hanul/hanul.co',
				target : '_blank',
				c : IMG({
					style : {
						position : 'absolute',
						right : 0,
						top : 0
					},
					src : 'https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67'
				})
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
