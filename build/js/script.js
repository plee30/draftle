import { WORDS } from './words.js';

const NUMBER_OF_GUESSES = 10;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let wrongGuesses = [];
let nextLetter = 0;
let rightGuess = WORDS[Math.floor(Math.random() * WORDS.length)]
let searchFlag = 0;
let alertFlag = 0;

console.log(rightGuess)

function initBoard() {
    let board = document.getElementById("game-board");
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "champion-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}

initBoard()

// Delete and Enter key functionality
document.addEventListener("keydown", (e) => {
    let pressedKey = String(e.key)
    // If backspace is pressed, call deleteGuess function
    if (pressedKey === "Backspace" && nextLetter !== 0 && searchFlag == 0) {
        deleteGuess()
        return
    }
    // If enter is pressed, call checkGuess function
    if (pressedKey === "Enter" && alertFlag === 0) {
        checkGuess()
        return
    }
})

// Input clicked champion into guess
function insertChampion (clickedChampion) {
    // If 5 champions have already been selected, return
    if (nextLetter === 5) {
        return
    }
    // If the champion clicked has already been guessed in this round, return
    if (currentGuess.includes(clickedChampion.name)) {
        return
    }
    // If the champion clicked has already been guessed incorrectly, return
    if (wrongGuesses.includes(clickedChampion.name)) {
        return
    }
    shadeKeyBoard(clickedChampion.name, "gray");
    // Select the current box to place guess into
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter]
    // Create image of champion to be inputted
    let image = document.createElement("img")
    image.src = clickedChampion.imgUrl
    image.width = 50
    image.height = 50
    // Add image to the current box
    box.appendChild(image)
    box.classList.add("filled-box")
    // Add champion name to guess list, and increment nextLetter to move onto the next box
    currentGuess.push(clickedChampion.name)
    nextLetter += 1
}

function deleteGuess () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    shadeKeyBoard(currentGuess[currentGuess.length - 1], "none");
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    if (currentGuess.length != 5) {
        alertFlag = 1;
        alert("Select 5 champions!");
        alertFlag = 0;
        return;
    }

    for (let i = 0; i < 5; i++) {
        let boxColor = '';
        let box = row.children[i];
        let champion = currentGuess[i];
        
        let championPosition = rightGuess.indexOf(currentGuess[i]);
        // is champion in the correct guess
        if (championPosition === -1) {
            wrongGuesses.push(currentGuess[i]);
            boxColor = "gray";
        } else {
            // now, champion is definitely in word
            // if champion index and right guess index are the same
            // champion is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                boxColor = "green";
            } else {
                // shade box yellow
                boxColor = "yellow";
            }
        }

        //shade box
        box.style.backgroundColor = boxColor;
        
        shadeKeyBoard(champion, boxColor);
    }

    if (currentGuess.every((v, i) => v === rightGuess[i])) {
        alert("You guessed right! Game over! Refresh the page to play again!");
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!");
            alert(`The right word was: "${rightGuess}"`);
        }
    }
}

function shadeKeyBoard(champion, boxColor) {
    let image = document.getElementById(champion);
    if (boxColor == "green") {
        image.classList.remove("yellow-box");
        image.classList.remove("champion-image-margin");
        image.classList.add("green-box");
    }
    if (boxColor == "yellow") {
        image.classList.remove("green-box");
        image.classList.remove("champion-image-margin");
        image.classList.add("yellow-box");
    }
    if (boxColor == "gray") {
        image.classList.add("gray-box");
    }
    if (boxColor == "none") {
        image.classList.remove("green-box");
        image.classList.remove("yellow-box");
        image.classList.remove("gray-box");
        image.classList.add("champion-image-margin");
    }
}

var champions = [
    { name: 'Aatrox', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Aatrox.png' },
    { name: 'Ahri', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ahri.png' },
    { name: 'Akali', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Akali.png' },
    { name: 'Akshan', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Akshan.png' },
    { name: 'Alistar', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Alistar.png' },
    { name: 'Amumu', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Amumu.png' },
    { name: 'Anivia', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Anivia.png' },
    { name: 'Annie', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Annie.png' },
    { name: 'Aphelios', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Aphelios.png' },
    { name: 'Ashe', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ashe.png' },
    { name: 'Aurelion Sol', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/AurelionSol.png' },
    { name: 'Azir', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Azir.png' },
    { name: 'Bard', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Bard.png' },
    { name: 'Blitzcrank', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Blitzcrank.png' },
    { name: 'Brand', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Brand.png' },
    { name: 'Braum', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Braum.png' },
    { name: 'Caitlyn', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Caitlyn.png' },
    { name: 'Camille', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Camille.png' },
    { name: 'Cassiopeia', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Cassiopeia.png' },
    { name: "Cho'Gath", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Chogath.png' },
    { name: 'Corki', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Corki.png' },
    { name: 'Darius', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Darius.png' },
    { name: 'Diana', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Diana.png' },
    { name: 'Draven', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Draven.png' },
    { name: 'Dr. Mundo', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/DrMundo.png' },
    { name: 'Ekko', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ekko.png' },
    { name: 'Elise', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Elise.png' },
    { name: 'Evelynn', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Evelynn.png' },
    { name: 'Ezreal', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ezreal.png' },
    { name: 'Fiddlesticks', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Fiddlesticks.png' },
    { name: 'Fiora', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Fiora.png' },
    { name: 'Fizz', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Fizz.png' },
    { name: 'Galio', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Galio.png' },
    { name: 'Gangplank', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Gangplank.png' },
    { name: 'Garen', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Garen.png' },
    { name: 'Gnar', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Gnar.png' },
    { name: 'Gragas', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Gragas.png' },
    { name: 'Graves', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Graves.png' },
    { name: 'Gwen', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Gwen.png' },
    { name: 'Hecarim', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Hecarim.png' },
    { name: 'Heimerdinger', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Heimerdinger.png' },
    { name: 'Illaoi', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Illaoi.png' },
    { name: 'Irelia', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Irelia.png' },
    { name: 'Ivern', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ivern.png' },
    { name: 'Janna', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Janna.png' },
    { name: 'Jarvan IV', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/JarvanIV.png' },
    { name: 'Jax', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Jax.png' },
    { name: 'Jayce', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Jayce.png' },
    { name: 'Jhin', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Jhin.png' },
    { name: 'Jinx', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Jinx.png' },
    { name: "Kai'Sa", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kaisa.png' },
    { name: 'Kalista', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kalista.png' },
    { name: 'Karma', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Karma.png' },
    { name: 'Karthus', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Karthus.png' },
    { name: 'Kassadin', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kassadin.png' },
    { name: 'Katarina', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Katarina.png' },
    { name: 'Kayle', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kayle.png' },
    { name: 'Kayn', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kayn.png' },
    { name: 'Kennen', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kennen.png' },
    { name: "Kha'Zix", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Khazix.png' },
    { name: 'Kindred', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kindred.png' },
    { name: 'Kled', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Kled.png' },
    { name: "Kog'Maw", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/KogMaw.png' },
    { name: 'LeBlanc', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Leblanc.png' },
    { name: 'Lee Sin', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/LeeSin.png' },
    { name: 'Leona', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Leona.png' },
    { name: 'Lillia', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Lillia.png' },
    { name: 'Lissandra', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Lissandra.png' },
    { name: 'Lucian', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Lucian.png' },
    { name: 'Lulu', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Lulu.png' },
    { name: 'Lux', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Lux.png' },
    { name: 'Malphite', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Malphite.png' },
    { name: 'Malzahar', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Malzahar.png' },
    { name: 'Maokai', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Maokai.png' },
    { name: 'Master Yi', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/MasterYi.png' },
    { name: 'Miss Fortune', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/MissFortune.png' },
    { name: 'Mordekaiser', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Mordekaiser.png' },
    { name: 'Morgana', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Morgana.png' },
    { name: 'Nami', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nami.png' },
    { name: 'Nasus', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nasus.png' },
    { name: 'Nautilus', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nautilus.png' },
    { name: 'Neeko', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Neeko.png' },
    { name: 'Nidalee', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nidalee.png' },
    { name: 'Nocturne', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nocturne.png' },
    { name: 'Nunu & Willump', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Nunu.png' },
    { name: 'Olaf', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Olaf.png' },
    { name: 'Orianna', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Orianna.png' },
    { name: 'Ornn', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ornn.png' },
    { name: 'Pantheon', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Pantheon.png' },
    { name: 'Poppy', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Poppy.png' },
    { name: 'Pyke', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Pyke.png' },
    { name: 'Qiyana', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Qiyana.png' },
    { name: 'Quinn', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Quinn.png' },
    { name: 'Rakan', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Rakan.png' },
    { name: 'Rammus', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Rammus.png' },
    { name: "Rek'Sai", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/RekSai.png' },
    { name: 'Rell', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Rell.png' },
    { name: 'Renata Glasc', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Renata.png' },
    { name: 'Renekton', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Renekton.png' },
    { name: 'Rengar', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Rengar.png' },
    { name: 'Riven', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Riven.png' },
    { name: 'Rumble', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Rumble.png' },
    { name: 'Ryze', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ryze.png' },
    { name: 'Samira', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Samira.png' },
    { name: 'Sejuani', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sejuani.png' },
    { name: 'Senna', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Senna.png' },
    { name: 'Seraphine', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Seraphine.png' },
    { name: 'Sett', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sett.png' },
    { name: 'Shaco', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Shaco.png' },
    { name: 'Shen', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Shen.png' },
    { name: 'Shyvana', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Shyvana.png' },
    { name: 'Singed', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Singed.png' },
    { name: 'Sion', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sion.png' },
    { name: 'Sivir', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sivir.png' },
    { name: 'Skarner', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Skarner.png' },
    { name: 'Sona', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sona.png' },
    { name: 'Soraka', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Soraka.png' },
    { name: 'Swain', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Swain.png' },
    { name: 'Sylas', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Sylas.png' },
    { name: 'Syndra', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Syndra.png' },
    { name: 'Tahm Kench', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/TahmKench.png' },
    { name: 'Taliyah', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Taliyah.png' },
    { name: 'Talon', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Talon.png' },
    { name: 'Taric', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Taric.png' },
    { name: 'Teemo', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Teemo.png' },
    { name: 'Thresh', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Thresh.png' },
    { name: 'Tristana', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Tristana.png' },
    { name: 'Trundle', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Trundle.png' },
    { name: 'Tryndamere', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Tryndamere.png' },
    { name: 'Twisted Fate', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/TwistedFate.png' },
    { name: 'Twitch', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Twitch.png' },
    { name: 'Udyr', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Udyr.png' },
    { name: 'Urgot', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Urgot.png' },
    { name: 'Varus', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Varus.png' },
    { name: 'Vayne', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Vayne.png' },
    { name: 'Veigar', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Veigar.png' },
    { name: "Vel'Koz", imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Velkoz.png' },
    { name: 'Vex', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Vex.png' },
    { name: 'Vi', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Vi.png' },
    { name: 'Viego', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Viego.png' },
    { name: 'Viktor', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Viktor.png' },
    { name: 'Vladimir', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Vladimir.png' },
    { name: 'Volibear', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Volibear.png' },
    { name: 'Warwick', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Warwick.png' },
    { name: 'Wukong', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/MonkeyKing.png' },
    { name: 'Xayah', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Xayah.png' },
    { name: 'Xerath', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Xerath.png' },
    { name: 'Xin Zhao', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/XinZhao.png' },
    { name: 'Yasuo', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Yasuo.png' },
    { name: 'Yone', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Yone.png' },
    { name: 'Yorick', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Yorick.png' },
    { name: 'Yuumi', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Yuumi.png' },
    { name: 'Zac', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zac.png' },
    { name: 'Zed', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zed.png' },
    { name: 'Zeri', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zeri.png' },
    { name: 'Ziggs', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Ziggs.png' },
    { name: 'Zilean', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zilean.png' },
    { name: 'Zoe', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zoe.png' },
    { name: 'Zyra', imgUrl: 'https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/Zyra.png' },
]

function initChampionList() {
    let listOfChampions = document.getElementById("champion-list");

    for (var i = 0; i < champions.length; i++) {

        const img = new Image(120, 120);

        const imagediv = document.createElement("div"); 
        imagediv.classList.add("image-div");
        var c = document.createElement("FIGCAPTION");
        var t = document.createTextNode(champions[i].name);
        c.appendChild(t);

        img.id = champions[i].name;
        img.src = champions[i].imgUrl;
        img.classList.add("champion-image-margin");
        img.classList.add("champion");
        let champ = champions[i];
    
        img.addEventListener("click", function() {
            insertChampion(champ);
        })

        listOfChampions.appendChild(imagediv);
        imagediv.appendChild(img);
        imagediv.appendChild(c);
    }
}
initChampionList()

document.getElementById("myInput").addEventListener("focus", searchFlagOn);
document.getElementById("myInput").addEventListener("focusout", searchFlagOff);

function searchFlagOn() {
    searchFlag = 1;
}

function searchFlagOff() {
    searchFlag = 0;
}
