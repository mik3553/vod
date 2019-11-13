

function checkUserName(username){
    if (username.length < 5){
    	 $(".warningUser").show().addClass("alert alert-danger");
        return false;
    }
    else{
        $(".warningUser").hide();
        return true;
    }
}

function checkEmail(email) {
    let mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!mailRegex.test(String(email).toLowerCase())) {
        $(".warningEmail").show().addClass("alert alert-danger");
        return false;
    }
    else{
        $(".warningEmail").hide();
        return true;
    }
}


function checkPass(password){
    let passRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
    if (!passRegex.test(password)){
        $(".warning").show().addClass("alert alert-danger");
        return false;
    }
    else{
        $(".warning").hide()
        return true;
    }
}

function checkPassC(password, passwordC){
    if (password != passwordC) {
        $(".warningCheckPass").show().addClass("alert alert-danger");
        return false;
    }
    else {
         $(".warningCheckPass").hide()
        return true;
    }
}

// function requestError(data , status , errors, driver){
//     console.log(data);
//     console.log(status);
//     if(data.errors == undefined){

//     console.log(" Envoyer :"+data.errors);  
//     }
//     // on verfie si l'email est deja pris grace au retour du message d'erreur 
//     if (data.driver == true) {
                                  
//     $(".warningCheckEmail").show().addClass("alert alert-danger");
//     //comment stoper le submit
//     }
//     else {
//         $(".warningCheckEmail").hide();
//     }

// }


