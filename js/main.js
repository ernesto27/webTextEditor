webEditor = {
	wrapEditors: $("#wraps-editors"),
	codeHtml: $("#code-html"),
	codeCss: $("#code-css"),
	codeJS: $("#code-js"),
	buttonRun: $("#run-js"),
	iframe: $("#code-result").contents(),

	init: function(){
		webEditor.iframe.contents().find("head").append("<style></style>")
		webEditor.wrapEditors.on("paste keyup", webEditor.showResults)
		webEditor.buttonRun.on("click", webEditor.runJS);
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

	createScriptIframe: function(iframe, src, tag){	
		var script = document.createElement("script");
		if(!src){
			script.text = webEditor.getJS();
		}else{
			script.src = src;
		}
		
		if(tag){
			iframe.find("body")[0].appendChild(script);
		}else{
			iframe.find("head")[0].appendChild(script);
		}
	},

	runJS: function(){
		webEditor.iframe.find("script").remove()
		webEditor.createScriptIframe(webEditor.iframe, null, "body")
	},

	showResults: function(e){
		setTimeout(function(){
			iframe = webEditor.iframe;
	
			if(e.target.id === "code-html"){
				iframe.find("body").html(webEditor.getHtml());
			}else if(e.target.id === "code-css"){
				iframe.find("style").html(webEditor.getCss());
			}		
			
		},500) 
	}
}

webEditor.jsLibraries = {
	jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
	backbone: "http://backbonejs.org/backbone-min.js",
	underscore: "http://underscorejs.org/underscore-min.js",
	angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js",
	ember: "http://builds.emberjs.com/tags/v1.0.0/ember.min.js"
}

webEditor.cssLibraries = {
	bootstrap3: "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css",
	normalize: "http://cdnjs.cloudflare.com/ajax/libs/normalize/2.1.0/normalize.css"
}


webEditor.configure = {
	selectJs: $("#js-libraries"),
	selectCss: $("#css-libraries"),

	init: function(){
		webEditor.configure.addJsLibrary()
		webEditor.configure.addCssLibrary()
	},	

	addJsLibrary: function(){
		function removeScripts(libName){
			scripts = webEditor.iframe.find("head").children("script")
			scripts.each(function(){
				var that = $(this)
				if(that.attr("src")){
					that.remove();
				}
			});
		}
		
		webEditor.configure.selectJs.on("change", function(e){
			value = $(this).children(":selected").val();
		
			switch(value){
				case "native":
					removeScripts();
					break;	
				case "jquery":
					removeScripts()
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.jquery);
					break;
				case "backbone":
					removeScripts()
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.jquery);
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.underscore);
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.backbone);	
					break;
				case "angular":
					removeScripts()
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.angular);			
					break;
				case "ember":
					removeScripts();
					webEditor.createScriptIframe(webEditor.iframe, webEditor.jsLibraries.ember);			
					break;		
			}
		});
	},


	addCssLibrary: function(){

		function createLinkCss(href){
			webEditor.iframe.find("head")
				.prepend("<link rel='stylesheet' href='"+href+"'>")
		}

		function removeLinkCss(){
			scripts = webEditor.iframe.find("head").children("link")
			scripts.each(function(){
				var that = $(this)
				that.remove()
			});
		}

		webEditor.configure.selectCss.on("change", function(e){
			value = $(this).children(":selected").val();
			console.log(value)
			
			switch(value){
				case "nolib":
					removeLinkCss();
					break;
				case "bootstrap":
					removeLinkCss();
					createLinkCss(webEditor.cssLibraries.bootstrap3)
					break;
				case "resize":
					removeLinkCss();
					createLinkCss(webEditor.cssLibraries.normalize)
					break;
			}
		});
	}
}


webEditor.init()
webEditor.configure.init()