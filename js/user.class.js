class User {
	
	username;
	email;
	password;
	
	constructor(username, email, password){
		this.username = username;
		this.email = email;
		this.password = password;
	}

	// ici la methode getters la meilleur selon 3wschool
	get username(){
 	   	return this.username;
 	}
 	get email(){
 		return this.email;
 	}
 	get password(){
 		return this.password;
 	}
}