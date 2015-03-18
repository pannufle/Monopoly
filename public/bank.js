// Debits a player (if possible)
function debit(value){
	//If player has enough money
	if(sentJson.account-value >= 0){
		sentJson.account -= value;
		return 0;
	}else{
		//Else we return the amount of money needed
		return (sentJson.account-value);
	}
}

// Debits a player or out of the game
function debitObligatoire(sum) {

	while (localJson.account < sum) 
		if (localJson.countries.length > 0) localJson.account += proposeVente();
		else return gameOver();
		
	debit(sum);
	return 0;

}

// Credits a player
function credit(value, idPlayer){
	//If "idPlayer" is not specified, we credit our own account
	if(idPlayer == undefined){
		sentJson.account += value;
	}else{
		//Else we put it in the "paid" field of the json
		sentJson.paid[idPlayer].amount = value;
	}
}

// Desherit a country
function desherit(sample) {

	if (sample.victimID == idPlayer) {
		removeItem(localJson[idPlayer].owns, 'country', country);
		console.log("Player "+idPlayer+" got a country robbed");
	}
	
	return 0;
			
}

// Inherit a country
function inherit(country) {

	var victimID;

	for (var i = 0; i < localJson.length; i++) 
		for (var j = 0; j < localJson[i].owns.length; j++)
			if (localJson[i].owns[j].country == country){
				victimID = i;
				break;
			}
	
	localJson[idPlayer].owns.push({
		'country' : country,
		'level'   : 0
	});
	
	var sample = {
		'country' : country,
		'victim'  : victimID,
		'gameID'  : gameID
	};
	
	socket.emit('robbed', sample);
	
	console.log("Player "+idPlayer+" robbed a country from player "+victimID);
	
	return 0;

}



function gameOver() {

	window.alert("Player "+id+" out of the game");
	sentJson.state = -1;
	return -1;
	
}

function buy() {
	// Checks if the player can afford the country
	var idPays = findCountry(posLocal).idPays;
	var diff = debit(countries[idPays].Prix);
	
	// Checks if the country can be bought
	var valid = false;
	for (var i = 0; i < countries.length; i++) {
		if (posLocal == countries[i].Position)
			valid = true;
		if (valid) break;
	}

	// Checks if country isn't already bought
	for(var i = 0; i<localJson.length; i++) {
		for(var j = 0; j<localJson[i].owns.length;j++) {
			if(localJson[i].owns[j].country) {
				var c = getCountryById(localJson[i].owns[j].country); 
				if(c.Position == posLocal) {
					valid = false;
					break;
				}
			}
		}
	}
	
	if ((valid) && (diff == 0)) {
	
		localJson[idPlayer].owns.push({
			'country' : idPays,
			'level'   : 0
		});
		
		sentJson.bought.push({
			'country' : idPays
		});
		
		getMyInfos();
		return 0;
		
	}else {
	
		alert("Vous avez besoin de "+diff+" pour terminer cette action");
		return 1;
		
	}

}

function sell(idCountry) {
	removeItem(localJson[idPlayer].owns, 'country', idCountry);

	sentJson.sold.push({
		'country' : idCountry
	});

	credit(countries[idCountry - 1].Prix); //

	console.log("Player "+idPlayer+" sold country "+idCountry);
	getMyInfos();

}

function loan(idCountry) {

	removeItem(localJson[idPlayer].owns, 'country', idCountry);
	localJson[idPlayer].loans.push({
		'country' : idCountry
	});
	sentJson.loaned.push({
		'country'   : idCountry,
		'recovered' : 0
	});

	credit(countries[idCountry - 1].Prix);
	
	console.log("Player "+idPlayer+" loaned "+idCountry);
	getMyInfos();
	$('#btnLoan').disabled = true;

}

function recover(idCountry) {

	var diff = debit(countries[posLocal].Prix);
	
	if (diff == 0) {
	
		localJson[idPlayer].owns.push({
			'country' : idCountry,
			'level'   : 0
		});
		
		sentJson.loaned.push({
			'country'   : idCountry,
			'recovered' : 1
		});
		
		return 0;
		
	}
	else {
	
		alert("Vous avez besoin de "+diff+" pour terminer cette action");
		return 1;
		
	}

}
