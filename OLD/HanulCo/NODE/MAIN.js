HanulCo.MAIN = METHOD({

	run : () => {
		
		var translate = require('translation-google');

translate('This is Google Translate', {from: 'en', to: 'ko'}).then(res => {
    console.log(res.text);
    //=> 这是Google翻译
    console.log(res.to.language.iso);
    //=> en
}).catch(err => {
    console.error(err);
});
	}
});