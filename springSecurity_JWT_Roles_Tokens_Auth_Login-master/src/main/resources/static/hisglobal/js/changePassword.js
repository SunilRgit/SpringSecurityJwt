$(document)
	.ready(
		function() {

			$("#gstrPassword").val("");
			$("#varConfirmPassword").val("");
			$("#gstrOldPassword").val("");
			$("#varCaptcha").val("");

			$('input[type="text"]').on('input', onTextInput);

			$("#clear").click(
				function() {

					$('#changePasswordForm').bootstrapValidator(
						'resetForm', false);

				});

		});


function validateFormFields() {
	var isValid = true;

	// Clear previous error messages
	$('.small-error-message').remove();

	// Validation for gstrOldPassword
	var gstrOldPassword = $('#gstrOldPassword').val();
	if (gstrOldPassword === '') {
		addErrorMessage('#gstrOldPassword', 'Please enter old password');
		isValid = false;
	}


	// Validation for gstrPassword
	var gstrPassword = $('#gstrPassword').val();
	if (gstrPassword === '') {
		addErrorMessage('#gstrPassword', 'Please enter password');
		isValid = false;
	} else if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(gstrPassword)) {
		addErrorMessage('#gstrPassword', 'Password must be minimum 8 characters and combination of uppercase, lowercase, letters and symbols');
		isValid = false;
	}

	// Validation for varConfirmPassword
	var varConfirmPassword = $('#varConfirmPassword').val();
	if (varConfirmPassword === '') {
		addErrorMessage('#varConfirmPassword', 'Please re-enter password');
		isValid = false;
	} else if (varConfirmPassword !== gstrPassword) {
		addErrorMessage('#varConfirmPassword', 'The password and its confirm are not the same');
		isValid = false;
	} else if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(varConfirmPassword)) {
		addErrorMessage('#varConfirmPassword', 'Password must be minimum 6 characters and combination of uppercase, lowercase, letters and symbols');
		isValid = false;
	}

	var varCaptcha = $('#varCaptcha').val();
	if (varCaptcha === '') {
		addErrorMessage('#varCaptcha', 'Please enter Captcha');
		isValid = false;
	}


	return isValid;
}

// Function to handle the Save button click
function onSaveButtonClick(e) {

	event.preventDefault();
	// Validate the form fields
	var isValid = validateFormFields();
	console.log("isvalid" + isValid);


	if (isValid) {

		//call check Data duplicacy and call controller..if response is success then proceed else show erro message that duplicate data exists
		var inData = {
			gstrOldPassword: $('#gstrOldPassword').val(),
			gstrPassword: $('#gstrPassword').val(),
			varCaptcha: $('#varCaptcha').val(),
		};
		ajaxFunction("POST", "saveChangePassword",
			inData, "saveChangePasswordResponse");


	}
	else
		return false;
}


var saveChangePasswordResponse = function(data) {


	if (data == "success") {
		// Show the confirmation dialog
		bootbox.confirm({
			title: "Registration Confirmation",
			message: "You are going to register a new Employee. Are you sure you want to save?",
			callback: function(result) {
				if (result) {
					// User clicked "OK," perform save action here
					// Add your save logic here
					showPreview();
					//$("#newRegistrationForm").submit();
				}
				// If user clicked "Cancel," no action is taken
			}
		});
	}


}