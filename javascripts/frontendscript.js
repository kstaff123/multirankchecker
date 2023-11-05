
const players = {
    kaige: { name: 'legends fate', rank: '', tier: '' },
    elijah: { name: 'arielice04', rank: '', tier: '' },
    grady: { name: 'kahzix only', rank: '', tier: '' },
    justin: { name: 'flowgames', rank: '', tier: '' },
    braydon: { name: 'madmusicmania', rank: '', tier: '' },
    ward: { name: 'BeastBear', rank: '', tier: '' }
};

const rankToImage = {
    'none': 'images/none.png',
    'IRON': 'images/iron.png',
    'BRONZE': 'images/bronze.png',
    'SILVER': 'images/silver.png',
    'GOLD': 'images/gold.png',
    'PLATINUM': 'images/platinum.png',
    'DIAMOND': 'images/diamond.png',
    'MASTER': 'images/master.png',
    'GRANDMASTER': 'images/grandmaster.png',
    'CHALLENGER': 'images/challenger.png'
};

var currentPlayer = "none";
const flashlight = document.getElementById("flashlight");
document.addEventListener("mousemove", (event) => {
    flashlight.style.top = `${event.clientY - 950}px`;
    flashlight.style.left = `${event.clientX - 1470}px`;
});
const names = document.querySelector('nametext');
const icon1 = document.querySelector('#kaige');
const icon2 = document.querySelector('#elijah');
const icon3 = document.querySelector('#grady');
const icon4 = document.querySelector('#justin');
const icon5 = document.querySelector('#braydon');
const icon6 = document.querySelector('#ward');
const tierForUI = document.querySelector('.highlights');
const lpForUI = document.querySelector('.highlights1');
const wrForUi = document.querySelector('.highlights12');
const gamesPlayedForUi = document.querySelector('.highlights11');
const rankIconForUi = document.querySelector('.icon1');
const nameForUi = document.querySelector('.title');

icon1.addEventListener('click', event => {
    getSummonerName('legends fate');
    currentPlayer = "kaige";
    clickDone = true;
    // kaige.style.display = "block";
    // elijah.style.display = "none";
    // grady.style.display = "none";
    // justin.style.display = "none";
    // braydon.style.display = "none";
    // ward.style.display = "none";
})
icon2.addEventListener('click', event => {
    getSummonerName('arielice04');
    currentPlayer = "elijah";
    clickDone = true;
    // kaige.style.display = "none";
    // elijah.style.display = "block";
    // grady.style.display = "none";
    // justin.style.display = "none";
    // braydon.style.display = "none";
    // ward.style.display = "none";
})
icon3.addEventListener('click', event => {
    getSummonerName('kahzix only');
    currentPlayer = "grady";
    clickDone = true;
    // kaige.style.display = "none";
    // elijah.style.display = "none";
    // grady.style.display = "block";
    // justin.style.display = "none";
    // braydon.style.display = "none";
    // ward.style.display = "none";
})
icon4.addEventListener('click', event => {
    getSummonerName('flowgames');
    currentPlayer = "justin";
    clickDone = true;
    // kaige.style.display = "none";
    // elijah.style.display = "none";
    // grady.style.display = "none";
    // justin.style.display = "block";
    // braydon.style.display = "none";
    // ward.style.display = "none";
})
icon5.addEventListener('click', event => {
    getSummonerName('madmusicmania');
    currentPlayer = "braydon";
    clickDone = true;
    // kaige.style.display = "none";
    // elijah.style.display = "none";
    // grady.style.display = "none";
    // justin.style.display = "none";
    // braydon.style.display = "block";
    // ward.style.display = "none";
})
icon6.addEventListener('click', event => {
    getSummonerName('BeastBear');
    currentPlayer = "ward";
    clickDone = true;
    // kaige.style.display = "none";
    // elijah.style.display = "none";
    // grady.style.display = "none";
    // justin.style.display = "none";
    // braydon.style.display = "none";
    // ward.style.display = "block";
})

let encryptedId = null; // Declare and initialize encryptedId
async function getSummonerName(summonerName) {


    try {
        
        const response = await fetch(`https://ancient-retreat-03447-bf8619e939a3.herokuapp.com/api/getSummonerId/${summonerName}`);
        const data = await response.json();
        console.log(data);
        const encryptedId = data.id;
        await getSummonerRank(encryptedId);
    } catch (error) {
        console.error('Error fetching summoner name:', error);
    }

}
console.log(encryptedId);
async function getSummonerRank(encryptedId) {
    try {
        const response = await fetch(`https://ancient-retreat-03447-bf8619e939a3.herokuapp.com/api/getSummonerRank/${encryptedId}`);
        const dataForRank = await response.json();
        console.log(dataForRank);
        console.log(dataForRank.tier);
        nameForUi.innerHTML = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
        nameForUi.style.visibility = "visible";
        if (dataForRank[0]) {
            tierForUI.innerHTML = `${dataForRank[0].tier.charAt(0).toUpperCase()}${dataForRank[0].tier.slice(1).toLowerCase()} ${dataForRank[0].rank}`;
            lpForUI.innerHTML = `${dataForRank[0].leaguePoints} LP`;

            const gamesPlayed = dataForRank[0].wins + dataForRank[0].losses;
            const winRate = Math.round(dataForRank[0].wins / gamesPlayed * 100);
            gamesPlayedForUi.innerHTML = `${gamesPlayed} games played`;
            wrForUi.innerHTML = `${winRate}% winrate`;


            if (!dataForRank[0].tier) {
                rankIconForUi.src = rankToImage.none;
            } else {
                rankIconForUi.src = rankToImage[dataForRank[0].tier];
            }
        } else {
            rankIconForUi.src = rankToImage.none;
            gamesPlayedForUi.innerHTML = "0 games played"
            wrForUi.innerHTML = "0% winrate"
            lpForUI.innerHTML = "NA"
            tierForUI.innerHTML = "Unranked"
        }

    } catch (error) {
        console.error('Error fetching summoner rank:', error);
    }
}


















