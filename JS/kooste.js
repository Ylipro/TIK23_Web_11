function scoreboard() {
    let scoreboard = document.querySelector("tbody")            // Määritetään scoreboard

    for (let i = 0; i < sessionStorage.length; i++) {
        let game = sessionStorage.key(i)                    // Pelin nimi
        let points = sessionStorage.getItem(game)           // Pisteet

        if (game !== "IsThisFirstTime_Log_From_LiveServer") {       // Ei tulosteta IsThisFirstTime_Log_From_LiveServer
            let newRow = document.createElement("tr")

            // Tuolostaa rivit
            newRow.innerHTML = `                        
                <th scope="row">${game}</th>
                <td>${points}</td>
            `
            
            scoreboard.appendChild(newRow)          // Liittää uuden rivin scoreboardiin
        }
    }
}

window.onload = scoreboard()