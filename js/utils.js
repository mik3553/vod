

function checkUserName(username){
    if (username.length < 5){
    	   $(".warningUser").show().addClass("alert alert-danger");
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
        $("passWarning").addClass("alert alert-warning");
        return false;
    }
    else{
        return true;
    }
}
