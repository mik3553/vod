 $(document).ready(function(event) {

 	// pour faire apparaitre les formulaire inscription / connexion
 	$("#inscription").click(function(e){
 		$("#formInscri").slideDown();
 		$("h1").addClass("light");
 	})
 	$("#connexion").click(function(){
 		$("#formConnect").slideDown();
 		$("h1").addClass("light");
 	})
 	$(".close").click(function(){
 		$("#formInscri").slideUp();
 		$("#formConnect").slideUp();
 	})

 	// pour faire apparaitre les offres en mobile
 	$(".openP").click(function(){
 		$(this).siblings("p").slideToggle();

 		if ($(".offre") === "hidden") {
 			$(".openP i").addClass("fas fa-arrow-circle-down");
 		}
 		else {
 			$(".openP i").removeClass("fas fa-arrow-circle-up");
 			$(".openP i").addClass("fas fa-arrow-circle-up");
 		}

 	})

 	// event au click du submit de notre formulaire inscription
 	$("#inscriptionForm input[type=submit]").click(function(e){
 		// e.preventDefault();
 		let username = $("#username").val();
  		let mail = $("#mail").val();
 		let password = $("#password").val();
 		let passwordC = $("#passwordC").val();
 		// si toutes nos fonctions utils sont true alors le code s'execute
 		if(checkUserName(username) == true && checkEmail(mail) == true && checkPass(password)==true && checkPassC(password, passwordC) == true ){
 			e.preventDefault();
 			// on instancie la class User
	 		let user = new User(username, mail, password)
	 		// on recupere notre user avec localStorage
	 		localStorage.setItem("user", JSON.stringify(user));
	 		// envoyer nos données saisies via ajax (post)
	 		let newUser = "https://brianboudrioux.fr/simplon/api/users"; // API Brian pour enregistrer notre user via le formulaire
 			$.post(newUser,{ username : username,
                         	 email    : mail,
                         	 password : password
                         	},  function(data, status){

	                         		console.log(status);
	                         		console.log(data);
                            		if(data.errors == undefined){
	                         			console.log(" Envoyé :"+data.errors);	
                                	}
                                	// on verifie si l'email est deja pris grace au retour du message d'erreur 
                           			if (data.driver == true) {
							      
							        	$(".warningCheckEmail").show().addClass("alert alert-danger");
							        	//comment stoper le submit
							    	}
							    	else {
							        	$(".warningCheckEmail").hide();
							    	}
        						})
 		}
 		else {
 			e.preventDefault();
 		}

 	})


 	// on recuper notre localstorage pour afficher directement a la connexion l'email de notre user
 	let user = localStorage.getItem("user");
        user = JSON.parse(user);
	$("#coEmail").val(user.email);

	// event au click de submit ne notre formulaire connexion
 	$("#connexionForm input[type=submit]").click(function(e){
 		// e.preventDefault()
 		let connexion = "https://brianboudrioux.fr/simplon/api/connect";
 		// on requette l'url de l'api pour vérifier si les identifiants suivants existent
 		$.post(connexion , { email: $("#coEmail").val(),
 							 password:$("#coPassword").val()
 							}, function(data, status){
					 			console.log(status);
					 			console.log("réponse auth : ",data);
					 			// l'api nous repond data.auth==false si identifiants email et password faux
					 			if (data.auth == true) {
					 				console.log("data_auth :",data.auth)
					 				console.log("hello :"+data.user.username);
					 				$("#welcome").text(`Bonjour ${data.user.username}`);
					 				$("#monCompte").text("Mon compte");
					 				$(".warningCheckUserAuth").hide();
					 				$("#formConnect").slideUp();

					 			}
					 			else {
					 				e.preventDefault();
					 				$(".warningCheckUserAuth").show().addClass("alert alert-danger");
					 			}
 							})
 	})
// ===============Afficher nos categories=====================================================================================================================
	
	let categorys = "https://brianboudrioux.fr/simplon/api/categories";
	$.get( categorys)
	// escma6
	.done(function(data, status){
		console.log(data);
		console.log(status);
		$.each( data, function(i,item) {
			let article = $("<article>");
			let titre = $("<h3>").text(item.description);
			let img = $("<img class='imgCat'>").attr("src", item.picture);
			article.appendTo(".sectionGenre");
			titre.appendTo(article);
			img.appendTo(article);
		});      
	})

	var catFilm = "https://brianboudrioux.fr/simplon/api/categories";

 	$.get(catFilm ,function(data, status) {
 		console.log(data);
 	
 		$.each(data, function(i, element) {
 			$("<h3>").text(element.description).appendTo(".sectionGenre");
 			$("<img>").attr("src", element.picture).appendTo(".sectionGenre");
 		})
 

 	})
 	
});









