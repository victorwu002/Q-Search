# 借用改自zZpiglet 

Skip to content

Sign up

zZPiglet

/

Task

Public

Code

Issues

6

Pull requests

Discussions

Actions

Projects

Security

Insights

Task/asset/DeepLQ-search.js

@zZPiglet

zZPiglet Encode space as "%20" when using key "dlc" / "dle" / "dlj" / "dles".

 1 contributor

65 lines (55 sloc)  2.95 KB

/*

Encode spaces as "%20" when using key "dlc" / "dle" / "dlj" / "dles" in Q-Search.

Quantumult X:

# dlc xxx (DeepL 译至中)

^https:\/\/duckduckgo.com\/\?q=dlc(\+|%20)([^&]+).+ url script-echo-response https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dle xxx (DeepL 译至英)

^https:\/\/duckduckgo.com\/\?q=dle(\+|%20)([^&]+).+ url script-echo-response https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dlj xxx (DeepL 译至日)

^https:\/\/duckduckgo.com\/\?q=dlj(\+|%20)([^&]+).+ url script-echo-response https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dles xxx (DeepL 译至西)

^https:\/\/duckduckgo.com\/\?q=dles(\+|%20)([^&]+).+ url script-echo-response https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

Surge:

# dlc xxx (DeepL 译至中)

DeepLtoChinese = type=http-request,pattern=^https:\/\/duckduckgo.com\/\?q=dlc(\+|%20)([^&]+).+,script-path=https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dle xxx (DeepL 译至英)

DeepLtoEnglish = type=http-request,pattern=^https:\/\/duckduckgo.com\/\?q=dle(\+|%20)([^&]+).+,script-path=https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dlj xxx (DeepL 译至日)

DeepLtoJapanese = type=http-request,pattern=^https:\/\/duckduckgo.com\/\?q=dlj(\+|%20)([^&]+).+,script-path=https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

# dles xxx (DeepL 译至西)

DeepLtoespanol = type=http-request,pattern=^https:\/\/duckduckgo.com\/\?q=dles(\+|%20)([^&]+).+,script-path=https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

Notice that the URL Rewirte methods have higher priority than using a script, so need modify the final URL Rewrite's(the rewrite with no key) regular expression.

 */

const deeplr = /^https:\/\/duckduckgo.com\/\?q=dl(c|e|j|es)(\+|%20)([^&]+).+/;

const oldurl = $request.url;

let newurl = "https://www.deepl.com/translator#auto/";

if (oldurl.indexOf("dlc") != -1) {

	newurl += "zh/" + deeplr.exec(oldurl)[3].replace(/\+/g, "%20");} else if (oldurl.indexOf("dle") != -1) {

	newurl += "en/" + deeplr.exec(oldurl)[3].replace(/\+/g, "%20");

} else if (oldurl.indexOf("dlj") != -1) {

	newurl += "ja/" + deeplr.exec(oldurl)[3].replace(/\+/g, "%20");

}

	newurl += "es/" + deeplr.exec(oldurl)[3].replace(/\+/g, "%20");

}

/*

// Need add MitM hostname = www.deepl.com when using this method, but choose your key flexibly.

// Quantumult X:

// ^https:\/\/www.deepl.com\/translator#(\S+?)\/(\S+?)\/([\s\S]*) url script-echo-response https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

// Surge:

// DeepLQ-Search = type=http-request,pattern=^https:\/\/www.deepl.com\/translator#(\S+?)\/(\S+?)\/([\s\S]*),script-path=https://raw.githubusercontent.com/victorwu002/Q-Search/main/DeepLQ-search.js

const deeplr = /^https:\/\/www.deepl.com\/translator#(\S+?)\/(\S+?)\/([\s\S]*)/;

const oldurl = $request.url;

let newurl =

	"https://www.deepl.com/translator#" +

	deeplr.exec(oldurl)[1] +

	"/" +

	deeplr.exec(oldurl)[2] +

	"/" +

    deeplr.exec(oldurl)[3].replace(/%2B/g, "%20");

 */

const isQuanX = typeof $notify != "undefined";

const newstatus = isQuanX ? "HTTP/1.1 302 Temporary Redirect" : 302;

const deepl = {

	status: newstatus,

	headers: {

		Location: newurl,

	},

};

let resp = isQuanX ? deepl : { response: deepl };

resp = typeof $response != "undefined" ? deepl : resp;

$done(resp);

Footer

© 2022 GitHub, Inc.

Footer navigation

Terms

Privacy

Security

Status

Docs

Contact GitHub

Pricing

API

Training

Blog

About
