function initMultilingual(strToLang) 
{
	
	pramukhIME.addLanguage(PramukhIndic);
    pramukhIME.enable();
        
    FromLanguage = "english";
    if(typeof strToLang==undefined || strToLang==null || strToLang=="")
    	ToLanguageOther = "marathi";
    else
    	ToLanguageOther= strToLang;
	
    FromLanguageFull = "pramukhindic:"+FromLanguage;
	ToLanguageOtherFull = "pramukhindic:"+ToLanguageOther;
	//alert(ToLanguageOtherFull);
}

function templateMultilingualConversion(fromField, toFieldHindi)
{
	//alert("In multilingualConversion");
	InputString = fromField.value;
	//InputString=InputString.toLowerCase();
	//alert("InputString  "+InputString);
	changeLanguage(ToLanguageOtherFull);
	ToLanguage = ToLanguageOther;
	//alert("InputString"+InputString);
	
	convertedTextOther = pramukhIME.convert(InputString, FromLanguage, ToLanguage);
	//alert("convertedTextOther"+convertedTextOther);
	toFieldHindi.value = convertedTextOther;
	changeLanguage(FromLanguageFull);
}
/*
function templateMultilingualConversion(fromField, toFieldHindi)
{
	alert("In multilingualConversion");
	InputString = fromField.value;
	changeLanguage(ToLanguageOtherFull);
	ToLanguage = ToLanguageOther;
	alert("InputString"+InputString);
	if((InputString!=null) && (ToLanguage!=null) && (FromLanguage!=null))
	{
		convertedTextOther = pramukhIME.convert(InputString, FromLanguage, ToLanguage);
		alert("convertedTextOther"+convertedTextOther);
		toFieldHindi.value = convertedTextOther;
		changeLanguage(FromLanguageFull);
	}
}
*/
MultilingualSuport = function()
{};
MultilingualSuport.evttemplateMultilingualConversion = function(evnt) 
{
	try
	{
		//alert("In multilingualConversion");
		fromField=document.getElementById("displayValueId");
		toFieldHindi=document.getElementById("displayValue");
		InputString = fromField.value;
		changeLanguage(ToLanguageOtherFull);
		ToLanguage = ToLanguageOther;	
		//if((InputString!=null) && (ToLanguage!=null) && (FromLanguage!=null))
		convertedTextOther = pramukhIME.convert(InputString, FromLanguage, ToLanguage);
		toFieldHindi.value = convertedTextOther;
		changeLanguage(FromLanguageFull);
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
	
};

MultilingualSuport.changeLanguage = function(evnt) 
{
	try
	{
		var e = document.getElementById("language");
		var selectedLang = e.options[e.selectedIndex].value;
		initMultilingual(selectedLang);
		if(selectedLang != "English")
			document.getElementById("displayValueId").style.display = 'block';
		else
			document.getElementById("displayValueId").style.display = 'none';
		MultilingualSuport.evttemplateMultilingualConversion();
	}
	catch(e)
	{
		alert("Error Message -> "+e.message);
	}
	
};

function multilingualConversion(fromField, toFieldHindi)
{	
	console.log("toFieldHindi"+toFieldHindi);
	InputString = fromField.val().toLowerCase();
	console.log("ToLanguageOtherFull"+ToLanguageOtherFull);	
	changeLanguage(ToLanguageOtherFull);
	ToLanguage = ToLanguageOther;
	console.log("InputString"+InputString);	
	console.log("FromLanguage"+FromLanguage);	
	console.log("ToLanguage"+ToLanguage);		
	convertedTextOther = pramukhIME.convert(InputString, FromLanguage, ToLanguage);
	console.log("convertedTextOther"+convertedTextOther);
	console.log("FromLanguageFull"+FromLanguageFull);
	toFieldHindi.val(convertedTextOther);
	changeLanguage(FromLanguageFull);
}

function callOnBlur()
{
	changeLanguage(FromLanguageFull);
}

function callOnClick()
{
	changeLanguage(ToLanguageOtherFull);
}
