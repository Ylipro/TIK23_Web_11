let desimYhtGenerated = false
let keskiarvoGenerated = false
let prosenttiGenerated = false
let pintaAlaGenerated = false
let desimVahGenerated = false
let desimKertGenerated = false
let answeredQuestions = []
let maxPoints = 6
let points = 0
let num1, num2, num3, num4, calc

// Tallentaa oikeiden vastausten pisteet sessionStorageen
function savePoints() {
    sessionStorage.setItem("Matikka", points + "/" + maxPoints)
}

// Piilottaa tietyn pelin pelilaudan
function hideOverlay(functName) {
    let overlay = document.querySelector(".overlay")
    let gameboard = document.querySelector("." + functName + "Gameboard")

    overlay.style.display = "none"
    gameboard.style.display = "none"
}

// Oikea vastaus
function correct(functName) {
    let correct = document.querySelector("." + functName + "Correct")
    let svg = document.querySelector("." + functName + "Svg")
    
    svg.style.display = "none"
    correct.style.display = "flex"
    document.querySelector("." + functName + "> .card-body > .card-title").innerHTML = "Oikein"         // Näyttää oikein tekstin
    document.querySelector("." + functName + "> .card-body > .card-title").classList.add("removeAnimation")         // Poistaa tekstin animaation, lisäämällä uuden css luokan
    document.querySelector("." + functName).removeAttribute("onclick")          // Poistaa mahdollisuuden vaihtaa vastausta

    answeredQuestions.push(functName)       // Lisää käytetyn funktion vastattujen funktioiden listaan
    
    // Pisteiden lisäys ja tallennus
    points++
    savePoints()
}

// Väärä vastaus
function wrong(functName) {
    let wrong = document.querySelector("." + functName + "Wrong")
    let svg = document.querySelector("." + functName + "Svg")
    
    svg.style.display = "none"
    wrong.style.display = "flex"
    document.querySelector("." + functName + "> .card-body > .card-title").innerHTML = "Väärin"
    document.querySelector("." + functName + "> .card-body > .card-title").classList.add("removeAnimation")
    document.querySelector("." + functName).removeAttribute("onclick")

    answeredQuestions.push(functName)
    
}

// Tehtävä 1
// Arpoo neljä kokonaislukua 0 - 15 ja kysyy niiden keskiarvoa
function keskiarvo() {
    let functName = "keskiarvo"
    let avg

    // Näyttää pelilaudan
    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".keskiarvoGameboard").style.display = "flex"
    
    // Estää numeroiden uuden generoimisen pelilaudalta poistuttaessa
    if (!keskiarvoGenerated) {

        // Jakojäännöksen ollessa nolla, eli keskiarvon tuloksen ollessa kokonaisluku
            // -> luo numerot ja niistä arrayn (jotta niiden näyttäminen pelilaudalla on helpompaa)
            // -> laskee keskiarvon
        do {
            num1 = Math.floor(Math.random() * 16)
            num2 = Math.floor(Math.random() * 16)
            num3 = Math.floor(Math.random() * 16)
            num4 = Math.floor(Math.random() * 16)

            numbers = [num1, num2, num3, num4]

            let sum = num1 + num2 + num3 + num4
            avg = sum/numbers.length

            keskiarvoGenerated = true
        } while (avg % 1 !== 0)


        let buttons = document.querySelectorAll(".keskiarvo-btn")       // Määrittää buttonit
        let btnIndex = Math.floor(Math.random() * buttons.length)       // Generoi indeksin, jotta oikea vastaus ei ole aina samassa buttonissa

        // Array käytetyille numeroille
        let usedNumbers = []

        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = Math.floor(Math.random() * 16)

            // Estää saman numeron näyttämisen buttoneissa
            while (rndNum === avg || usedNumbers.includes(rndNum)) {
                rndNum = Math.floor(Math.random() * 16)
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)            // Puskee "käytetyt" numerot arrayhin
        }

        // Näyttää oikean tuloksen random buttonissa
        buttons[btnIndex].innerHTML = avg

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === avg.toString()) {      // .innerHTML on stringi, joten avg pitää muuttaa stringiksi
                    correct(functName)                                  // -> muuten koodi ei tunnista oikeaa vastausta
                } else {
                    wrong(functName)
                }

                hideOverlay(functName)      // Piilottaa kysesisen tehtävän pelilaudan
                returnToMain()          // Kutsuu funktiota, joka tarkistaa, onko kaikkiin kysymyksiin vastattu
            })
        }
        
        // Näyttää tehtävänannon
        document.querySelector(".keskiarvoGameboard-content > .phrase").innerHTML = "Laske lukujen keskiarvo"
        document.querySelector(".keskiarvoGameboard-content > .calc").innerHTML = numbers
    }
}

// Tehtävä 2
// Arpoo kaksi desimaalilukua väliltä 1-10 ja 0-1
// Kysyy niiden summaa
function desimYht() {
    let functName = "desimYht"

    // Näyttää pelilaudan
    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".desimYhtGameboard").style.display = "flex"

    // Estää numeroiden uuden generoimisen pelilaudalta poistuttaessa
    if (!desimYhtGenerated) {

        // .toFixed muuttaa luvut stringeiksi ja parseFloat taas numeroiksi
        num1 = parseFloat(((Math.random() * 10) + 1).toFixed(2))
        num2 = parseFloat((Math.random()).toFixed(2))
        calc = parseFloat((num1 + num2).toFixed(2))

        desimYhtGenerated = true
        
        let buttons = document.querySelectorAll(".desimYht-btn")        // Määrittää buttonit
        let btnIndex = Math.floor(Math.random() * buttons.length)       // Generoi indeksin, jotta oikea vastaus ei ole aina samassa buttonissa
        
        // Array käytetyille numeroille
        let usedNumbers = []

        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = parseFloat(((Math.random() * 10) + 1).toFixed(2))

            // Estää saman numeron näyttämisen buttoneissa
            while (rndNum === calc || usedNumbers.includes(rndNum)) {
                rndNum = parseFloat(((Math.random() * 10) + 1).toFixed(2))
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)
        }

        // Näyttää oikean tuloksen yhdessä buttonissa
        buttons[btnIndex].innerHTML = calc

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === calc.toFixed(2)) {
                    correct(functName)
                } else {
                    wrong(functName)
                }

                hideOverlay(functName)      // Piilottaa kysesisen tehtävän pelilaudan
                returnToMain()          // Kutsuu funktiota, joka tarkistaa, onko kaikkiin kysymyksiin vastattu
            })
        }

        // Näyttää tehtävänannon
        document.querySelector(".desimYhtGameboard-content > .phrase").innerHTML = "Valitse oikea vastaus"
        document.querySelector(".desimYhtGameboard-content > .calc").innerHTML = num1 + " + " + num2 + " = ?"
    }
}

// Tehtävä 3
// Arpoo numeron 100-1000
// Kysyy paljonko yksi prosentti on luvusta
function prosentti() {
    functName = "prosentti"

    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".prosenttiGameboard").style.display = "flex"

    if (!prosenttiGenerated) {
        let percentage = 1
        num1 = (Math.floor(Math.random() * 10) + 1) * 100
        let answer = num1 / 100 * percentage

        let buttons = document.querySelectorAll(".prosentti-btn")
        let btnIndex = Math.floor(Math.random() * buttons.length)

        prosenttiGenerated = true

        // Array käytetyille numeroille
        let usedNumbers = []
        
        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = Math.floor(Math.random() * (Math.floor(Math.random() * 10)) * 100)

            // Random numeron ollessa suurempi, kuin num1 generoidaan uusi numero
            while (rndNum > num1) {
                rndNum = Math.floor(Math.random() * (Math.floor(Math.random() * 10)) * 100)
            }

            // Estää saman numeron näyttämisen buttonissa
            while (rndNum === answer || usedNumbers.includes(rndNum)) {
                rndNum = Math.floor(Math.random() * 15)
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)
        }

        // Näyttää oikean tuloksen random buttonissa
        buttons[btnIndex].innerHTML = answer

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === answer.toString()) {
                    correct(functName)
                } else {
                    wrong(functName)
                }

                hideOverlay(functName)
                returnToMain()
            })
        }

        document.querySelector(".prosenttiGameboard-content > .phrase").innerHTML = "Kuinka paljon on " + percentage + " % luvusta " + num1
    }
}

// Tehtävä 4
// Arpoo kaksi desimaalinumeroa 1-10 ja 0-1
// Kysyy niiden erotusta
function desimVah() {
    functName = "desimVah"

    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".desimVahGameboard").style.display = "flex"

    if (!desimVahGenerated) {

        num1 = parseFloat(((Math.random() * 10) + 1).toFixed(2))
        num2 = parseFloat(Math.random().toFixed(2))

        // Varmistaa ensimmäisen numeron olevean isompi
        if (num1 < num2) {
            num1 = parseFloat(((Math.random() * 10) + 1).toFixed(2))
        }

        let subtraction = (num1 - num2).toFixed(2)

        // Buttonit
        let buttons = document.querySelectorAll(".desimVah-btn")
        let btnIndex = Math.floor(Math.random() * buttons.length)

        desimVahGenerated = true

        // Array käytetyille numeroille
        let usedNumbers = []
        
        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = (Math.random() * 10).toFixed(2)

            // Estää saman numeron näyttämisen buttonissa
            while (rndNum === subtraction || usedNumbers.includes(rndNum)) {
                rndNum = (Math.random() * 10).toFixed(2)
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)
        }

        // Näyttää oikean tuloksen random buttonissa
        buttons[btnIndex].innerHTML = subtraction

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === subtraction.toString()) {
                    correct(functName)
                } else {
                    wrong(functName)
                }

                hideOverlay(functName)
                returnToMain()
            })
        }

        document.querySelector(".desimVahGameboard-content > .phrase").innerHTML = "Valitse oikea vastaus"
        document.querySelector(".desimVahGameboard-content > .calc").innerHTML = num1 + " - " + num2 + " = ?"
    }
}

// Tehtävä 5
// Arpoo suorakulmiolle leveyden ja korkeuden 1-10
// Kysyy pinta-alaa
function pintaAla() {
    functName = "pintaAla"

    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".pintaAlaGameboard").style.display = "flex"

    if (!pintaAlaGenerated) {

        let height = Math.floor(Math.random() * 10) + 1
        let width = Math.floor(Math.random() * 10) + 1
        let surfaceArea = height * width

        let buttons = document.querySelectorAll(".pintaAla-btn")
        let btnIndex = Math.floor(Math.random() * buttons.length)

        pintaAlaGenerated = true

        // Array käytetyille numeroille
        let usedNumbers = []
        
        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = Math.floor(Math.random() * 90) + 1

            // Estää saman numeron näyttämisen buttonissa
            while (rndNum === surfaceArea || usedNumbers.includes(rndNum)) {
                rndNum = Math.floor(Math.random() * 90) + 1
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)
        }

        // Näyttää oikean tuloksen random buttonissa
        buttons[btnIndex].innerHTML = surfaceArea

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === surfaceArea.toString()) {
                    correct(functName)
                } else {
                    wrong(functName)
                }

                hideOverlay(functName)
                returnToMain()
            })
        }

        // Näyttää eri kuvan leveyden ja korkeuden vaihtuessa
        if (width > height) {
            document.querySelector(".rectangle1").style.display = "flex"
        } else {
            document.querySelector(".rectangle2").style.display = "flex"
        }
        
        document.querySelector(".height").innerHTML = height
        document.querySelector(".width").innerHTML = width
        document.querySelector(".pintaAlaGameboard-content > .phrase").innerHTML = "Laske kuvion pinta-ala"
    }
}

// Tehtävä 6
// Arpoo kaksi numeroa 1-10 ja 0-1
// Kysyy niiden kertolaskua
function desimKert() {
    functName = "desimKert"

    document.querySelector(".overlay").style.display = "block"
    document.querySelector(".desimKertGameboard").style.display = "flex"

    if (!desimKertGenerated) {

        num1 = Math.floor(Math.random() * 10) + 1
        num2 = Math.random().toFixed(2)
        let multiplication = (num1 * num2).toFixed(2)

        let buttons = document.querySelectorAll(".desimKert-btn")
        let btnIndex = Math.floor(Math.random() * buttons.length)

        desimKertGenerated = true

        // Array käytetyille numeroille
        let usedNumbers = []
        
        // Näytetään buttoneissa random numerot
        for (let i = 0; i < buttons.length; i++) {
            let rndNum = (Math.random() * 10).toFixed(2)

            // Estää saman numeron näyttämisen buttonissa
            while (rndNum === multiplication || usedNumbers.includes(rndNum)) {
                rndNum = (Math.random() * 10).toFixed(2)
            }

            buttons[i].innerHTML = rndNum
            usedNumbers.push(rndNum)
        }

        // Näyttää oikean tuloksen random buttonissa
        buttons[btnIndex].innerHTML = multiplication

        // Lisätään buttoneille event listenerit
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (buttons[i].innerHTML === multiplication.toString()) {
                    correct(functName)
                } else {
                    wrong(functName)
                }
                hideOverlay(functName)
                returnToMain()
            })
        }

        document.querySelector(".desimKertGameboard-content > .phrase").innerHTML = "Valitse oikea vastaus"
        document.querySelector(".desimKertGameboard-content > .calc").innerHTML = num1 + " * " + num2 + " = ?"
    }
}

// Kun kaikkiin tehtäviin on vastattu näyttää pisteet ja reitin etusivulle
function returnToMain() {
    functName = "returnToMain"

    if (answeredQuestions.length === 6) {
        document.querySelector(".overlay").style.display = "block"
        document.querySelector(".returnToMainGameboard").style.display = "flex"
        document.querySelector(".points").innerHTML = "Pisteesi: " + points + "/6"
    }
}