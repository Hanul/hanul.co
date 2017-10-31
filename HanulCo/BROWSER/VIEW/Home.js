HanulCo.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

		let wrapper = DIV({
			c : ['hanul.co', UL({
				c : [LI({
					c : A({
						c : 'Reverse Lines',
						on : {
							tap : () => {
								HanulCo.GO('reverselines');
							}
						}
					})
				}), LI({
					c : A({
						c : 'Google Payments CSV Tool',
						on : {
							tap : () => {
								HanulCo.GO('googlepaymentscsv');
							}
						}
					})
				})]
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
