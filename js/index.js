 $(document).ready(function(event) {

 	// pour faire apparaitre les formulaire inscription / connexion
 	$("#inscription a").click(function(e){
 		$("#formInscri").slideDown();
 		$("h1").addClass("light");
 	})
 	$("#connexion a").click(function(){
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
					 				$("#connexion").text(`Bonjour ${data.user.username}`);
					 				$("#deconnexion").show();
					 				$("#inscription").hide();
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
// ===============Afficher nos categories page d'accueil=====================================================================================================================
	
	const categorys = "https://brianboudrioux.fr/simplon/api/categories";
	$.get( categorys, {name: "kids"})
	// escma6
	.done(function(data, status){

		$.each( data, function(i,item) {

			let article = $("<article>").attr("data-id", item._id);
			let titre = $("<h3>").text(item.name);
			let img = $("<img class='imgCat'>").attr("src", item.picture);
			article.appendTo(".sectionFlex");
			titre.appendTo(article);
			img.appendTo(article);
		});      
	})

//==================Afficher nos films/series page displayOne========================================================================================
	
	const filmSeries = "https://brianboudrioux.fr/simplon/api/products";
	$.get(filmSeries, function(data, status){
		$.each(data , function(i,item){
			let article = $("<article class=\"media\">").attr("data-media", item.media);;
			let titre = $("<h3>").text(item.name);
			let img = $("<img class='imgCat'>").attr("src", item.picture);

			article.appendTo(".sectionFlexFilm");
			titre.appendTo(article);
			img.appendTo(article);

		});
	});

	//Afficher les films/series correspondants a la categorie clicker page d'accueil

	$(".sectionFlex").on("click","article", function(){

		let id = $(this).data("id");
		const category_id = "https://brianboudrioux.fr/simplon/api/products/category/"+id;
		$(".sectionFlex").hide();
		$(".sectionGenre h2").text("Categorie : "+$(this).children("h3") );

		$.get(category_id, function(data , status){
			console.log(data);

			$.each(data, function(i, item){

				let article = $("<article class=\"media\">").attr("data-media", item.media );
				let titre = $("<h3>").text(item.name);
				let img = $("<img>").attr("src", item.picture);

				article.appendTo(".section_Category_id");
				titre.appendTo(article);
				img.appendTo(article);
			})
		})
	})


//======Evenement au click de notre article(film/serie etc...) on récupére le media de l'api et on l'insére dans notre URL================
	$(document).on("click",".media", function(e) {
		let media = $(this).data("media");
		$(location).attr("href", "displayOne.html?visionnage="+media);
	})

//====================On récupére de notre url le lien avec le searchParams et on l'injecte dans notre src du Iframe==============================
	const params = new URL(document.location).searchParams;
    const lien = params.get("visionnage");
	$("iframe").attr("src", lien);


});

 	