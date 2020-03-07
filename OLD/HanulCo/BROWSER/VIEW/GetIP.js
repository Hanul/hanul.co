HanulCo.GetIP = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let getIPRoom = HanulCo.ROOM('getIPRoom');

		let content;
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
					c : 'Get IP'
				}), P({
					c : '로컬 IP와 실제 IP를 확인하는 툴입니다.'
				})]
			}), content = DIV({
				style : {
					marginTop : 15
				}
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
		
		window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		let pc = new RTCPeerConnection({iceServers:[]});
		let noop = () => {};
		
		pc.createDataChannel('');
		pc.createOffer(pc.setLocalDescription.bind(pc), noop);
		pc.onicecandidate = (ice) => {
			if (!ice || !ice.candidate || !ice.candidate.candidate) {
				return;
			}
			
			content.append(P({
				c : '로컬 IP: ' + /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
			}));
			
			pc.onicecandidate = noop;
		};
		
		getIPRoom.send('getIP', (ip) => {
			content.append(P({
				c : '실제 IP: ' + ip
			}));
		});

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
