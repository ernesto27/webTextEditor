webEditor = {
	wrapEditors: $("#wraps-editors"),
	codeHtml: $("#code-html"),
	codeCss: $("#code-css"),
	codeJS: $("#code-js"),
	iframe: $("#code-result").contents(),

	init: function(){
		webEditor.iframe.contents().find("head").append("<style></style>")
		webEditor.wrapEditors.on("paste keyup", webEditor.showResults)
	},

	getCss: function(){
		return webEditor.codeCss.val()
	},

	getHtml: function(){
		return webEditor.codeHtml.val();
	},

	getJS: function(){
		return webEditor.codeJS.val();
	},

	createScriptIframe: function(iframe){	
		iframe.find("script").remove()
		var script = document.createElement("script")
		script.text = webEditor.getJS()
		iframe.find("head")[0].appendChild(script)
	},


	showResults: function(){
		setTimeout(function(){
			iframe = webEditor.iframe;
			iframe.find("body").html(webEditor.getHtml());
			iframe.find("style").html(webEditor.getCss());
			webEditor.createScriptIframe(iframe)
		},500) 
	}
}

webEditor.init()