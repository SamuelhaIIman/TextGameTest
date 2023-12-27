const map = [];
map[0] = "Vanha torni";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsäaukio";
map[3] = "Lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Vanha puupenkki";
map[8] = "Kaukainen mökki";
let mapLocation = 4;
let maps = Array.from({ length: 9 }, (_, i) => document.querySelector(`#map${i + 1}`));
let itemArray = Array.from({ length: 3 }, (_, i) => document.querySelector(`#img-item${i + 1}`));
let itemNames = Array.from({ length: 3 }, (_, i) => document.querySelector(`#item-text${i + 1}`));

const images = [];
images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "porttiSuljettu.png";
images[6] = "poimiKivi.png";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";

const itemImages = [];
itemImages[0] = "huilu.png";
itemImages[1] = "kivi.png";
itemImages[2] = "miekka.png";
itemImages[3] = "avain.png";

const blockMessage = [];
blockMessage[0] = "Haluamasi reitti on liian vaarallinen.";
blockMessage[1] = "Salaperäinen voima estää liikkumisesi tuohon suuntaan.";
blockMessage[2] = "Vaikeakulkuinen pusikko estää etenemisen.";
blockMessage[3] = "Et pääse tuolta suunnalta ohittamaan lohikäärmettä.";
blockMessage[4] = "";
blockMessage[5] = "Portti sulkeutui yllättäen.";
blockMessage[6] = "Joki on liian syvä ylitettäväksi.";
blockMessage[7] = "Metsä on liian tiheä läpäistäväksi.";
blockMessage[8] = "Olet liian peloissasi mennäksesi tuohon suuntaan.";

let playersInput = "";
let gameMessage = "";
const actionsForPlayer = [
  "pohjoinen",
  "itä",
  "etelä",
  "länsi",
  "poimi",
  "käytä",
  "jätä",
];
let action = "";

let items = ["huilu", "kivi", "miekka", "avain"];
let itemLocations = [1, 6, 8, 3];
let backPack = [];
const knownItems = ["huilu", "kivi", "miekka", "avain"];
let item = "";
let itemOrder = 0;
let gameProgression = 0;

const image = document.querySelector("#img");
const endImage = document.querySelector("#end-screen");
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const options = document.querySelector("#options");
const button = document.querySelector("button");
const itemImage = document.querySelector("#img-item")
const itemText = document.querySelector("#text")
button.addEventListener("click", clickHandler, false);
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    button.click();
    input.value = "";
  }
});

render();

function render() {
  image.src = "images/" + images[mapLocation];
  output.innerHTML = "Sijaintisi on: " + map[mapLocation] + "<br>";
  options.innerHTML = "Vaihtoehdot: <br>" + "Liiku";
  console.log(gameProgression);

  if(backPack.includes("kivi") || backPack.includes("huilu") || backPack.includes("miekka") || backPack.includes("avain")) {
    options.innerHTML += "<br>Käytä"
  }
  if (backPack.length > 0) {
    output.innerHTML += "Mukanasi on: " + backPack.join(", ");
  }
  if(mapLocation === 5 && gameProgression === 4) {
    output.innerHTML += "<br>Avain värisee repussasi";
  }

  for (let i = 0; i < items.length; i++) {
    if (mapLocation === itemLocations[i]) {
      if(gameProgression === 0 && mapLocation === 6) {
        output.innerHTML += "Näet esineen: " + items[i] + "<br>";
        options.innerHTML += "<br>Poimi";
      }
      if(gameProgression === 1 && mapLocation === 1) {
        output.innerHTML += "<br>Mies kehottaa sinua pudottamaan jotakin kaivoon<br>";
      }
      if(gameProgression === 2 && mapLocation === 1) {
        output.innerHTML += "Mies ojentaa sinulle huilun<br>";
        output.innerHTML += "Näet esineen: " + items[i] + "<br>";
        options.innerHTML += "<br>Poimi";
      }
      if (gameProgression === 2 && mapLocation === 8) {
        output.innerHTML += "<br>Mökki on tyhjä <br>";
        output.innerHTML += "Huilu hohtaa repussasi";
      }
      if(gameProgression === 3 && mapLocation === 8) {
        output.innerHTML += "<br>Näet esineen: " + items[i] + "<br>";
        options.innerHTML += "<br>Poimi";
      }
      if(gameProgression === 4 && mapLocation === 3) {
        output.innerHTML += "<br>Näet esineen: " + items[i] + "<br>";
        options.innerHTML += "<br>Poimi";
      }
    }
  }
  output.innerHTML += "<em>" + gameMessage + "</em>";
  for(let i = 0; i < map.length; i++) {
    if(i === mapLocation) {
      maps[i].style.background = "rgba(0, 190, 0, 0.7)";
      maps[i].innerHTML = map[i];
    }
  }
}

function clickHandler() {
  playGame();
}

function playGame() {
  playersInput = input.value.toLowerCase();

  gameMessage = "";
  action = "";

  for (let i = 0; i < actionsForPlayer.length; i++) {
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
      action = actionsForPlayer[i];
      break;
    }
  }

  for (let i = 0; i < knownItems.length; i++) {
    if (playersInput.indexOf(knownItems[i]) !== -1) {
      item = knownItems[i];
    }
  }

  switch (action) {
    case "pohjoinen":
      if (mapLocation >= 3) {
        mapLocation -= 3;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "itä":
      if (mapLocation % 3 !== 2) {
        mapLocation += 1;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "etelä":
      if (mapLocation <= 5) {
        mapLocation += 3;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "länsi":
      if (mapLocation % 3 !== 0) {
        mapLocation -= 1;
      } else {
        gameMessage = blockMessage[mapLocation];
      }
      break;

    case "poimi":
      if(mapLocation === 6 && gameProgression === 0) {
        takeItem();
      }
      if(mapLocation === 1 && gameProgression === 2) {
        takeItem();
      }
      if (mapLocation === 8 && gameProgression === 3) {
        takeItem();
      }
      if (mapLocation === 3 && gameProgression === 4) {
        takeItem();
      }
      break;

    case "käytä":
      useItem();
      break;

    default:
      gameMessage = "Tuntematon toiminto";
  }
  render();
}

function takeItem() {
  let itemIndexNumber = items.indexOf(item);
  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
    gameMessage = "<br>Poimit esineen " + item + ".";
    backPack.push(item);
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
    switch (item) {
      case "huilu":
        itemArray[itemOrder].style.visibility = "visible";
        itemArray[itemOrder].src = "images/" + itemImages[0];
        itemNames[itemOrder].innerHTML = "Huilu";
        images[1] = "kaivo.jpg";
        gameProgression = 2;
        break;

      case "kivi":
        itemArray[itemOrder].style.visibility = "visible";
        itemArray[itemOrder].src = "images/" + itemImages[1];
        itemNames[itemOrder].innerHTML = "Kivi";
        images[6] = "joki.jpg";
        gameProgression = 1
        break;

      case "miekka":
        itemArray[itemOrder].style.visibility = "visible";
        itemArray[itemOrder].src = "images/" + itemImages[2];
        itemNames[itemOrder].innerHTML = "Miekka";
        images[8] = "mokki.jpg";
        break;

      case "avain":
        itemArray[itemOrder].style.visibility = "visible";
        itemArray[itemOrder].src = "images/" + itemImages[3];
        itemNames[itemOrder].innerHTML = "Avain";
    }
    itemOrder += 1;
  } else {
    gameMessage = "Et voi tehdä tuota toimintoa.";
  }
}

function useItem() {
  let backPackIndexNumber = backPack.indexOf(item);
  if (backPackIndexNumber === -1) {
    gameMessage = "Sinulla ei ole esinettä " + item + " mukana.";
  }
  if (backPack.length === 0) {
    gameMessage = "Sinulla ei ole mitään mukana.";
  }

  if (backPackIndexNumber !== -1) {
    switch (item) {
      case "huilu":
        if(mapLocation === 8 && gameProgression === 2) {
          gameMessage = "Kaunis musiikki kaikuu ympärilläsi.";
          gameMessage += "<br>Miekka ilmestyy eteesi";
          images[8] = "poimiMiekka.png";
          gameProgression = 3;
        }
        else {
          gameMessage = "<br>Kaunis musiikki kaikuu ympärilläsi.";
        }
        break;

      case "miekka":
        if (mapLocation === 3 && gameProgression === 3) {
          gameMessage = "Heilautat miekkaasi ja tapat lohikäärmeen.";
          gameMessage += "<br>Avain tippuu lohikäärmeeltä";
          itemArray[itemOrder].style.visibility = "hidden";
          itemNames[itemOrder].innerHTML = "";
          images[3] = "deadDragon.jpg";
          gameProgression = 4;
        } else {
          gameMessage = "Heiluttelet miekkaa tylsistyneenä.";
        }
        break;

      case "kivi":
        if (mapLocation === 1 && gameProgression === 1) {
          gameMessage = "Pudotit kiven kaivoon.";
          backPack.splice(backPackIndexNumber, 1);
          gameProgression = 2;
          itemOrder -= 1;
          images[1] = "poimiHuilu.png";
          itemArray[itemOrder].style.visibility = "hidden";
          itemNames[itemOrder].innerHTML = "";
        } else {
          gameMessage = "Pyörittelet kiveä repussasi.";
        }
        break;

      case "avain":
        if(mapLocation === 5 && gameProgression === 4) {
          images[5] = "porttiAuki.png";
          setTimeout(function(){
            endImage.style.visibility = "visible";
          }, 1000);
        }
        else {
          gameMessage = "<br>Pyörittelet avainta repussasi.";
        }
        break;

      default:
        gameMessage = "";
    }
  }
}

function ohjeet() {
  let x = document.getElementById("ohje-teksti");
  if(x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  }
  else {
    x.style.visibility = "hidden";
  }
}