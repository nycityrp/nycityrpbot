const data = require('./data.js');
const save = require('./save.js');
var d = new Date;

module.exports = {
    paySalary : function (id) {
        var cpt = trouveJoueur(id);
        if (data.data.joueurs[cpt].dateARecuSalaire-daySince1970<=0) {
            var paye = nombreAleatoire(data.data.metiers[trouveMetier(data.data.joueurs[cpt].metier)].salaireMin, data.data.metiers[trouveMetier(data.data.joueurs[cpt].metier)].salaireMax);
            data.data.joueurs[cpt].banque = data.data.joueurs[cpt].banque + paye;
            console.log("[BANQUE] Le joueur "+id+" s'est vu versé la somme de "+paye+"€.");
        }
        save.save();
    }
}

function daySince1970() {
    return Math.floor(Math.floor(Math.floor(Math.floor(d.getTime()/1000)/60)/60)/24); //Jours depuis le 10/01/1970
}

function trouveJoueur(id) {
    var cpt = 0;
    while(data.data.joueurs[cpt].id!=id) {
        cpt++;
    }
    cpt--;
    return cpt;
}

function trouveMetier(metier) {
    var cpt = 0;
    while(data.data.metiers[cpt].fonction!=metier) {
        cpt++;
    }
    cpt--;
    return cpt;
}

function nombreAleatoire(min, max) {
    return (Math.round(Math.random()*(max-min))+min);
}