const themes = {
  Classic: {
    "Team-Colors": ["ffffff", "454545", "ffff00"],
    "BG-Colors": ["a8a8a8", "666666"],
  },
  "Night Mode": {
    "Team-Colors": ["454545", "282828", "ffff00"],
    "BG-Colors": ["595959", "404040"],
  },
  Royalty: {
    "Team-Colors": ["cdcdcd", "ba993e", "0388fc"],
    "BG-Colors": ["8c8c8c", "776b4a"],
  },
  Agarwood: {
    "Team-Colors": ["b37d4b", "321e0b", "62fc03"],
    "BG-Colors": ["9a7f65", "4d3f32"],
  },
  Jungle: {
    "Team-Colors": ["d5b100", "028e1b", "0052d5"],
    "BG-Colors": ["9f9460", "305036"],
  },
  Atmosphere: {
    "Team-Colors": ["ffffff", "0062ff", "ffff00"],
    "BG-Colors": ["d3e1f8", "8db5f7"],
  },
  "Mint Chocolate": {
    "Team-Colors": ["12e393", "63330d", "ffff00"],
    "BG-Colors": ["80ad9c", "5c5855"],
  },
  Candyland: {
    "Team-Colors": ["ffffff", "0062ff", "ffff00"],
    "BG-Colors": ["c0d8ac", "c98da9"],
  },
  Graffiti: {
    "Team-Colors": ["05f5d3", "fa4c16", "ffff00"],
    "BG-Colors": ["a9dad3", "e68b70"],
  },
};
checkData();
setTheme(getData("Theme"));
document.getElementById("Username").value = getData("Username");
document.getElementById("Username").onchange = (event) => {
  if (document.getElementById("Username").value.trim().length < 1) {
    document.getElementById("Username").value =
      "Player_" +
      Math.floor(Math.random() * (10000 - 99999 + 1) + 99999).toString();
  }
  saveLine("Username", document.getElementById("Username").value.trim());
};

function updateValue(e) {
  log.textContent = e.target.value;
}
function checkData() {
  if (localStorage.getItem("PhyscoChess-Data") == null) {
    var userData = {
      Username:
        "Player_" +
        Math.floor(Math.random() * (10000 - 99999 + 1) + 99999).toString(),
      "Team-Colors": ["00ffd9", "ff3c00", "ffff00"],
      "BG-Colors": ["a9dad3", "e68b70"],
      Theme: "Classic",
    };
    localStorage.setItem("PhyscoChess-Data", JSON.stringify(userData));
  }
}
function saveLine(id, data) {
  try {
    var change = JSON.parse(localStorage.getItem("PhyscoChess-Data"));
    change[id] = data;
    localStorage.setItem("PhyscoChess-Data", JSON.stringify(change));
  } catch (error) {
    localStorage.removeItem("PhyscoChess-Data");
    checkTTDATA();
  }
}
function getData(id) {
  try {
    var data = JSON.parse(localStorage.getItem("PhyscoChess-Data"));
    return data[id];
  } catch (error) {
    localStorage.removeItem("PhyscoChess-Data");
    checkData();
  }
}
function setTheme(theme) {
  document.body.style.background = `repeating-conic-gradient(
    #${themes[theme]["BG-Colors"][0]} 0deg 90deg,
    #${themes[theme]["BG-Colors"][1]} 90deg 180deg
  )`;
  document.body.style.backgroundSize = `500px 500px`;
  document.body.style.animation = `moveCheckerboard 20s linear infinite`;
  saveLine("Theme", theme);
  saveLine("BG-Colors", themes[theme]["BG-Colors"]);
  saveLine("Team-Colors", themes[theme]["Team-Colors"]);
}
const itemList = document.getElementById("theme");
for (let key in themes) {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = key;
  itemList.appendChild(option);
}
itemList.onchange = (event) => {
  setTheme(itemList.value);
};
itemList.value = getData("Theme");
function play() {
  document.getElementById("game").src =
    "https://leechlab.github.io/Physco-Chess/game/game.html";
  document.getElementById("game").className = "Show";
  const message = {
    type: "gameData",
    data:localStorage.getItem("PhyscoChess-Data");
  };

  document.getElementById("game").contentWindow.postMessage(message, "*");
}
