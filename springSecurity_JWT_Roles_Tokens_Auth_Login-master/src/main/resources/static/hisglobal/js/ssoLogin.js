$(document).ready(function() {

    $("#varCaptcha").attr("maxlength", "6");
    $("#varCaptcha").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#loginBtn").click();
        }
    });

    $("#loginBtn").keypress(function(e) {
        if (e.which == 13) {
            if (validate()) {
                submitForm("login");
            }
            return false;
        }
    });
});

function validate() {
    $("#divElementErrorsId").html("");

    var userName = $("input[name='gstrUserName']").val();
    var password = $("input[name='gstrPassword']").val();
    var captcha = $("input[name='varCaptcha']").val();

    if (userName === "" || password === "") {
        $("#divElementErrorsId").html("User Name / Password is empty!");
        return false;
    }

    if (captcha === "") {
        $("#divElementErrorsId").html("Enter the Captcha Code");
        $("#varCaptcha").focus();
        return false;
    }

    if (!validateAlphaNumWithUnderscoreValue(userName)) {
        $("#divElementErrorsId").html("User Name should be Alphanumeric with Underscore only.");
        return false;
    }

    if (!validateAlphaNumValue(captcha)) {
        $("#divElementErrorsId").html("Captcha code can be numeric only");
        return false;
    }

    if (!securePassword()) {
        $("#divElementErrorsId").html("Faced Some Unknown Problem. Please try Again!");
        $("input[name='gstrUserName']").val("");
        $("input[name='gstrPassword']").val("");
        return false;
    }

    return true;
}

function securePassword() {
    var userName = $("input[name='gstrUserName']").val();
    var password = $("input[name='gstrPassword']").val();
    var loginSessionSalt = $("#loginSessionSalt").val();

    var hashValue = "";

    var objPassHash = new jsSHA(password + userName, "ASCII");
    try {
        hashValue = objPassHash.getHash("SHA-1", "HEX");
    } catch (e) {
        return false;
    }

    objPassHash = new jsSHA(hashValue + loginSessionSalt, "ASCII");

    try {
        hashValue = objPassHash.getHash("SHA-1", "HEX");
    } catch (e) {
        messagePopup(e);
        return false;
    }

    $("input[name='gstrPassword']").val(hashValue);
    return true;
}

function submitFormOnValidate(flg, actionURL) {
    if (flg) {
        submitForm(actionURL);
    }
}

function submitForm(actionURL) {
    $("#loginForm").attr("action", actionURL);
    $("#loginForm").submit();
}

function validateAlphaNumValue(val) {
    var pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(val);
}

function validateAlphaNumWithUnderscoreValue(val) {
    var pattern = /^[a-zA-Z0-9_]*$/;
    return pattern.test(val);
}

function validateAlphaNumWithUnderscoreOnly(obj, e) {
    var charCode;
    if (typeof e.charCode != "undefined")
        charCode = e.charCode;
    else
        charCode = e.keyCode;
    if (charCode == 0 || charCode == 95 || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57))
        return true;
    else
        return false;
}
