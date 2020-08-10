HanulCo.TranslateRoom = OBJECT({
	
	init : () => {
		
		const PapagoTranslator = require('papago').default;
		
		let translator = new PapagoTranslator('Z_VJBPwqcnr56udvgwER', 'YxXpNbTkmg');
		
		HanulCo.ROOM('translateRoom', (clientInfo, on, off) => {
			
			on('translate', (params, ret) => {
				
				let defaultLang = params.defaultLang;
				let data = params.data;
				
				let result = {};
				
				PARALLEL(data, [
				(texts, done, key) => {
					
					let defaultText = texts[defaultLang];
					
					PARALLEL(texts, [
					(text, done, lang) => {
						
						if (lang === 'zh') {
							lang = 'zh-TW';
						}
						
						if (text !== defaultText) {
							
							translator.translate(text, defaultLang, lang).then((res) => {
								
								result[lang] = res.text;
								done();
								
							}).catch((error) => {
								
								SHOW_ERROR('오류 발생', typeof error === 'string' ? error : JSON.stringify(error), {
									text : text,
									lang : lang
								});
								
								done();
							});
						}
						
						else {
							done();
						}
					},
					
					done]);
				},
				
				() => {
					
					console.log(result);
				}]);
			});
		});
	}
});
