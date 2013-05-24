//Detect if onmessage is used if so notify background.html
//Thanks to chromesniffer for providing a plugin that made me understand how this all works.
(function () {
	var postMessageORIG = window.postMessage;
	window.postMessage = function(message, destination){
		console.log("Sending: ", message, destination);
		postMessageORIG(message, destination);
		notify();
	}

	window.onmessage = function(message){
		console.log("Received: ", message);
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
