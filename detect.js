/*
	Detect if onmessage is used if so notify background.html
	Credit to chromesniffer for giving me insight in how this works
*/
(function () {
	var postMessageORIG = window.postMessage;
	window.postMessage = function(message, destination){
		console.group("Sending post messsage to '%s'", destination)
		console.log(new Date(message.timeStamp));
		console.log(JSON.parse(message.date));
		console.groupEnd();

		postMessageORIG(message, destination);
		notify();
	}

	window.onmessage = function(message){
		console.group("Received post message from '%s'", message.origin)
		console.log(new Date(message.timeStamp));
		console.log(JSON.parse(message.data));
		console.groupEnd();

		notify();
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
