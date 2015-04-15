var socketSalon = io('http://localhost:8080/salon');

function createGame(){
	socketSalon.emit('whoami', $('#pseudoTitle').text());
	var nbplayers = $('#nbPlayers').val();
	socketSalon.emit('createGame', nbplayers);
}

function salon(){
	var pseudo = $('#pseudoTitle').text();
	socketSalon.emit("games");
	// lister les parties
	socketSalon.on('listGames', function(list){
		//$('#saloon').append("<table><tr>");
		//$('#saloon').append("<th>id partie</th><th>nombre de joueurs</th><th>créateur</th><th>Action</th></tr>");
		
		for (var i=0; i<list.length; i++){
			/*$('#saloon').append("<tr>");
			$('#saloon').append("<td>" + list[i].idPartie + "</td>");
			$('#saloon').append("<td>" + list[i].c + " / " + list[i].nbJoueurs + "</td>");
			$('#saloon').append("<td>" + list[i].Pseudo + "</td>");
			$('#saloon').append('<td></td>');
			$('#saloon').append("</tr>");*/
			$('#idRoom').append('<span class="content">'+list[i].idPartie+'</span>');
			$('#nbJoueurs').append('<span class="content">'+ list[i].c + " / " + list[i].nbJoueurs +'</span>');
			$('#createur').append('<span class="content">'+ list[i].Pseudo +'</span>');
			$('#actions').append('<span class="content"><input type="button" name="joinGame" value="Rejoindre" onclick="joinGame(\''+pseudo+'\','+ list[i].idPartie +')" /></span>');
		}
	});
}

function joinGame(pseudo , idPartie){
	socketSalon.emit('whoami', pseudo);
	socketSalon.emit("join", idPartie);
	socketSalon.on('myid', function(idGlobal){
		localStorage.setItem("idGlobal", idGlobal);
		localStorage.setItem("idPartie", idPartie);
		$(location).attr('href',"/game.html");
	});

}