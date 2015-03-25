// States
var S_DEAD   = -1;
var S_ALIVE  = 0;
var S_JAILED = 1;
var S_PUBLIC = 2;
var S_NO_INT = 3;
var S_NO_WAT = 4;
var S_NO_ELE = 5;

// Upgrades
var UP_WAT = 1;
var UP_ELE = 2;
var UP_INT = 3;
var UP_NUC = 4;

// Constants
var SALARY    = 0.1;
var TAXES     = 0.05;
var CARDS     = 20; // King Burgonde not implemented (id 21)

// Variables
var jail_time   = 0;
var debuff_time = -1;
var buff_time   = -1;
var waiting     = false;
var nbTotalPlayer;

var GameID = 1;
var idGlobal = Math.floor(Math.random() * 4) + 1;
var idPlayer;
var sentJson;

var owns   = [{}];
var backup = [{}];

var localJson = [{
		"owns" : owns,
		"cards" : [{}],
		"loans" : [{}]
}, {
		"owns" : [{}],
		"cards" : [{}],
		"loans" : [{}]
}, {
		"owns" : [{}],
		"cards" : [{}],
		"loans" : [{}]
}, {
		"owns" : [{}],
		"cards" : [{}],
		"loans" : [{}]
}, {
		"owns" : [{}],
		"cards" : [{}],
		"loans" : [{}]
}, {
		"owns" : [{}],
		"cards" : [{}],
		"loans" : [{}]
}];

// console.log(idGlobal);
var data = {
	'RoomID'  : GameID,
	'idGlobal' : idGlobal
};

var nbCase = 36;
var countries, cards;