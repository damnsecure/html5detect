//Inject detection script and metadata tag.
(function(){
	var head = document.getElementsByTagName('head')[0];

	if (head)
	{
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = chrome.extension.getURL('detect.js');

		var meta = document.createElement('meta');
		meta.name = 'html5detect';
		meta.id = 'html5detect_meta';

		head.appendChild(meta);
		head.appendChild(script);
	}
	
	meta.addEventListener('ready', function(){
		if (meta) {
			var data = JSON.parse(meta.content)

			if (Object.keys(data).length > 0) {
				chrome.extension.sendRequest({msg: "result", result: data});
			}
		}
	});
})();
