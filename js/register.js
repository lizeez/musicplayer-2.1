function changeSucceedStyle(nameID, spanID) { 
	spanID.firstChild.nodeValue = "*";
	spanID.style.fontSize = "larger";
	spanID.style.color = "green";
	nameID.style.borderColor = "limegreen";
}

function changeFailedStyle(nameID, spanID) { 
	spanID.firstChild.nodeValue = "*"; 
	spanID.style.fontSize = "larger";
	spanID.style.color = "blue";
	nameID.style.borderColor = "blue";
}

function changeFailingStyle(nameID, spanID) { 
	spanID.style.fontSize = "small";
	spanID.style.color = "red";
	nameID.style.borderColor = "red";
}

function spanValue(spanID, spanValue) { 
	switch(spanValue) {
		case "usernameSpan":
			spanID.firstChild.nodeValue = "6-16位：英文.数字.下划线";
			break;
		case "passwordSpan":
			spanID.firstChild.nodeValue = "6-16位：非空字符";
			break;
		case "repasswordSpan":
			spanID.firstChild.nodeValue = "请确认密码";
			break;
		case "repasswordSpan1":
			spanID.firstChild.nodeValue = "两次密码不一致";
			break;
		case "mailboxSpan":
			spanID.firstChild.nodeValue = "x(5-18位)@x.com";
			break;
		case "phoneSpan":
			spanID.firstChild.nodeValue = "号码格式不正确";
			break;
		case "usernameAgain":
			spanID.firstChild.nodeValue = "用户名已存在！";
	}
}

function username() {
	var username = document.getElementById("username"); 
	var usernameSpan = document.getElementById("usernameSpan"); 
	var pattern = /^[0-9a-zA-Z_]{6,16}$/;
	var userAgain = 0; 
	username.onfocus = function() { 
		if(!pattern.test(username.value)) { 
			spanValue(usernameSpan, "usernameSpan"); 
			changeFailingStyle(username, usernameSpan); 
		} else {
			if(userAgain == 0) {
				spanValue(usernameSpan, "usernameAgain"); 
				changeFailingStyle(username, usernameSpan); 
			}
		}
	}
	username.onkeyup = function() { 
		if(pattern.test(username.value)) { 
			changeSucceedStyle(username, usernameSpan); 
			if(!checkUsername(username.value + "username")) {
				spanValue(usernameSpan, "usernameAgain"); 
				changeFailingStyle(username, usernameSpan); 
				userAgain = 0; 
			} else {
				userAgain = 1; 
			}
		} else { 
			spanValue(usernameSpan, "usernameSpan"); 
			changeFailingStyle(username, usernameSpan);
		}
	}
	username.onblur = function() { 
		if(pattern.test(username.value) && userAgain) { 
			changeSucceedStyle(username, usernameSpan); 
			usernamenum = 1;
		} else { 
			changeFailedStyle(username, usernameSpan); 
			usernamenum = 0;
		}
	}
}

function password() {
	var password = document.getElementById("password"); 
	var passwordSpan = document.getElementById("passwordSpan");
	var pattern = /^\S{6,16}$/;
	var repassword = document.getElementById("repassword");
	password.onfocus = function() { 
		if(!pattern.test(password.value)) { 
			spanValue(passwordSpan, "passwordSpan"); 
			changeFailingStyle(password, passwordSpan);
		}
	}
	password.onkeyup = function() { 
		if(pattern.test(password.value)) { 
			changeSucceedStyle(password, passwordSpan);
			if(repassword.value != "") { 
				repassword.onfocus();
			}
		} else { 
			spanValue(passwordSpan, "passwordSpan"); 
			changeFailingStyle(password, passwordSpan);
			if(repassword.value != "") {
				repassword.onfocus();
			}
		}
	}

	password.onblur = function() { 
		if(repassword.value == "") {
			if(pattern.test(password.value)) { 
				changeSucceedStyle(password, passwordSpan);
				passwordnum = 1;
			} else { 
				changeFailedStyle(password, passwordSpan);
				passwordnum = 0;
			}
		} else {
			if(password.value != repassword.value) {
				repassword.onfocus();
				//repassword.style.borderColor = "red";
				repasswordnum = 0;
			}
		}

	}

}

function repassword() {
	var password = document.getElementById("password");
	var repassword = document.getElementById("repassword"); 
	var repasswordSpan = document.getElementById("repasswordSpan");

	repassword.onfocus = function() {
		if(!(password.value == repassword.value && password.value != "")) { 
			spanValue(repasswordSpan, "repasswordSpan"); 
			changeFailingStyle(repassword, repasswordSpan);
		} else { 
			changeSucceedStyle(repassword, repasswordSpan);
		}
	}
	repassword.onkeyup = function() {
		if(password.value == repassword.value && password.value != "") {
			changeSucceedStyle(repassword, repasswordSpan);
		} else {
			spanValue(repasswordSpan, "repasswordSpan1");
			changeFailingStyle(repassword, repasswordSpan);
		}
	}
	repassword.onblur = function() {
		if(password.value == repassword.value && password.value != "") { 
			changeSucceedStyle(repassword, repasswordSpan);
			repasswordnum = 1;
		} else {
			spanValue(repasswordSpan, "repasswordSpan");
			changeFailedStyle(repassword, repasswordSpan);
			repasswordnum = 0;
		}
	}
}

function mailbox() {
	var mailbox = document.getElementById("mailbox"); 
	var mailboxSpan = document.getElementById("mailboxSpan");
	var pattern = /^[0-9a-zA-Z_]{5,18}@[0-9a-z]+.com$/;
	mailbox.onfocus = function() {
		if(!pattern.test(mailbox.value)) {
			spanValue(mailboxSpan, "mailboxSpan");
			changeFailingStyle(mailbox, mailboxSpan);
		}
	}
	mailbox.onkeyup = function() {
		if(pattern.test(mailbox.value)) {
			changeSucceedStyle(mailbox, mailboxSpan);
		} else {
			spanValue(mailboxSpan, "mailboxSpan");
			changeFailingStyle(mailbox, mailboxSpan);
		}
	}
	mailbox.onblur = function() {
		if(pattern.test(mailbox.value)) {
			changeSucceedStyle(mailbox, mailboxSpan);
			mailboxnum = 1;
		} else {
			changeFailedStyle(mailbox, mailboxSpan);
			mailboxnum = 0;
		}
	}
}

function phone() {
	var phone = document.getElementById("phone");
	var phoneSpan = document.getElementById("phoneSpan");
	var pattern = /^1[3458][0-9]([1-9]{4}|0[1-9]{3}|[1-9]0[1-9]{2}|[1-9][1-9]0[1-9]|[1-9][1-9][1-9]0)\d{4}$/;
	phone.onfocus = function() {
		if(!pattern.test(phone.value)) {
			spanValue(phoneSpan, "phoneSpan");
			changeFailingStyle(phone, phoneSpan);
		}
	}
	phone.onkeyup = function() {
		if(pattern.test(phone.value)) {
			changeSucceedStyle(phone, phoneSpan);
		} else {
			spanValue(phoneSpan, "phoneSpan");
			changeFailingStyle(phone, phoneSpan);
		}
	}
	phone.onblur = function() {
		if(pattern.test(phone.value)) {
			changeSucceedStyle(phone, phoneSpan);
			phonenum = 1;
		} else {
			changeFailedStyle(phone, phoneSpan);
			phonenum = 0;
		}
	}
}

function vercode() {
	var vercode = document.getElementById("vercode");
	var vercodeSpan = document.getElementById("vercodeSpan");
	vercode.onfocus = function() {
		if(vercode.value == "" || vercodeSpan.style.color == "blue" || vercodeSpan.style.color == "") { 
			produceCode(); 
		} else { 
			if(vercodeSpan.style.color == "blue") { 
				vercodeSpan.style.color = "blue"; 
				vercode.style.borderColor = "blue";
			}
		}
	}
	vercode.onkeyup = function(s) {
		var vercodeSpan = document.getElementById("vercodeSpan");
		if(vercode.value == vercodeSpan.firstChild.nodeValue) { 
			changeSucceedStyle(vercode, vercodeSpan);
		} else {
			vercodeSpan.style.color = "red"; 
			vercode.style.borderColor = "red";
		}
		if(s == 1) { 
			produceCode();
			vercodeSpan.style.color = "red"; 
			vercode.style.borderColor = "red";
		}
	}
	vercode.onkeydown = function() { 
		var k = window.event.keyCode;  
		if(vercodeSpan.style.color == "green" && k != 9) { 
			vercode.onkeyup(1);
		}

	}
	vercode.onblur = function() {
		if(vercodeSpan.style.color == "green") {
			changeSucceedStyle(vercode, vercodeSpan);
			vercodenum = 1;
		} else {
			changeFailedStyle(vercode, vercodeSpan);
			vercodenum = 0
		}
	}

	function produceCode() { 
		var code = ""; 
		for(var i = 0; i < 4; i++) { 
			var num = Math.floor(Math.random() * 10);
			code += num; 
		}
		vercodeSpan.firstChild.nodeValue = code; 
	}
}

var usernamenum = 0,
	passwordnum = 0,
	repasswordnum = 0,
	mailboxnum = 0,
	phonenum = 0,
	vercodenum = 0;

function checkUsername(userName) {
	var cookie = unescape(document.cookie); 
	var cookieArray = cookie.split(";"); 
	for(var i = 0; i < cookieArray.length; i++) { 
		var value = cookieArray[i].split("=")[0]; 
		if(userName == value) { 
			return 0; 
		}
	}
	return 1; 
}

function submit() { 
	var submit = document.getElementById("submit");
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var repassword = document.getElementById("repassword");
	var mailbox = document.getElementById("mailbox");
	var phone = document.getElementById("phone");
	var vercode = document.getElementById("vercode");
	submit.onclick = function() {
		if(usernamenum && passwordnum && repasswordnum && mailboxnum && phonenum && vercodenum) { 
			var date = new Date(); 
			date.setDate(date.getDate() + 30); 
			var tempCookie = "";
			var cookie1 = unescape(document.cookie);
			var cookieArray = cookie1.split(";");
			if(cookieArray.length%4==2 || cookieArray.length%4==3 ||cookieArray.length%4==1) {
                                if(cookieArray.length%4==1) {
					for(var i=0;i<cookieArray.length-1;i++) {
						if(cookieArray[i] != "") {
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}
					}
				}
				if(cookieArray.length%4==2) {
					for(var i=0;i<cookieArray.length-1;i++) {
						if(cookieArray[i] != "") {
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}
					}
				}
				if(cookieArray.length%4==3) {
					for(var i=0;i<cookieArray.length-2;i++) {
						if(cookieArray[i] != "") {
							tempCookie += cookieArray[i];
							tempCookie += ";";
						}	
					}
				}
			}
			
			document.cookie = "";
			cookie = username.value + "username" + "=" + username.value + ";" + username.value + "password" + "=" + password.value + ";" + username.value + "mailbox" + "=" + mailbox.value + ";" + username.value + "phone" + "=" + phone.value + ";" + tempCookie;
			document.cookie = escape(cookie);
			document.cookie = document.cookie + ";expires=" + date.toGMTString(); 
			window.location.href="login.html";
			return false;
		} else { 
			if(!usernamenum) {
				username.onfocus();
			}
			if(!passwordnum) {
				password.onfocus();
			}
			if(!repasswordnum) {
				repassword.onfocus();
			}
			if(!mailboxnum) {
				mailbox.onfocus();
			}
			if(!phonenum) {
				phone.onfocus();
			}
			if(!vercodenum) {
				vercode.onfocus();
			}
			alert("请确认信息填写正确！");
			return false;
		}
	}
}

window.onload = function() {
	username();
	password();
	repassword();
	mailbox();
	mailbox();
	phone();
	vercode();
	submit();
}
