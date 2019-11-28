 $(document).ready(function(event) {

 	// pour faire apparaitre les formulaire inscription / connexion
 	$("#inscription a").click(function(e){
 		$("#formInscri").slideDown();
 		$("h1").addClass("light");
 	})
 	$(".connexion a").click(function(){
 		$("#formConnect").slideDown();
 		$("h1").addClass("light");
 	})
 	$(".close").click(function(){
 		$("#formInscri").slideUp();
 		$("#formConnect").slideUp();
 	})

 	// pour faire apparaitre les offres en mobile
 	$(".openP").click(function(e){
 		e.preventDefault();
 		$(this).siblings("p").slideUp(function(){
 			$(this).siblings(".openP").removeClass("fas fa-arrow-circle-up");
 			$(this).siblings(".openP").addClass("fas fa-arrow-circle-down");
 		});
 		$(this).siblings("p:hidden").slideDown(function(){
 			$(this).siblings(".openP").removeClass("fas fa-arrow-circle-down");
 			$(this).siblings(".openP").addClass("fas fa-arrow-circle-up");
 		});
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
	 		let user = new User(username, mail, password);
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
 	let user = new User(username, mail, password)
 		user = localStorage.getItem("user");
        user = JSON.parse(user);
	$("#coEmail").val(user.mail);

	// event au click de submit ne notre formulaire connexion
 	$("#connexionForm input[type=submit]").click(function(e){
 		e.preventDefault()
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
					 				$(".connexion").text(`Bonjour ${data.user.username}`).css({color : "gold"});
					 				$("#deconnexion").show();
					 				$("#inscription").hide();
					 				$("#monCompte").text("Mon compte");
					 				$(".warningCheckUserAuth").hide();
					 				$("#formConnect").slideUp();
					 				let userFavori = data.user._id;
					 				console.log(userFavori);
					 				sessionStorage.setItem("userId", userFavori);
					 			}
					 			else {
					 				e.preventDefault();
					 				$(".warningCheckUserAuth").show().addClass("alert alert-danger");
					 			}
 							})
 	})
// ===============Afficher nos categories page d'accueil=====================================================================================================================
	
	const categorys = "https://brianboudrioux.fr/simplon/api/categories";
	$.get( categorys)
	// escma6
	.done( function(data, status){
		console.log(data)
		$.each( data, function(i,item) {

			if (item.name == "kids" ||item.name == "Vintage Kids" || item.name == "comedy" || item.name =="vintage" || item.name == "Vintage documentaires" || item.name =="Vintage suspense"){

				let article = $("<article>").attr("data-id", item._id);
				let titre = $("<h3>").text(item.name);
				let img = $("<img class='imgCat'>").attr("src", item.picture);
				article.appendTo(".sectionFlex");
				titre.appendTo(article);
				img.appendTo(article);
			}

		});      
	})
//==================Afficher nos films/series page displayOne========================================================================================
	});

//=================Ajouter une catégorie====================================================================================
	// $(".btnAddCat").insert($(".sectionFlex article"));
	$(".btnAddCat").click(()=>{
		$("#formAddCat").toggle();
	});

	$("#pushCategorie").click((e)=>{
		e.preventDefault()
		let addName = $("#nameAdd").val();
		let addDescription = $("#descriptionAdd").val();
		let addImage = $("#imageAdd").val();

		const urlAddCat = "https://brianboudrioux.fr/simplon/api/categories";
		$.post(urlAddCat, {name : addName, description: addDescription, picture: addImage}, (data, status)=>{
			console.log(status);
			console.log(data);
		});
	});

//==================Afficher nos films/series page displayAll=======================================================================================
	
	const filmSeries = "https://brianboudrioux.fr/simplon/api/products";
	$.get(filmSeries, function(data, status){
		console.log(data);
		console.log(status)
		$.each(data , function(i,item){

			let article = $("<article class=\"media\">").attr("data-media", item.media);
			let titre = $("<h3>").text(item.name);
			let img = $("<img class='imgCat'>").attr("src", item.picture);
			let button = $("<button class = \"ajoutfavoris\">").text("Ajouter aux favorits").attr("data-id", item._id);
			let div = $("<div>").appendTo(".sectionFlexFilm");
			button.appendTo(div);
			article.appendTo(".sectionFlexFilm");
			div.appendTo(div);
			titre.appendTo(article);
			img.appendTo(article);



		});
	});

	//Au clic du film de notre page displayAll, on redirige vers la page displayOne et on fait apparaitre le media correspondant.

	const touslesFilms = "https://brianboudrioux.fr/simplon/api/products";

	$(".sectionFlexFilm").on("click","article", function() {
		document.location.href="displayOne.html";

		/*let idFilm = article.id;
		let titreFilm = item.description;
		let film = article;*/
		

		/*$(this).article().show();*/

			$(".media").show( $(this).media); 

	})

	//Afficher les films/series correspondants a la categorie clicker page d'accueil

	$(".sectionFlex").on("click","article", function(){

//==================Ajouter un film=========================================================================================
	$(".btnAddProduct").click(()=>{
		$("#formAddProduct").toggle();
	});

	$("#pushProducts").click((e)=>{
		e.preventDefault()
		let addName = $("#nameAddP").val();
		let addDescription = $("#descriptionAddP").val();
		let addImage = $("#imageAddP").val();
		let addMedia = $("#mediaAddP").val();
		let addCat = $("#catAddP").val();

		const urlAddProducts = "https://brianboudrioux.fr/simplon/api/products";
		$.post(urlAddProducts, {name : addName, description: addDescription, picture: addImage, media : addMedia, category: addCat}, (data, status)=>{
			console.log(status);
			console.log(data);
		});
	});


// ==================Afficher les films/series correspondants a la categorie clicker page d'accueil===============================
	$(".sectionFlex").on("click","article", function(e){
		$(".btnAddCat").hide();
		$(".backCat").css({display: "block"});
		let id = $(this).data("id");
		let title = $(this).children("h3").html();

		const category_id = "https://brianboudrioux.fr/simplon/api/products/category/"+id;
		$(".sectionFlex").hide();
		$(".sectionGenre h2").text("Categorie : " + title );

		$.get(category_id ,function(data , status){
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
//========Revenir a la categorie depuis la liste des films========================================
	$(".backCat").click(()=>{

		$(location).attr("href", "index.html");
		// $(".sectionFlex").show();
		// $(".section_Category_id").hide();
	})	
//======Evenement au click de notre article(film/serie etc...) on récupére le media de l'api et on l'insére dans notre URL================
	$(document).on("click",".media", function() {
		let src = $(this).data("media");
		$(location).attr("href", "displayOne.html?id=" + src);	
	})
	const params = new URL(document.location).searchParams; //On récupére dans l'url le lien et on l'injecte dans l'Iframe
	const lien = params.get("id");
	$("iframe").attr("src", lien);
});

//====================searchBar======================================================================================================
	$(".searchResults").hide();
	$(".search").on("change",function(){

		$(".searchResults").show();
		$(".searchResults").empty();
		let inputSearch = $(this).val();
		let urlSearch ="https://brianboudrioux.fr/simplon/api/productsByName/" + inputSearch;
		
		$.get(urlSearch, function(data, status){
			console.log(data);
			$.each(data , function(i, item){

				let article = $("<article class=\"media\">").attr("data-media", item.media);
				let titre = $("<h3>").text(item.name);
				let img = $("<img>").attr("src", item.picture);
				
				article.appendTo(".searchResults");
				titre.appendTo(article);
				img.appendTo(article);

			})
		})
	})

	//====================== faire des favoris qui envoiens les données d'utilisateurs



//Faut user est connecté ... et tu recuperes l'ajoutfavoris par une classe existante

$(".sectionFlexFilm").on("click", ".ajoutfavoris", function(e) { 

		let favoriFilm = $(this).data("id");

		 let userId = sessionStorage.getItem("userId");
		const favori = "https://brianboudrioux.fr/simplon/api/products/favorites/"+userId;

		$.post(favori, {product: favoriFilm}, function(data, status) {


			console.log(data);
			console.log(status);
		});
});



// Au clic de boutton AJOUTFAVORI, 
