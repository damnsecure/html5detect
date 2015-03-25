var tabs = {};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request.msg == 'result')
	{
		tabs[sender.tab.id] = request.result;

		chrome.pageAction.setIcon({tabId: sender.tab.id, path: 'message.png'})
		chrome.pageAction.setTitle({tabId: sender.tab.id, title: "HTML5 onmessage"});

		chrome.pageAction.show(sender.tab.id);
		sendResponse({});
	}
	else if (request.msg == 'get')
	{
		var result = tabs[request.tab];
		sendResponse({result: result});
	}
});
