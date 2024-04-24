
/*
File Name 		: validation.js
*/

/*
List of functions in this file

 1>	function validateData(e,index)
 2> HISValidator(frmname)
	2.1>addValidation(itemname,descriptor,errstr)
	2.2>clearAllValidations()
	2.3>validate()		
 3> trim(value)
*/


/* <p>Developer : Deepak Tiwari
 * <p>
 * <p>Fuction shortcutKeysEventHandler handles eventListeners
 * <p>attached to Save,Clear & Cancel images in whole module.
 * @param event
 * <Note> :: Check For <div id="normalMsg"> tag in your JSP. Help wold not work in case of absence
 */
 
 	
 
var moduleCommonDIV="normalMsg";
 
var first_key_Down=false;

var _helpOpenFlag=false;

var imgArray;

var keyCodeArray;

var enableShortCutKey=true;

var masterHotKeyCode=18; // Key :: ALT 

var cntrlKey=false;

var exceptionKeysCombo=false; // ALT[17] + CTRL[18] + R[82]/S[83] In case of Billing

var _helpKeyCode=112; // Key :: F1

var regexForNumericOnlyValidation=/(^\d\d*$)/;
var regexForWordOnlyValidation=/(^\w\w*$)/;
var regexForAlphanumeric=/[^a-zA-Z0-9_]/ ;
var regexForAlphabetic=/[^a-zA-Z_ ]/ ;
var regExpForValidateNumeric= /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
var noalpha = /^[a-zA-Z]*$/;
var nonums = /^[0-9]*$/;

imgArray  = new Array();

// imgArray stores names of Images used for various events.
// There can be multiple images for a single event.
// Corresponding to single event there can be only single event key code.
// Event Images and Key code used for that event should be at same index within their repective arrays.
// keyCodeArray defined in sequence with imgArray :: Event wise key code defined
// Keys || Insert : 45 :: Delete : 46 :: End : 35

imgArray  = [
               ['btn-sv.png' ,'btn-sv.png','btn-ok.png' ],   //Arrayof Images Used for Save Event
               
               ['btn-clr.png' ],   //Array of Images Used for Clear Event 
               
               ['btn-ccl.png','back_tab.png'],  //Array of Images Used for Cancel Event
               
               ['plus.gif'],//Array of Images Used for plus Event
            ];


keyCodeArray = new Array("114","46","35","107"); 

var ie = document.all;

var nn6 = document.getElementById &&! document.all;

if(ie)
{
    document.attachEvent('onkeydown',firstKeyDown);    
    document.attachEvent('onkeyup',shortcutKeysEventHandler);
    document.attachEvent('oncontextmenu',blockRightClickHandler);  
}
else
{
    document.onkeydown=firstKeyDown;
    document.onkeyup=shortcutKeysEventHandler;
    //document.oncontextmenu=blockRightClickHandler;
    window.focus();
}

 function blockRightClickHandler(e) {
    e.preventDefault();
    alert("Right Click Disabled");
 } 

// Function <firstKeyDown> is where Hot Key is tracked and 
// any Module specific ShortCut Key Exceptions 
// could be defined.
function firstKeyDown(e)
{
		//f5 key
	if(e.keyCode == 116)
	{
		e.preventDefault();
	}
	else
	{
		if(e.keyCode==masterHotKeyCode)
		{
		    first_key_Down=true;
		    
		}  
		if(first_key_Down && cntrlKey==false)
		{
			if(e.keyCode==18)
			{
				cntrlKey=true;
			}
		}
		if(first_key_Down && cntrlKey)
		{
			if(e.keyCode==82 || e.keyCode==83)
			{
			   exceptionKeysCombo=true;
			}   
		}	
	}
}   
   
function shortcutKeysEventHandler(e)
{

	//f5 key
	if(e.keyCode == 116)
	{
		e.preventDefault();
		alert("F5 key is disabled, please do not press F5 key !!");
	}
	else
	{
		
	  /*  Code Added Start
       * Modified On : 10-Feb-2011
       * Modified By : Amit Kr
       * 
       *  
      */
	
	  if(document.getElementById("strSearchItemButtonDivId") != null)
	  {
	
	  	imgArray  = [
               ['btn-sv.png' ],   //Array of Images Used for Save Event
               
               ['btn-clr.png' ],   //Array of Images Used for Clear Event 
               
               ['btn-ccl.png'],  //Array of Images Used for Cancel Event
               
               ['plus.gif'],//Array of Images Used for plus Event
               
               ['ItemFinder.png'], // Array of Images used for search Event
                
               
               
            ];

		keyCodeArray = new Array("114","46","35","107","73"  ); 
	
	  }
	
	 /*  Code Added End
       * Modified On : 14-Sep-2010
       * Modified By : Amit Kr
       * 
       *  
      */


	 var retEval          =  false;
	 
	 var imgName          =  false;
	 
	 var bugReported      =  false;
	 
	 var listenerIndx     =  false;
	 
	 var imageVisible     =  true;
	 
	 var imgArrForKeyCode = new Array();
	 //alert(exceptionKeysCombo);
	 if(e.keyCode==masterHotKeyCode || exceptionKeysCombo)
	 {
	    first_key_Down  = false;
	    
	    exceptionKeysCombo = false;
	 }
	 else
	 {
	 	 if(first_key_Down == true && enableShortCutKey)
	 	 {
	 	 	for(var i=0;i<keyCodeArray.length;i++)
	 	 	{
	 	 		if(parseInt(e.keyCode)==parseInt(keyCodeArray[i]))
	 	 		{
	 	 			if(keyCodeArray.length==imgArray.length || keyCodeArray.length<imgArray.length)
	 	 			{
	 	 			   imgArrForKeyCode=imgArray[i];
	 	 			  
	 	 			   imgName=true;
	 	 			}
	 	 			else
	 	 			{
	 	 			   alert("BUG::Image sets not defined for every Key codes");
	 	 			   
	 	 			   imgName=false;
	 	 			   
	 	 			   bugReported=true;
	 	 			} 
	 	 		}
	 	 	}
	 	 }
	 }   
	 
	 if(imgName != false)
	 {
	    var obj = document.getElementsByTagName("img");
	    
	    for(var i = obj.length-1 ; (i >= 0) && (listenerIndx==false) ; i--)
	    {
	   	   var strArr = new Array();
	   	   
	   	   strArr     = obj[i].src.split("/");
	   	   
	       for(var x=0;x<imgArrForKeyCode.length;x++)
	       {
	          if(strArr[strArr.length-1]==imgArrForKeyCode[x])
	          {
	   	         listenerIndx = i;
	   	         
	   	         var selObj=obj[i];
	   	         
	   	         // While Loop::Checking whether the Button is visible on Screen or not.
	   	         while(selObj.parentNode.tagName!="FORM")
	   	         {
	   	             if(selObj.parentNode.tagName=="DIV")
	   	             {
	   	            	if(selObj.parentNode.style.display=="none")
	   	            	{
	   	            		imageVisible=false;
	   	            	}
	   	             }
	   	             selObj=selObj.parentNode;
	   	         }
	          } 
	       }  
	    }	   
	    if(listenerIndx != false)
	    {
	       if(typeof(obj[listenerIndx].attributes['onclick'])!="undefined")
	       {
	          var invokeFuncName=obj[listenerIndx].attributes['onclick'].value;
	          
	          if(invokeFuncName!="" && invokeFuncName.length>2 && invokeFuncName.indexOf('(')>-1 && invokeFuncName.indexOf(')')>-1)
	          {  
	             if(invokeFuncName.indexOf("return" ) > -1)
	             {
	                invokeFuncName=invokeFuncName.split("return ")[1];
	             }
	             if(_helpOpenFlag)
	             {
	             	document.getElementById(moduleCommonDIV).innerHTML="";
     	    	    
     	    	    _helpOpenFlag=false;
	             }
	             //alert("imageVisible->"+imageVisible);
	             if(imageVisible)
	             {
	               var retEval=eval(invokeFuncName);
	             }
	             else
	             {
	             	alert("Associated Image Not Visible.");
	             }  
	            
	             first_key_Down=false;
	          }
	          else
	          {
	             alert("No Event Handler Attached To :: onClick ::  Found.");
	          }    
	       }
	       else
	       {
	       	   alert("No Event Listener :: onClick ::  Found.");
	       }   
	    }
	    else
	    {
	    	//alert("Shortcut Associated Image Not Found.");
	    }  
     }  
     else
     {
         if(first_key_Down==true)
         {
     	    if(e.keyCode==_helpKeyCode)
     	    {
     	    	if(_helpOpenFlag==false)
     	    	{
     	    	    _helpOpenFlag=true;
     	    	   
     	    	    shortCutKeysHELP();
     	    	}
     	    	else
     	    	{
     	    	    document.getElementById(moduleCommonDIV).innerHTML="";
     	    	    
     	    	    _helpOpenFlag=false;
     	    	}   
     	    }
     	    else
     	    {
     	        if(bugReported==false && enableShortCutKey)
     	        {
     	        	// keycode  9 - Tab  ,  79 - o  and  67 - c  and 73 - i
     	        	if(parseInt(e.keyCode) != 9 && parseInt(e.keyCode) != 79 &&  parseInt(e.keyCode) != 67 && parseInt(e.keyCode) != 73 )
     	           	alert("Sorry, No ShortCut Event Attached.For Help Press ::  Alt+F1");
     	        }   
    	    }  
    	    first_key_Down=false;
         }   
     }
     }
}

//This Function opens ShortCut Key Help 

function shortCutKeysHELP() 
 {
   var qh=150;var qw=300;var dh=0;var dw=0;
   
   if(window.innerHeight)
   {
      dh=window.innerHeight;
      
      dw=window.innerWidth;
   }
   else 
   {
      dh=document.documentElement.clientHeight;
      
      dw=document.documentElement.clientWidth;
   }
   var tpos=parseInt((dh-qh)/2);
   
   var lpos=parseInt((dw-qw)/2);
   
   var buttonStr;
   
   var wt = '<div id="qmvi_loading_div" style="top:'+tpos+'px;left:'+lpos+'px;width:'+qw+'px;position:absolute;text-align:center;font-family:Arial;text-decoration:none;font-weight:normal;font-size:13px;color:#00224A;background-color:#ffffff;border-width:1px;border-color:#828EA2;border-style:solid;">';
       wt+= '<table width="100%" cellspacing="1px" cellpadding="1px" border="0">';
       wt+= '<tr class="HEADER"><td colspan="2">Short Cut Key Help Menu</td></tr>';
       wt+= '<tr><td class="multiLabel" width="50%">Short Cut Keys</td><td class="multiLabel" width="50%">Event</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + F3</td><td class="multiControl" width="50%">SAVE</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + Delete</td><td class="multiControl" width="50%">CLEAR</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + End</td><td class="multiControl" width="50%">CANCEL</td></tr>';
       wt+= '<tr><td class="multiControl" width="50%">ALT + F1</td><td class="multiControl" width="50%">HELP/Hide HELP</td></tr>';
       
      /*  Code Added Start
       * Modified On : 8-Feb-2011
       * Modified By : Amit Kr
       */
       
       if(document.getElementById("strSearchItemButtonDivId") != null){
       		
       		 wt+= '<tr><td class="multiControl" width="50%">ALT + I</td><td class="multiControl" width="50%">Search Items Popup</td></tr>';
       		 wt+= '<tr><td class="multiControl" width="50%">ALT + O</td><td class="multiControl" width="50%">Ok</td></tr>';
       		 wt+= '<tr><td class="multiControl" width="50%">ALT + C</td><td class="multiControl" width="50%">Cancel</td></tr>';
       		
       }
       
      /*  Code Added End
       * Modified On : 10-Feb-2011
       * Modified By : Amit Kr
       */
       
       
       
       
       
       
       if(enableShortCutKey)
       {
         buttonStr="Disable";
       } 
       else
       {
         buttonStr="Enable"; 
       }    
       wt+= '<tr><td class="multiControl" width="100%" colspan="2"><input type="button" name="shortCutHelpED_Button" value="'+buttonStr+' Short Cut Keys" onClick="enableDisableShortCutKeys();"/>';
       wt +=' <input type="button" value="Close" onClick="closeShortCutPopup();" > </td></tr>';
       wt+= '<tr class="FOOTER"><td colspan="2"></td></tr>';
       wt+= '</table>';
       wt+='</div>';
       
   document.getElementById(moduleCommonDIV).innerHTML="";
   
   document.getElementById(moduleCommonDIV).style.display="block";
   
   document.getElementById(moduleCommonDIV).innerHTML=wt;
 }


function closeShortCutPopup(){

	 document.getElementById(moduleCommonDIV).innerHTML="";
	 _helpOpenFlag=false;
}

// This Function Enables or Disables ShortCutKey Event Handler
 
function enableDisableShortCutKeys()
{
	if(enableShortCutKey)
	{
	    enableShortCutKey=false;
	  
	    //alert("Short Cut Keys Disabled");
	  
	    document.forms[0].shortCutHelpED_Button.value="Enable Short Cut Keys";
	  
	    document.getElementById(moduleCommonDIV).innerHTML="";
	  
	    _helpOpenFlag=false;
	}
	else
	{
	    enableShortCutKey=true;
	 
	    //alert("Short Cut Keys Enabled");
	   
	    document.forms[0].shortCutHelpED_Button.value="Disable Short Cut Keys";
	 
	    document.getElementById(moduleCommonDIV).innerHTML="";
	 
	    _helpOpenFlag=false;
	}    
}




/*
	This function validates the value within the defined value retrieved using the given index.
	It accepts the following parameter
	
	e --> event
	index --> searching within.
*/	
/////////by pankaj kumar//////]
function textAreaMaxLength(_these,_length){
	if(_these.value.length>=_length)
		return false;
	else
		return true;
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}

String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

function Trim(_these){
	_these.value=_these.value.trim();
}
function lTrim(_these){
	_these.value=_these.value.ltrim();
}
function rTrim(_these){
	_these.value=_these.value.rtrim();
}
//////////////////////////////

function validateData(e,index)
{
	var key,keychar,str;
		
	if (window.event)
		key = window.event.keyCode;
	else
	{
		if (e)
			key = e.which;
		else
		   return true;
	}
	
	//alert("key :: "+key );
	
	keychar = String.fromCharCode(key);
	
	//alert("key :: "+key +"   keychar ::  "+keychar);
	
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27)  )
		return true;
	else 
	{
		str = getValidateStr(index);
		if (((str).indexOf(keychar) > -1))
		   return true;
		else
		   return false;
	}

}//end of validateStr function




/*
	This function validates the value within the defined value with the specified special characters
	 retrieved using the given index and specialChars.
	 * 
	 * You cannot allow special characters for the index 1 -Email and 7 - Amount
	 * 
	It accepts the following parameter
	
	e --> event
	index --> searching within
	specialChars --> set of special characters
* 
*/	
function validateDataWithSpecialChars(e,index, specialChars)
{
	var key,keychar,str;
		
	if (window.event)
		key = window.event.keyCode;
	else
	{
		if (e)
			key = e.which;
		else
		   return true;
	}
	
	//alert("1. key :: "+key );
	
	keychar = String.fromCharCode(key);
	
//	alert("key :: "+key +"   keychar ::  "+keychar);
	
	// control keys
	if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27))
		return true;
	else 
	{
		str = getValidateStr(index)
		
		if(index != 1 && index != 7)
		str = str +""+specialChars;
		
		if (((str).indexOf(keychar) > -1))
		   return true;
		else
		   return false;
	}

}//end of validateDataWithSpecialChars function






//****************************************************************************************************
function HISValidator(frmname)
{
	this.validatorRetValue = true;
	this.formobj=document.forms[frmname];
  	this.addValidation = add_validation;
	this.clearAllValidations = clear_all_validations;
	this.validate = form_submit_handler;
}

function clear_all_validations()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		this.formobj.elements[itr].validationset = null;
	}
}

function form_submit_handler()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		if(this.formobj.elements[itr].validationset &&
	   !this.formobj.elements[itr].validationset.validate())
		{
			return false;
		}
	}
	
	if(!this.validatorRetValue) {
		alert(this.validatorError);
		return false;
	}
		
	return true;
}

function add_validation(itemname,descriptor,errstr)
{
	var i = 0;
	var type = "";
	var ctlLength = 0;
	
	if(!this.formobj)
	{
		alert("BUG: the form object is not set properly");
		return;
	}//if
	var itemobj = this.formobj[itemname];
		
  	if(!itemobj)
	{
		//alert("BUG: Couldnot get the input object named: "+itemname);
		if((descriptor == "req") || (descriptor == "dontselect")) {
			if(this.validatorRetValue) {
				this.validatorRetValue = false;
				if(!errstr || errstr.length ==0)
					this.validatorError = "Couldnot get the input object named: "+itemname;
				else
					this.validatorError = errstr;	
			}
		}
		
		return;
	}
  
	type = itemobj.type;
	/*
		If there is only one combo then length function does not return array length. 
		It return option length
	*/	
	if(type == "select-one" || type == "select-multiple")  {	//list or combo
		ctlLength = itemobj.length;
		if(ctlLength > 0) {
			if(isNaN(itemobj[0].length)) ctlLength = 0;
		}	
	}
	else {
		ctlLength = itemobj.length;
		if(isNaN(ctlLength)) ctlLength = 0;
	}
			
	if(ctlLength == 0) 
	{
		if(!itemobj.validationset)
		{
			itemobj.validationset = new ValidationSet(itemobj);
		}
		itemobj.validationset.add(descriptor,errstr);
	}
	else 
	{
		for(i=0;i<ctlLength;i++)
		{
			if(!itemobj[i].validationset)
			{
				itemobj[i].validationset = new ValidationSet(itemobj[i]);
			}
	
			itemobj[i].validationset.add(descriptor,errstr);
		}
	}
}

function ValidationDesc(inputitem,desc,error)
{
	this.desc=desc;
	this.error=error;
	this.itemobj = inputitem;
	this.validate=vdesc_validate;
}

function vdesc_validate()
{
	if(!V2validateData(this.desc,this.itemobj,this.error))
 	{
    	this.itemobj.focus();
		return false;
 	}
 	return true;
}

function ValidationSet(inputitem)
{
    this.vSet=new Array();
	this.add= add_validationdesc;
	this.validate= vset_validate;
	this.itemobj = inputitem;
}

function add_validationdesc(desc,error)
{
	this.vSet[this.vSet.length]= new ValidationDesc(this.itemobj,desc,error);
}

function vset_validate()
{
	for(var itr=0;itr<this.vSet.length;itr++)
	{
		if(!this.vSet[itr].validate())
		{
			return false;
		}
	}
	return true;
}

function V2validateData(strValidateStr,objValue,strError) 
{ 
	var epos = strValidateStr.search("="); 
    var  command  = ""; 
    var  cmdvalue = ""; 
	var retValues;
	
	
	
	
 /************************************** Added by Bala on 30-Nov-2009 Start ******************************/   	
    
    try{
	    	
	    	/*
	    	 var errDesc=new Array("","E-mail", "Telephone No.", "Address" , 
	    	 					   "Name" , "Numeric" , "Numeric With Space" , "Amount" ,
	    	 					   "Alpha-Numeric" , "Alpha-Numeric with Space" , "Characters Only" ,
	    	 					   "Characters with Space" , "Upper Characters Only" , 
	    	 					   "Upper Characters Only with Space" , "Lower Characters Only" , 
	    	 					   "Lower Characters Only with Space" , "Name with &" , "Batch No." , 
	    	 					   "Alpha Numeric with Some Special Characters");
	    	*/
	    	
	    	
	    	var eventVal = objValue.attributes['onkeypress'].value;
	    	var trimedEventVal = "";
	     		
	    	for(j = 0;j < eventVal.length;j++){
			if(eventVal.charAt(j) != " ") trimedEventVal += eventVal.charAt(j);
			}	
	     	
	    	var indexValSuff = trimedEventVal.split('validateData(event,')[1];
	     	var indexVal = indexValSuff.split(')')[0];
	     	
	    	str = getValidateStr(parseInt(indexVal))
	    	  	
	     	var contentValue = objValue.value
	      	
	    	for(var i = 0 ; i <contentValue .length; i++){
	    		    		
			if (((str).indexOf(contentValue.charAt(i)) <= -1)){
		  			
			//	alert("Field Contains Invalid Character '"+contentValue[i]+"' , must have "+errDesc[parseInt(indexVal)]);
				
				alert("Invalid Value !! \n Allowed Characters : "+str);
				
				return false;
				
			}
	    	}
		 
    }catch(err){    }  
		   
    /************************************** Added by Bala on 30-Nov-2009 End ******************************/   	
    	
	
    if(epos >= 0)
    {
		command  = trim(strValidateStr.substring(0,epos));
		cmdvalue = trim(strValidateStr.substr(epos+1)); 
    } 
    else 
    	command = strValidateStr;
    	
	switch(command)
	{
		case "req":
		{
			if(eval(objValue.value.length) == 0) 
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : Required Field";
				
				alert(strError);
				return false;
			}
			break;
		}//case required
		
			
		case "maxlen": 
		{
			if(eval(objValue.value.length) >  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : "+cmdvalue+" characters maximum ";
				
				alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               	return false;
			}
			break;
		}//case maxlen
		case "minlen":
		{
			if(eval(objValue.value.length) <  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : " + cmdvalue + " characters minimum  ";
				
				alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               	return false;
			}
			break;
		}//case minlen
		case "email":
		{
			if(!checkMail(objValue.value))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid Email address ";
				
				alert(strError); 
                return false;
			}
			break;
		}//case email
		case "amount":
		{
			if(!checkAmount(objValue.value,cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid amount ";
				
				alert(strError); 
                return false;
			}
			break;
		}
		case "numlt":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) >=  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan
		case "numltet":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) > eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case less than or equal to
		case "numgt":
		{
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) <=  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than "+ cmdvalue;
				
				alert(strError); 
               	return false;
			}
			break;
		}//case greaterthan
		case "numgtet":
		{
			
			if(isNaN(objValue.value))
			{
				alert(objValue.name+": Should be a number ");
				return false;
			}
			if(eval(objValue.value) <  eval(cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than or equal to "+ cmdvalue;
				
				alert(strError); 
               	return false;
			}
			break;
		}//case greater than or equal to
		case "date":
		{
			if(!isDate(objValue.value))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be in date format";
				
				alert(strError); 
				return false;
			}
			
			break;
		}//date format
		case "dtlt":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode != 0)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan (date)
		case "dtltet":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode == 2)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be less than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case lessthan or equalto (date)
		case "dtgt":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode != 2)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//case greaterthan (date)
		case "dtgtet":
		{
			retValues = compareDate(objValue.value,cmdvalue);
			if(!retValues.cancelKey)
			{
				alert(objValue.name+": Should be a date ");
				return false;
			}
			if(retValues.mode == 0)
			{
				if(!strError || strError.length ==0)
					strError = objValue.name + " : value should be greater than or equal to "+ cmdvalue;
				
				alert(strError); 
              	return false;                 
			}
			break;
		}//cas or equalto (date)
		case "dontselect":
		{
			if(objValue.selectedIndex == null)
			{
				alert("BUG: dontselect command for non-select Item");
				return false;
			}
			
						
			if((objValue.length == 0) || 
				(objValue.selectedIndex >= 0 && objValue.options[objValue.selectedIndex].value == eval(cmdvalue)))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Please Select one option ";
				
				alert(strError); 
              	return false;
			}
			
			break;
		}//case dontselect
		case "pathext":
		{
			if(!checkFileExt(objValue.value,cmdvalue))
			{
				if(!strError || strError.length ==0)
					strError = objValue.name+": Enter a valid file ext. ";
				
				alert(strError); 
                return false;
			}
			break;
		}//check file path extension
	}
	 
    return true; 
}

//****************************************************************************************************


/*
	This function is used to check the mail.
	It accepts value & returns true/false
*/	 
function checkMail(value)
{
	var eindex;
	var newStr = "";
	var retVal = false;
	
	if(value != "")
	{
		eindex = value.indexOf('@');
		if(eindex != -1)
		{
			newStr = value.substring(eindex+1);
			if(newStr.indexOf('@') == -1)
			{
				if(value.indexOf('.') != -1 && (value.indexOf('.') > (eindex+1)) )
					retVal = true;
			}
		}
	}
	else
		retVal = true;
		
	return retVal;
}//end checkMail()
	
/**
	This function validates the amount.
	It accepts value, cmdValue and returns true/false	
		cmdvalue --> either blank or format of amount. e.g. 6,2[means length = 6 and precision = 2
		4 for scale and 2 for precision] 
		
	Note >> value should be numeric. This function will not check the numeric
*/
function checkAmount(value,cmdvalue)
{
	var index,len;
	var tempArr;
	var scaleValue = 0;
	var precValue = 0;
	var retValue = true;
		
	len = value.length;
	index = value.indexOf(".");
	
	if (len > 0 && index > -1)	//amount is in decimal && length > 1
	{
		if (len == index+1)	//No digit after decimal point
			retValue = false;
		else
		{
			if (value.indexOf(".",index+1) > -1)	//more than one decimal point
				retValue = false;
		}
	}
	
	//check scale and precision
	if(len > 0 && retValue) {
		if(cmdvalue.length > 0) {
			tempArr = cmdvalue.split(",");
			if(tempArr.length == 2) {
				//scale length
				len = eval(tempArr[0]) - eval(tempArr[1]);
				//decimal point exists
				if(index > -1) {
					scaleValue  = value.substring(0,index);
					precValue 	= value.substr(index+1); 
				}
				else {
					scaleValue  = value;
				}
				//check
				if(scaleValue.length > len) {
					retValue = false;
				}
				else {
					if(eval(precValue) != 0) {
						if(precValue.length > eval(tempArr[1])) {
							retValue = false;
						}
					}
				}
			}
			else {
				retValue = false;
				alert("Please Specify Correct Format !!");
			}
		}
	}
	
	return retValue;
}//end validAmount()

/**
	This function validates file ext and it is called through HisValidator
	It accepts 
		cmdvalue --> It could not be null. It will have the extension that
		you want to validate in file path.
		e.g. gif|jpg|jpeg|bmp|png 
*/
function checkFileExt(value,cmdvalue) {

	var tempArr;
	var i = 0;
	var retValue = false;
	var ext = "";
	var index = 0;
	
	if(cmdvalue.length > 0) {
		index = value.indexOf(".");
		if(index > -1) {
			//extension
			ext = (value.substr(index+1)).toUpperCase();
			
			tempArr = cmdvalue.split("|");
			for(i=0;i<tempArr.length;i++) {
				if(tempArr[i].toUpperCase() == ext) {
					retValue = true;
					break;
				}
			}
		}
	}
	else {
		alert("Please provide the extension !!");
	}
	
	return retValue;
	
} //end checkFileExt

/*
	This function validates the date. The format could be 
		dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
		dd-mon-yyyy or dd/mon/yyyy or dd.mon.yyyy
	
	It accepts value and returns true/false
*/	
function isDate(value) {

	var seprator = "";
	var retValue = false;
	var retValues;
	
	var dtStr = value;
	
	if (dtStr != "")
	{		
		seprator = getSeperator(dtStr);		//function that returns seperator
		if (seprator != "" && dtStr.length >= 8)
		{
			retValues = parseDate_new(dtStr,seprator);
			retValue = retValues.cancelKey;
		}
	}

	return retValue;
}
//End OF Date Method

/*
	This function validates & compares two dates.
	It returns two value
		
		Date Validity -- >true/false
		
		Comparision Status -->
			0 --> frDate is less than toDate
			1 --> Equal
			2 --> frDate is greater than toDate
		
	it accepts value
*/
function compareDate(frDate,toDate)
{
	var seprator1 = "", seprator2 = "";
	var retValue = false;
	var dtMode = 0;
	var retValues1,retValues2;
	
	if (frDate != "" && frDate != null && toDate != "" && toDate != null)
	{
		seprator1 = getSeperator(frDate);		//function that returns seperator
		seprator2 = getSeperator(toDate);		//function that returns seperator
		
		if (seprator1 != "" && frDate.length >= 8)
		{
			retValues1 = parseDate_new(frDate,seprator1);
						
			if (seprator2 != "" && toDate.length >= 8 && retValues1.cancelKey == true)
			{
				retValues2 = parseDate_new(toDate,seprator2);
				if(retValues2.cancelKey == true)
				{
					if(retValues1.year == retValues2.year)
					{
						if(retValues1.month == retValues2.month)
						{
							if(retValues1.day == retValues2.day)
								dtMode = 1;
							else
							{
								if(retValues1.day > retValues2.day)
									dtMode = 2;
								else
									dtMode = 0;
							}
						}
						else
						{
							if(retValues1.month > retValues2.month)
								dtMode = 2;
							else
								dtMode = 0;	
						}
					}
					else
					{
						if(retValues1.year > retValues2.year)
							dtMode = 2;
						else
							dtMode = 0;		
					}
					
					retValue = true;
				}
			}
		}
	}
	
	return {cancelKey :retValue,mode:dtMode};
} //end compareDate() function

/*
	this is internal function that parses the date into day, month & year
*/
function parseDate_new(dtStr,seprator)
{
	var pos1,pos2,tempLen=0;
	var tempStr = "";
	var intDay = 0,intMon = 0,intYear = 0;
	var retValue = false;
	
	pos1 = dtStr.indexOf(seprator);
	pos2 = dtStr.indexOf(seprator,pos1+1);
	
	if(pos1 > 0 && pos2 > (pos1 + 1))
	{
		//day
		tempStr = dtStr.substring(0,pos1);
		tempLen = tempStr.length;
		if(tempLen > 0 && tempLen <=2)
		{
			intDay = parseInt(tempStr,'10');
			//month
			tempStr = dtStr.substring(pos1+1,pos2);
			tempLen = tempStr.length;
			if(tempLen > 0 && tempLen <= 3)
			{
				//format given as dd/mmm/yyyy
				if(tempLen == 3) tempStr = getMonthInt(tempStr);	
				
				intMon = parseInt(tempStr,'10');
				if(intMon > 0) 
				{
					//year
					tempStr = dtStr.substring(pos2+1);
					tempLen = tempStr.length;
					if(tempLen == 4)
					{
						intYear = parseInt(tempStr,'10');
						if (intYear >= 1900 && intYear <= 9900)
						{
							if (intMon >= 1 && intMon <= 12)
							{
								if (intDay > 0 && intDay <= DaysInMonth(intMon, intYear))
									retValue = true;
							}
						}
					}
				}
			}
		}
	}
	
	return {cancelKey :retValue,day:intDay,month:intMon,year:intYear};
}

/*
	This is internal function that finds the seperator used for seperating the date
*/
function getSeperator(dtStr)
{
	var seprator = "";
	
	if (dtStr.indexOf("-") > -1)
		seprator = "-";
	else
	{
		if (dtStr.indexOf("/") > -1)
			seprator = "/";
		else
		{
			if (dtStr.indexOf(".") > -1)
				seprator = ".";
		}
	}	//endif
	return seprator;
}

//this is internal function that converts the month(in string) into month(in integer)
function getMonthInt(str)
{
	var month = "0";
	
	switch(str.toUpperCase())
	{
		case "JAN":
			month = "1";
			break;
		case "FEB":
			month = "2";
			break;
		case "MAR":
			month = "3";
			break;
		case "APR":
			month = "4";
			break;
		case "MAY":
			month = "5";
			break;
		case "JUN":
			month = "6";
			break;
		case "JUL":
			month = "7";
			break;
		case "AUG":
			month = "8";
			break;
		case "SEP":
			month = "9";
			break;
		case "OCT":
			month = "10";
			break;
		case "NOV":
			month = "11";
			break;
		case "DEC":
			month = "12";
			break;
	}
	return month;
}

//this is internal function that returns no of days in a month for the specified year
function DaysInMonth(mon, year) 
{
	var retVal;
	
	retVal = 31;
	if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {retVal = 30;}
	if (mon == 2) {retVal = daysInFebruary(year);}
   	return retVal;
}

//this is internal function that returns day in feb month for specified year
function daysInFebruary (year)
{
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
	 
	
/*this function submits the page*/
function submitForm()
{
	document.form1.submit();
}//end of validateFun

/*
this function returns the requested string for validations, any validating string
can be appended in this function just before default keyword.

This file is for internal use
*/ 
function getValidateStr(index)
{
	var str = "";
	
	switch(index)
	{
		case 1:		//for validating email
			str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@.:/,";
			break;
			
		case 2:		//for validating telephone no
			str = "1234567890-";
			break;
			
		case 3:		//for validating address
			str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-/,.#$()';\: ";
			break;
			
		case 4:		//for validating name
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
			break;
			
		case 5:		//numeric only
			str = "1234567890";
			break;
			
		case 6:		//numeric with space
			str = "1234567890 ";
			break;
			
		case 7:		//for validating amount
			str = "1234567890.";
			break;
			 
		case 8:		//alphanumeric
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			break;
			
		case 9:		//alphanumeric with space
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";
			break;
			
		case 10:	//Character only
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
			
		case 11:	//Character with space
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
			break;
			
		case 12:	//Upper character only
			str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
			
		case 13:	//Upper character with space
			str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
			break;
			
		case 14:	//Lower character
			str = "abcdefghijklmnopqrstuvwxyz";
			break;
			
		case 15:	//Lower character with space
			str = "abcdefghijklmnopqrstuvwxyz ";	 
			break;
			
		case 16:   //for entering the test name
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-().1234567890+'/& ";
			break;
		
		case 17:	//for validating batchno
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-/ ()*<>.;:{}[]%";
			break;
			
		case 18:		//alphanumeric with space and some special characters
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 (){}_-/";
			break;	
		
		case 19:		//alphanumeric with space and some special characters
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 %_/";
			break;
			
		case 20:	//for validating PO REF NO
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-/()<>.;:,{}[] ";
			break;
	    case 21:		//alphanumeric with space and some special characters
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 (){}_-/.,";
			break;
	    case 22:	//for validating enter key
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-/()@<>.;:,{}[]\n ";
	    case 23:	//for validating batch
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-/";
	    case 24:	//for validating batch
			str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-,";
	  
	}	//end of Switch statement
	return str;
}

/*
	this function is used to remove space from the beginning and end of the string
	it accepts value and returns the trimmed value
*/
function trim(value)
{
	var initVal = "",trimmedVal = "";
	var len = 0,j = 0,flag = 0;
	
	initVal = value;
	len = eval(initVal.length);
	if(len > 0)
	{
		for(j = 0,i=len;j < len || i==0;j++,i--)
		{
			if(flag == 0 && initVal.charAt(j) == " ")	//remove starting space 
				continue;
			else
			{
				if(flag == 0)		//character found while checking starting space
				{
					flag = 1;
					initVal = initVal.substr(j);
					len = initVal.length;
					j = -1;
					i = len+1;
				}
				else	//to remove the last space
				{
					if(flag == 1 && initVal.charAt(i-1) == " ")
						continue;
					else
					{
						initVal = initVal.substr(0,i);
						break;
					}	
				}
			}
		}
			
		//assign the trimmed value
		return initVal;	
	}
}


/********added by deepak********/
function dateDiff(date_1,date_2) 
{
var retVal=compareDate(date_1,date_2);
	if(retVal.mode==0 || retVal.mode==1)
	{
		var ret=parseDate_new(date_1,"-");
		var ret1=parseDate_new(date_2,"-");
		var dt1=ret.month+"-"+ret.day+"-"+ret.year;
		var dt2=ret1.month+"-"+ret1.day+"-"+ret1.year;
		date1 = new Date();
		date2 = new Date();
		diff = new Date();
	//alert("Valid From/in format DD-MM-YYYY->"+dt1);
	//alert("Valid To/in format DD-MM-YYYY->"+dt2);
	{
	// Validates first date 
		var myDate1=new Array();
		myDate1=dt1.split("-");
		date1temp = new Date(myDate1[2],myDate1[0],myDate1[1]);
		date1.setTime(date1temp.getTime());
	}
	{ 
	// Validates second date 
		var myDate2=new Array();
		myDate2=dt2.split("-");
		date2temp = new Date(myDate2[2],myDate2[0],myDate2[1]);
		//alert("date2temp.getTime()->"+date2temp.getTime());
		date2.setTime(date2temp.getTime());
	}
	// sets difference date to difference of first date and second date
	//alert("date1.getTime()->"+date1.getTime());
		diff.setTime(Math.abs(date1.getTime() - date2.getTime()));
		timediff = diff.getTime();
		//alert("timediff->"+timediff);
		weeks = Math.floor(timediff / (1000 * 60 * 60 * 24 * 7));
		timediff -= weeks * (1000 * 60 * 60 * 24 * 7);
		days = Math.floor(timediff / (1000 * 60 * 60 * 24)); 
		timediff -= days * (1000 * 60 * 60 * 24);
		days=parseInt(weeks)*7+days;
		var diff = /*weeks + " weeks, " +*/ days + " days " ;
		//alert("date diff->"+diff);
		return diff;
	/*
	var o=document.getElementById("daysOnLeave");
	o.innerHTML="<font color='blue' weight='strong'>"+diff+"</font>";
	document.forms[0].strDaysOnLeave.value=diff;*/
	}
}


//Alphabetic
function validateThroughRegExp(obj,validationType)
{
   var str = "";
   switch(validationType)
	{
		case 1:		//for numbers only
			if(obj.value.search(nonums)==0) 
	   		{
	     		//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Numbers Only";
	    	}
			break;
			
		case 2:		//for characters only
			if(obj.value.search(regexForAlphabetic)==-1) 
	   		{
	     		//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Characters Only";
	    	}
			break;
			
		case 3:		//for alphanumeric only
			if(obj.value.search(regexForAlphanumeric)==-1) 
	   		{
				obj.focus();
			    str = "Characters With Spaces Not Allowed";
				
				//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Special Characters Not Allowed";
	    	}
			break;
			
		case 4:		//for Numeric With Space
			if(obj.value.search(regexForAlphabetic)==-1) 
	   		{
	     		//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Numbers Only";
	    	}
			break;
			
		case 5:		//for characters with space
			if(obj.value.search(regexForAlphabetic)==-1) 
	   		{
	     		//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Characters Only";
	    	}
			break;
			
		case 6:		//for alphanumeric with space
			if(obj.value.search(regexForAlphabetic)==-1) 
	   		{
	     		//return false;
	   		}
	   		else
	   		{
			    obj.focus();
			    str = "Incorrect Format:Special Characters Not Allowed";
	    	}
			break;
			
	}	//end of Switch statement
	//return str;
	if(str!="")
	{
		alert(str);
		obj.value="";
		return false;
	}
	else
	{
		return true;
	}   

}





    
/*=========================================end of file===============================================*/

