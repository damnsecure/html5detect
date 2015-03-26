/*
	Detect if onmessage is used if so notify background.js
	Credit to chromesniffer for giving me insight in how this works
*/
(function () {
	window.postMessage = function(message, destination){
		console.group("Sending post messsage to '%s'", destination)
		if(message.hasOwnProperty('timeStamp'))
			console.log(new Date(message.timeStamp));

		if(message.hasOwnProperty('data') && isJson(message.data))
			console.log(JSON.parse(message.data));
		else
			console.log(message.data);

		console.groupEnd();
		notify();
	}

	window.addEventListener('message', function(message){
		console.group("Received post message from '%s'", message.origin)
		if(message.hasOwnProperty('timeStamp'))
			console.log(new Date(message.timeStamp));

		if(message.hasOwnProperty('data') && isJson(message.data))
			console.log(JSON.parse(message.data));
		else
			console.log(message.data);
		console.groupEnd();

		notify();
	});

	function isJson()
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
