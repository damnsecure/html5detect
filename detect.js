/*
	Detect if onmessage is used if so notify background.js
	Credit to chromesniffer for giving me insight in how this works
*/
(function () {
	originalPostMessageFunction = window.postMessage;
	window.postMessage = function(message, destination){
		console.groupCollapsed("Sending post messsage to '%s'", destination)

		if(message && isJson(message))
			console.log(JSON.parse(message));
		else
			console.log(message);
		console.groupEnd();

		originalPostMessageFunction(message, destination);

		notify();
	}

	window.addEventListener('message', function(message){
		console.groupCollapsed("Received post message from '%s'", message.origin)
		if(message.timeStamp)
			console.log(new Date(message.timeStamp));

		if(isJson(message.data))
			console.log(JSON.parse(message.data));
		else
			console.log(message.data);
		console.groupEnd();

		notify();
	});

	function isJson(str)
	{
		try
		{
			JSON.parse(str);
			return true;
		}
		catch(e)
		{
			return false;
		}
	}

	function notify()
	{
		var jsonString = JSON.stringify({"html5onmessage_detected": true});
		var meta = document.getElementById('html5detect_meta');
		meta.content = jsonString;

		var done = document.createEvent('Event');
		done.initEvent('ready', true, true);
		meta.dispatchEvent(done);
	}
})();
