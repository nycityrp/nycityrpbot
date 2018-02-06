const clearChannel = require('./clearChannel.js');
const newPlayer = require('./newPlayer.js');
const metiers = require('./jobs.js');
const commands = require('./commands.js');
const paySalary = require('./paySalary.js');
const save = require('./save.js');
const data = require('./data.js');
const account = require('./account.js');
const daySince1970 = require('./daySince1970.js');

module.exports = {
    analyseMessage: function (message) {
        var entree = message.content.toLowerCase().split(" ");
		for (var i =0;i<entree.length;i++) { entree[i] = entree[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "")}
        var toReturn ="";
        if (entree[0].charAt(0)=="$") {
            console.log(daySince1970.time()+" [MSG] Message reçu de " + message.author.username);
            console.log(daySince1970.time()+" [MSG] Message : "+message.content);
            paySalary.paySalary(message.author.id); //paye le joueur
            switch (entree[0]) {
                case "$help":
                case "$bot":
                case "$aide": if (entree.length==1) { toReturn = renvoyer([1,2,3,9,12,16,19,21],toReturn); } else { toReturn = renvoyer([0,1], toReturn); } break;
                case "$jouer":
                case "$joue":
                case "$play":
                case "$join": if (entree.length==1) { toReturn = newPlayer.newPlayer(message); } else { toReturn = renvoyer([0,2], toReturn); } break;
                case "$banque": //banque
                case "$bank":
                    switch (entree[1]) {
                        case "help": if (entree.length==2) { toReturn = renvoyer([4,5,6,7,8], toReturn); } else { toReturn = renvoyer([0,3], toReturn); } break;
                        case "compte":
                            switch (entree[2]) {
                                case "ouvrir":
                                case "creer":
                                case "nouveau": if (entree.length==3) { account.open(message.author.id); } else { toReturn = renvoyer([0,3,4],toReturn); } break;
                                case "cloturer":
                                case "fermer":
                                case "suprimmer": if (entree.length==3) { account.close(message.author.id); } else { toReturn = renvoyer([0,3,5],toReturn); } break;
                                default: toReturn = renvoyer([0, 3, 4, 5], toReturn);
                            }
                        case "déposer":
                        case "ajouter": if (entree.length==3) { /* TODO Déposer banque*/ toReturn = prochainement(); } else { toReturn = renvoyer([0,3,6], toReturn); } break;
                        case "retrait":
                        case "retirer": if (entree.length==3) { /* TODO Retirer banque*/ toReturn = prochainement(); } else { toReturn = renvoyer([0,3,7], toReturn); } break;
                        default: toReturn = renvoyer([0,3], toReturn);
                    } break;
                case "$magasin": //magasin
                case "$shop":
                case "$boutique":
                    switch (entree[1]) {
                        case "help": if (entree.length==2) { toReturn = renvoyer([10,11], toReturn); } else { toReturn = renvoyer([0,9], toReturn); } break;
                        case "stock": if (entree.length==2) { /* TODO Voir les stocks */ toReturn = prochainement(); } else { toReturn = renvoyer([0,9,10], toReturn); } break;
                        case "acheter": if (entree.length==4) { /* TODO Acheter magasin */ toReturn = prochainement(); } else { toReturn = renvoyer([0,9,11], toReturn); } break;
                            default: toReturn = renvoyer([0,9], toReturn);
                    } break;
                case "$metier": //métier
                case "$job":
                    switch (entree[1]) {
                        case "help": if (entree.length==2) { toReturn = renvoyer([13,14,15], toReturn); } else { toReturn = renvoyer([0,12], toReturn); } break;
                        case "liste": if (entree.length==2) { /* TODO Liste metiers */ toReturn = prochainement(); } else { toReturn = renvoyer([0,12,13], toReturn); } break;
                        case "postuler": if (entree.length==3) { if(metiers.metiers.includes(entree[2].normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) { /* TODO Joindre metier*/ toReturn = prochainement(); } else { toReturn = renvoyer([0,12,13], toReturn); } } else { toReturn = renvoyer([0,12,14], toReturn); } break;
                        case "quitter": if (entree.length==3) { /* TODO Quitter metier */ toReturn = prochainement(); } else { toReturn = renvoyer([0,12,15], toReturn); } break;
                        default: toReturn = renvoyer([0,12], toReturn);
                    } break;
                case "$inventaire": //inventaire
                    switch (entree[1]) {
                        case "help": if (entree.length==2) { toReturn = renvoyer([17,18], toReturn); } else { toReturn = renvoyer([0,16], toReturn); } break;
                        case "ouvrir": if (entree.length==2) { /* TODO Ouvrir inventaire */ toReturn = prochainement(); } else { toReturn = renvoyer([0,16,17], toReturn); } break;
                        default: toReturn = renvoyer([0,16], toReturn);
                    } break;
                case "$payer":
                    if (entree.length==3) {
                        if (entree[1]=="help") {
                            toReturn = renvoyer([20], toReturn);
                        } else { /* TODO Payer joueur */ toReturn = prochainement(); }
                    } else { toReturn = renvoyer([0,19], toReturn); } break;
                case "$entreprise": //entreprise
                case "$societe":
                case "$boite":
                case "$firme":
                    switch (entree[1]) {
                        case "help": if (entree.length==2) { toReturn = renvoyer([22,23,24,25], toReturn); } else { toReturn = renvoyer([0,21], toReturn); } break;
                        case "liste": if (entree.length==2) { /* TODO Liste entreprises */ toReturn = prochainement(); } else { toReturn = renvoyer([0,21,22], toReturn); } break;
                        case "postuler": if (entree.length==3) { /* TODO Postuler entreprise */ toReturn = prochainement(); } else { toReturn = renvoyer([0,21,23], toReturn); } break;
                        case "virer": if (entree.length==4) { /* TODO Virer entreprise */ toReturn = prochainement(); } else { toReturn = renvoyer([0,21,24], toReturn); } break;
                        case "employes": if (entree.length==3) { /* TODO Liste employés */ toReturn = prochainement(); } else { toReturn = renvoyer([0,21,25], toReturn); } break;
                        default: toReturn = renvoyer([0,21], toReturn);
                    } break;
                case "$clear": if (entree.length==1) { toReturn = "**[ATTENTION] Cette commande est expérimentale et rique de ne pas fonctionner. A utiliser avec prudence donc.**"; clearChannel.clearChannel(message); } else { toReturn = renvoyer([0], toReturn); } break;
                case "$debug":
                case "$data": if (entree.length==1) { toReturn = "**[ATTENTION] Cette commande est expérimentale et rique de ne pas fonctionner. A utiliser avec prudence donc.**\n" + JSON.stringify(data.data); } else { toReturn = renvoyer([0], toReturn); } break;
                case "$all":
                case "$commands":
                case "$commands": if (entree.length==1) { all(message); } else { toReturn = renvoyer([0], toReturn); } break;
                default: toReturn = commands.commands[0];
            }
            paySalary.paySalary(message.author.id); //au cas ou l'utilisateur vient de se créer un compte
            save.save(data.data);
        }
        return toReturn;
    }
}

function prochainement(){ return "Cette fonction sera ajoutée prochainement"; }

function all(message) {
    var toReturn ="";
    toReturn = renvoyer([1,2,3,4,5,6,7,8,9,10,11,12], toReturn);
    message.reply(toReturn);
    toReturn = renvoyer([13,14,15,16,17,18,19,20,21,22,23,24,25], toReturn);
    message.reply(toReturn);
    toReturn = renvoyer([26,27,28,29,30], toReturn);
    message.reply(toReturn);
    toReturn = "";
}

function renvoyer (tab, toReturn) {
    toReturn = "\n" + toReturn;
    for(var i=0;i<tab.length-1;i++) {
        toReturn = toReturn+ commands.commands[tab[i]] + "\n";
    }
    toReturn = toReturn + commands.commands[tab[tab.length-1]];
    return toReturn;
}
