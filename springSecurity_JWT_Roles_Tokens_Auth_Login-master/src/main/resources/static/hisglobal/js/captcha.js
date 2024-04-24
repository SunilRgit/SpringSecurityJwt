jQuery(document)
	.ready(
		function() {
			captchaReset();
		});

function captchaReset() {
	var data = {};
	var dateTime = new Date().getTime();
	data.t = dateTime;
	data.responseValidateToken = hex_md5("captcha");
	ajaxGlobalFunction("GET", "/captcha/getCaptcha", data,
		"getCaptchaResponse", "");
}

var getCaptchaResponse = function(res) {

	document.getElementById("captchaImg").src = "data:image/png;base64," + res;

};

function refreshTxtBox() {
	document.getElementById("varCaptcha").value = "";
}
