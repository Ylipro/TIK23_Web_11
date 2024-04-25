// Näytetään ensimmäinen kysymys laatikko
document.getElementsByClassName('container')[0].style.display = "block";
// Next funktion määritys. Kun painaa seuraavaa kysymystä vanha laatikko menee piiloon ja uusi tulee näkyviin.
function next(id) {
    document.getElementsByClassName('container')[id-1].style.display = "none";
    document.getElementsByClassName('container')[id].style.display = "block";
}
//Saadaan lopputulos
function result() {
    var score = 0;
    if (document.getElementById('correct1').checked) {
        score++;
    }
    if (document.getElementById('correct2').checked) {
        score++;
    }
    if (document.getElementById('correct3').checked) {
        score++;
    }
    if (document.getElementById('correct4').checked) {
        score++;
    }
    if (document.getElementById('correct5').checked) {
        score++;
    }
    if (document.getElementById('correct6').checked) {
        score++;
    }
    if (document.getElementById('correct7').checked) {
        score++;
    }
    if (document.getElementById('correct8').checked) {
        score++;
    }
    if (document.getElementById('correct9').checked) {
        score++;
    }
    if (document.getElementById('correct10').checked) {
        score++;
    }
    document.getElementById("pisteet").innerHTML = "Sait yhteensä "+score+"/10 pistettä!";
}