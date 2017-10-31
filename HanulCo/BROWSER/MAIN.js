HanulCo.MAIN = METHOD({

	run : (params) => {

		HanulCo.MATCH_VIEW({
			uri : '',
			target : HanulCo.Home
		});

		HanulCo.MATCH_VIEW({
			uri : 'reverselines',
			target : HanulCo.ReverseLines
		});

		HanulCo.MATCH_VIEW({
			uri : 'googlepaymentscsv',
			target : HanulCo.GooglePaymentsCSV
		});
	}
});
