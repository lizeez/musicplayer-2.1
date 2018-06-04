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

function getCookie(username) {
	var cookie = unescape(document.cookie); 
	var cookieArray = cookie.split(";"); 
	for(var i = 0; i < cookieArray.length; i++) { 
		var value = cookieArray[i].split("="); 
		if(value[0] == username) { 
			return value[1]; 
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
			} else { 
				changeSucceedStyle(vercode, vercodeSpan);
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
		if(window.event.keyCode) {
			var k = window.event.keyCode; 
			if(vercodeSpan.style.color == "green" && k != 9) { 
				vercode.onkeyup(1);
			}
		} else {
			if(vercodeSpan.style.color == "green") { 
				vercode.onkeyup(1);
			}
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

function username() {
	var username = document.getElementById("username"); 
	var usernameSpan = document.getElementById("usernameSpan"); 
	var usernameCookie;
	var password = document.getElementById("password");
	username.onfocus = function() { 
		usernameCookie = getCookie(username.value + "username");
		if(!(username.value == usernameCookie)) { 
			usernameSpan.firstChild.nodeValue = "账户不存在"; 
			changeFailingStyle(username, usernameSpan); 
		} else {
			changeSucceedStyle(username, usernameSpan);
			usernamenum = 1;
		}
	}
	username.onkeyup = function() { 
		usernameCookie = getCookie(username.value + "username");
		if(username.value == usernameCookie) { 
			changeSucceedStyle(username, usernameSpan); 
			password.focus(); 
			if(password.value != "") { 
				password.onfocus();
			}
		} else { 
			usernameSpan.firstChild.nodeValue = "账户不存在"; 
			changeFailingStyle(username, usernameSpan);
			if(password.value != "") { 
				password.onfocus();
			}
		}
	}
	username.onblur = function() { 
		
		if(username.value == usernameCookie) { 
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
	var username = document.getElementById("username"); 
	var vercode = document.getElementById("vercode");
	
	var usernameCookie; 
	var passwordCookie; 

	password.onfocus = function() { 
		usernameCookie = getCookie(username.value + "username");
		passwordCookie = getCookie(username.value + "password");
		if(!(password.value == passwordCookie) || !(username.value == usernameCookie)) { 
			passwordSpan.firstChild.nodeValue = "密码错误";
			changeFailingStyle(password, passwordSpan); 
		} else {
			changeSucceedStyle(password, passwordSpan);
		}
	}
	password.onkeyup = function() { 
		usernameCookie = getCookie(username.value + "username");
		passwordCookie = getCookie(username.value + "password");
		if(password.value == passwordCookie && username.value == usernameCookie) { 
			changeSucceedStyle(password, passwordSpan); 
			vercode.focus(); 
		} else { 
			passwordSpan.firstChild.nodeValue = "密码错误"; 
			changeFailingStyle(password, passwordSpan);
		}
	}
	password.onblur = function() { 
		
		if(password.value == passwordCookie && username.value == usernameCookie) { 
			changeSucceedStyle(password, passwordSpan); 
			passwordnum = 1;
		} else { 
			changeFailedStyle(password, passwordSpan); 
			passwordnum = 0;
		}
	}
}

var usernamenum = 0,
	passwordnum = 0,
	vercodenum = 0;

function user() {
	var user = document.getElementById("user");
	var username = document.getElementById("username");
	user.onclick = function() {
		if(usernamenum && passwordnum && vercodenum) {
			document.cookie = "ID=1;"; 
			document.cookie = "login=" + username.value;
			location.href = "index.html";
		} else {
			alert("请确认填写的信息全部正确！");
			return false;
		}
	}
}

function visitor() {
	var visitor = document.getElementById("visitor");
	visitor.onclick = function() {
		if(document.cookie != "") {
			document.cookie = "ID=0;"; 
		}
		location.href = "register.html";
	}
}

window.onload = function() {
	vercode();
	username();
	password();
	user();
	visitor();
	var Username = document.getElementById("username");
	Username.onfocus();
	
}
