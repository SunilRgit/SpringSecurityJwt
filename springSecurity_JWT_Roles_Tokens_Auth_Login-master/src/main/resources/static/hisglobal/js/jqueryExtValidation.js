(function(){
/**
 * Developer : Aadil
 * Date		 : Jan-2014 
 * USAGE	 : ExtendED Validator plugin for custom validations
 */

	/**
	 * minLength		: Validates minLength no of characters 
	 * USAGE				: minLength[ length ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   minLength: {
			validator: function(value,param){
				return value.length >= param[0];  
			},  
			message: 'Enter At Least {0} Characters.'
	   }  
	});
	
	/**
	 * maxLength		: Validates Maximum no of characters 
	 * USAGE				: maxLength[ length ]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   maxLength: {
			validator: function(value,param){
				return value.length <= param[0];  
			},
			message: 'Enter At Most {0} Characters.'            
	   }  
	});

	/**
	 * alpha		: Validates (allows) alphabets only (a-zA-Z) 
	 * USAGE		: alpha
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alpha: {
	      validator: function(value){
	        	var r = /^[A-Z]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets Only.'
	   }  
	});
	
	/**
	 * alphaWithSpace		: Validates (allows) alphabets with Space only (a-zA-Z ) 
	 * USAGE				: alphaWithSpace
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithSpace: {
	      validator: function(value){
	        	var r = /^[A-Z ]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets & Space Only.'
	   }  
	});
	
	/**
	 * alphaNumeric	: Validates (allows) alphanumeric only (a-zA-Z0-9) 
	 * USAGE		: alphaNumeric
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumeric: {
	      validator: function(value){
	        	var r = /^[a-zA-Z0-9]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphanumeric Only.'
	   }  
	});
	
	/**
	 * alphaNumeric	strictly	: Validates (allows) alphanumeric only (a-zA-Z0-9) 
	 * USAGE					: alphaNumericStrictly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumericStrictly: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[a-z0-9]+$/i;

            return value.match(r);
        	},  
	      message: 'Enter Alphanumeric Strict Only.'
	   }  
	});
      
	/**
	 * alphaSpecialChar	: Validates (allows) alphabet and special characters only
	 * USAGE			: alphaSpecialChar
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaSpecialChar: {
	      validator: function(value){
	        	var r = /^[0-9A-Z\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";'<>?\/]+$/i;
	         return value.match(r);
	      },  
	      message: 'Enter Alphabet with special characters Only.'
	   }  
	});
	
	/**
	 * alphaWithApos	: Validates Alphabets and Apostrophe [a-zA-Z' ]
	 * USAGE			: alphaWithApos
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithApos: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[A-Z' ]+$/i;
            return value.match(r);
        	},  
	      message: 'Alphabet With Apos Only'
	   }  
	});
	
	/**
	 * alphaNumericWithApos	: Validates Alphabets,Numbers and Apostrophe [a-zA-Z0-9' ]
	 * USAGE				: alphaNumericWithApos
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaNumericWithApos: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[A-Z0-9' ]+$/i;
            return value.match(r);
        	},  
	      message: 'Alphanumeric With Apos Only'
	   }  
	});
	
	/**
	 * alphaSpecial	: Validates Alphabets and Characters Passed as a String
	 * USAGE		: alphaSpecial[\"string\"]
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaSpecial: {
	      validator: function(value, param){
	      	value = $.trim(value);
	        	var t = "^[A-Z" + RegExp.quote(param[0]) + " ]+$";
	        	var z = new RegExp(t,'i');
	        	param[1] = param[0].replace(/(.)/g,', $1').substr(1);
            return value.match(z);
        	},  
	      message: 'Alphabets &amp; {1} only.'
	   }  
	});
		
	/**
	 * contactNo	: Validates contact nos 
	 * USAGE		: contactNo
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   contactNo: {
         validator: function(value){
        		var r = /^\+?[0-9]{7,16}$/;
            return value.match(r);
         },
        	message: 'Invalid Phone No.'
	   }  
	});
	
	/**
	 * mobile	: Validates Mobile nos [ (+919911223344) OR (9911223344) ]
	 * USAGE		: Mobile
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   mobile: {
	      validator: function(value){
	      	value = $.trim(value);
	        	//var r = /^(\+[1-9]{2})?[0-9]{10}$/;
                        var r = /^[0-9]+$/;
            return value.match(r);
        	},  
	      message: 'Enter Mobile No [(+919911223344) OR (9911223344) ].'
	   }  
	});
	
	 /**
	 * telephone	: Validates Telephone Nos 
	 * USAGE		: telephone
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   telephone: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[0-9\.\s\-+()\/]+$/i;
            return value.match(r);
        	},  
	      message: 'Invalid Telephone No.'
	   }  
	});

	/**
	 * uploadPdfOnly	: Validates pdf file only
	 * USAGE			: uploadPdfOnly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   uploadPdfOnly: {
		
	      validator: function(value){
		
		if(value.indexOf('pdf')=="-1")
	         return false;
		else
			return true;
	      },  
	     message: 'Enter pdf Only'
	   }  
	});
	
	/**
	 * uploadJpgOnly	: Validates/allows Jpg image only
	 * USAGE			: uploadJpgOnly
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   uploadJpgOnly: {
		
	      validator: function(value){
		
		if(value.indexOf('jpg')=="-1" && value.indexOf('jpeg')=="-1" && value.indexOf('JPG')=="-1" && value.indexOf('JPEG')=="-1")
	         return false;
		else
			return true;
	      },  
	     message: 'Enter jpg Only'
	   }  
	});
	
	/**
	 * selectCombo	: Validates/allows Combo value other than sent parameter "selectValue"
	 * USAGE		: selectCombo[selectValue]
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   selectCombo: {
			validator: function(value,param){
				return value != param[0];  
			},  
			message: 'Please Select This Option'
	   }  
	});
		
	/**
	 * exists		: Validates whether that value exist in comboBox 
	 * USAGE		: exists[param]
	 */
	$.extend($.fn.validatebox.defaults.rules,{
	    exists:{
	        validator:function(value,param){
	            var cc = $(param[0]);
	            var v = cc.combobox('getValue');
	            var rows = cc.combobox('getData');
	            for(var i=0; i<rows.length; i++){
	                if (rows[i].id == v){return true;}
	            }
	            return false;
	        },
	        message:'The Entered Value Does Not Exists.'
	    }
	});
	
	/**
	 * equals		: Compares value with some other field
	 * USAGE		: equals[\"#otherField\"] (Argument is ID of field to compare)
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   equals: {  
			validator: function(value,param){  
			   return value === $(param[0]).val();  
			},  
	      message: 'It is not equal'
	   }  
	});
	
	/**
	 * CheckZero	: Validates that fields do not have all zeroes
	 * USAGE		: CheckZero[\" arg \"] (arg can be int/float)
	 * INFO			: The messages are based on arg i.e. int or float
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   checkZero: {
	      validator: function(value,param){
	      	value = $.trim(value);
	      	if(param[0].toLowerCase() === 'float'){
	      		param[1] = check_startzero;
	      		return (parseFloat(value) !== 0);
	      	} else {	
	      		param[1] = check_zero;
	      		return (parseInt(value) !== 0);
	      	}
        	},  
	      message: '{1}'
	   }  
	});
	
	/**
	 * numeric		: Validates Numbers
	 * USAGE		: numeric
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   numericwithoutzero: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[1-9]+$/i;
            return value.match(r);
        	},  
	      message: 'Enter Number Only.0 Is Not Allowed'
	   }  
	});
	
	/**
	 * numeric		: Validates Numbers
	 * USAGE		: numeric
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   numeric: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^[0-9]+$/i;
            return value.match(r);
        	},  
	      message: 'Enter Number Only.'
	   }  
	});
		
	/**
	 * Decimal		: Validates Decimal Nos
	 * USAGE		: decimal[ len,len ] i.e (3,4 => 123.1234)
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   decimal: {
	      validator: function(value,param){
	      	value = $.trim(value);

	      	var numbersOnly = /^[0-9\.]+$/;

	      	if(numbersOnly.test(value)){
	      		var period = value.indexOf('.');

		      	//Check if more periods exist
		      	if(value.indexOf('.',period+1) > -1){
		      		param[2] = check_decimal;
		      		return false;
		      	}

		      	if(period > 0){
		      		beforePeriod = value.substr(0,period);
		      		afterPeriod = value.substr(period+1);
		      		if(beforePeriod.length > param[0]) {
		      			param[2] = check_charbeforeperiod + ':'+ param[0] ;
		      			return false;
		      		} else if(afterPeriod.length > param[1]) {
		      			param[2] = check_charafterperiod + ':'+ param[1] ;
		      			return false;
		      		} else {
		      			return true;
		      		}
		      	} else if( period === 0) {
		      		param[2] = check_decimalperiod;
		      		return false;
		      	} else if( period === -1 ){
		      		if(value.length > param[0]){
		      			param[2] = check_digitno +':'+ param[0] ;
		      			return false;
		      		} else {
		      			return true;
		      		}
		      	} else {
		      		return true;
		      	}
	      	} else {
	      		param[2] = check_decimal;
	      		return false;
	      	}
        	},  
	      message: 'Enter Values in {2} Format'
	   }  
	});
	
	/**
	 * dateType		: Validates dateType
	 * USAGE		: dateType
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		dateType: {
	      validator: function(value){
	      	value = $.trim(value);
	        	var r = /^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/;
            return value.match(r);
        	},  
	      message: 'Invalid date'
	   }  
	});
    
	/**
	 * enddate		: Validates enddate
	 * USAGE		: enddate
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   enddate: {
	      validator: function(value){
	      var startdatevalue = $('#strven_todate').val();
	        return Date.parse(startdatevalue) < Date.parse(value);
        	},  
	      message: 'Invalid End Date'
	   }  
	});
	
	/**
	 * name		: Validates (allows) alphabets with Space & Period(.) Only 
	 * USAGE	: name
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   name: {
	      validator: function(value){
	        	var r = /^[A-Z ]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets,Space & Period(.) Only.'
	   }  
	});
	
	
	/**
	 * alphaWithSpaceand comma		: Validates (allows) alphabets with Space only (a-zA-Z, )  and comma
	 * USAGE				: alphaWithSpace
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
	   alphaWithSpaceandComma: {
	      validator: function(value){
	        	var r = /^[a-zA-Z][ ,a-zA-Z]*[a-zA-Z]$/;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets With Commana And Space.'
	   }  
	});


	/**
	 * alphaWithUnderscore		: Validates (allows) alphabets with Uderscore only
	 * USAGE					: alphaWithUnderscore
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		alphaWithUnderscore: {
	      validator: function(value){
	        	var r = /^[A-Z_]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphanumeric With Underscore Only.'
	   }  
	});
	
	
	/**
	 * alphaNumWithUnderscore		: Validates (allows) alpha-Numeric with Uderscore only
	 * USAGE						: alphaWithUnderscore
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		alphaNumWithUnderscore: {
	      validator: function(value){
	        	var r = /^[A-Z0-9_]+$/i;
	            return value.match(r);
	        	},  
	      message: 'Enter Alphabets With Underscore Only.'
	   }  
	});

	
	/**
	 * equals		: Compares value with some other field for Equality
	 * USAGE		: equalTo[\"#otherField\",\"Field Name\",\"Other Field Name\"] (Argument 1 is ID of field to compare)
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		equalTo: {  
			validator: function(value,param){  
			   return value === $(param[0]).val();  
			},  
	      message: '{1} is not equal to {2}'
	   }  
	});
	
	/**
	 * equals		: Compares value with some other field for Not Equal
	 * USAGE		: notEqualTo[\"#otherField\",\"Field Name\",\"Other Field Name\"] (Argument 1 is ID of field to compare)
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		notEqualTo: {  
			validator: function(value,param){  
			   return value != $(param[0]).val();  
			},  
	      message: '{1} is equal to {2}'
	   }  
	});

	/**
	 * equals		: Compares value with some other field
	 * USAGE		: passwordStrength[strength]
	 * Precaution	: The string passed must be escaped.
	 */
	$.extend($.fn.validatebox.defaults.rules, {  
		passwordStrength: {  
			validator: function(value,param){
	        	var r = '[A-Za-z]';
	        	var isAlphaPresent = value.match(r);
				if(param[0]==1 && !isAlphaPresent)
				{
					param[1] = "Password must contain at least one Alphabet.";
					return false;
				}
	        	r = '[0-9]';///^[0-9]*$/i;
	        	var isNumPresent = value.match(r);
				if(param[0]==2 && (!isAlphaPresent || !isNumPresent))
				{
					param[1] = "Password must contain at least one Alphabet and one Number.";
					return false;
				}
	        	r = '[\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";\'<>?\/]'; // /^*[\,\.\;\s\&\-_!~`’@#$%^&*()+={}:";'<>?\/]*$/i;
	        	var isSpecialPresent = value.match(r);
				if(param[0]==3 && (!isAlphaPresent || !isNumPresent || !isSpecialPresent))
				{
					param[1] = "Password must contain at least one Alphabet, one Number and one Special Character.";
					return false;
				}
				return true;
			},  
	      message: '{1}'
	   }  
	});
	
	
}());