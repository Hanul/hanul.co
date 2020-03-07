HanulCo.MAIN = METHOD({

	run : (params) => {
		
		ADD_FONT({
			name : 'Noto Sans KR',
			style : 'normal',
			weight : 400,
			woff2 : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2',
			woff : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff',
			opentype : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf'
		});

		HanulCo.MATCH_VIEW({
			uri : '',
			target : HanulCo.Home
		});

		HanulCo.MATCH_VIEW({
			uri : 'iconlaunch',
			target : HanulCo.IconLaunch
		});

		HanulCo.MATCH_VIEW({
			uri : 'reverselines',
			target : HanulCo.ReverseLines
		});

		HanulCo.MATCH_VIEW({
			uri : 'googlepaymentscsv',
			target : HanulCo.GooglePaymentsCSV
		});

		HanulCo.MATCH_VIEW({
			uri : 'ip',
			target : HanulCo.GetIP
		});
	}
});
