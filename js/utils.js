

function checkUserName(username){
    if (username.length < 5){
    	alert("votre username est faux");
        return false;
    }
    else{
        return true;
    }
}


function checkPass(password){
    let passRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
    if (!passRegex.test(password)){
        alert("votre mot de passe n'est pas aux normes");
        return false;
    }
    else{
        return true;
    }
}
