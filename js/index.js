 $(document).ready(function(event) {

 	// pour faire apparaitre les formulaire inscription / connexion
 	$("#inscription").click(function(){
 		$("#formInscri").slideDown();
 	})
 	$("#connexion").click(function(){
 		$("#formConnexion").slideDown();
 	})
 	$(".close").click(function(){
 		$("#formInscri").slideUp();
 		$("#formConnexion").slideUp();
 	})



 	// event pour recuperer nos valeur des inputs avec une class user
 	$("#inscriptionForm input[type=submit]").click(function(e){
 		// e.preventDefault();
 		let username = $("#username").val();
 		checkUserName(username);
  		let mail = $("#mail").val();
 		let password = $("#password").val();
 		checkPass(password);
 	
 		let user = new User(username, mail, password)
 		// fonction du localStorage de nos identifiant users
 		localStorage.setItem("user", JSON.stringify(user));
 	})
 	// on recuper notre setItem pour afficher directement a la connexion l'email de notre user
 	let user = localStorage.getItem("user");
        user = JSON.parse(user);
	$("#coEmail").val(user.email);

 	$("#connexionForm input[type=submit]").click(function(e){
 		e.preventDefault();

 		// fonction du localStorage de nos identifiant users
 	})

 });