HanulCo.ReverseLines = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {

		let textarea;
		let wrapper = DIV({
			c : [textarea = TEXTAREA({
				style : {
					width : '100%',
					height : 300
				}
			}), A({
				c : 'GO!',
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
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
