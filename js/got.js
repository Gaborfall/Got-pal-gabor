function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed

  sorbarendezes(userDatas);
  namesandportraits(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


function elohalott(userDatas) {
  var alive = [];
  for (var l = 0; l < userDatas.length; l++) {
    if (userDatas[l].dead !== true) {
      alive.push(userDatas[l]);
    }
  }

  return alive;
}

function sorbarendezes(userDatas) {
  userDatas.sort(function (first, second) {
    if (first.name > second.name) {
      return 1;
    }
    return -1;
  });
}


function namesandportraits(userDatas) {
  var tomb = '';
  for (var i = 0; i < elohalott(userDatas).length; i += 1) {
    tomb += `<div class='card'><img src=${elohalott(userDatas)[i].portrait}><div><p>${elohalott(userDatas)[i].name}</p></div></div> `;
  }

  document.querySelector('.portraitcontainer').innerHTML = tomb;

  document.querySelectorAll('.card').forEach(function (card, index) {
    card.addEventListener('click', function () {
      callbio(elohalott(userDatas)[index].picture, elohalott(userDatas)[index].bio, elohalott(userDatas)[index].name, elohalott(userDatas)[index].house);
    });
  });
}

function callbio(a, b, c, d) {
  if (document.querySelector('#BioKep') != null) {
    document.querySelector('#BioKep').src = a;
  } else {
    var bioimg = document.createElement('img');
    bioimg.src = a;
    bioimg.id = 'BioKep';
    document.querySelector('.nagykep').appendChild(bioimg);
  }

  if (document.querySelector('#BioText') != null) {
    document.querySelector('#BioText').innerHTML = b;
  } else {
    var biop = document.createElement('p');
    biop.id = 'BioText';
    var bioptext = document.createTextNode(b);
    biop.appendChild(bioptext);
    document.querySelector('.bio').appendChild(biop);
  }

  if (document.querySelector('#BioTextName') != null) {
    document.querySelector('#BioTextName').innerHTML = c;
  } else {
    var biop = document.createElement('p');
    biop.id = 'BioTextName';
    var bioptext = document.createTextNode(c);
    biop.appendChild(bioptext);
    document.querySelector('.nameflag').appendChild(biop);
  }
  /*
	var houseimg = "";
	switch (d){
		case "nightwatch": houseimg = "assets/houses/nightwatch.png";break;
		case "baratheon": houseimg = "assets/houses/baratheon.png";break;
		case "clegane": houseimg = "assets/houses/clegane.png";break;
		case "greyjoy": houseimg = "assets/houses/greyjoy.png";break;
		case "lannister": houseimg = "assets/houses/lannister.png";break;
		case "mormont": houseimg = "assets/houses/mormont.png";break;
		case "royalguard": houseimg = "assets/houses/royalguard.png";break;
		case "stark": houseimg = "assets/houses/stark.png";break;
		case "targaryen": houseimg = "assets/houses/targaryen.png";break;
		case "tarly": houseimg = "assets/houses/tarly.png";break;
		case "tully": houseimg = "assets/houses/tully.png";break;
		default : houseimg = "";
	}
	*/
  if (document.querySelector('#BioTextHouse') != null && d != null) {
    document.querySelector('#BioTextHouse').src = 'assets/houses/' + d + '.png';
  } else if (d != null) {
    var bioimg = document.createElement('img');
    bioimg.src = 'assets/houses/' + d + '.png';
    bioimg.id = 'BioTextHouse';
    document.querySelector('.nameflag').appendChild(bioimg);
  } else if (document.querySelector('#BioTextHouse') != null) {
    document.querySelector('#BioTextHouse').src = '';
  }
}
function searchbio() {
  var name = document.querySelector('#namesearch').value;
  var what = new RegExp(name, 'i');
  document.querySelectorAll('.card').forEach(function (card) {
    if (card.innerHTML.search(what) > 0) {
      card.click.apply(card);
    }
  });
}
document.getElementById('namesearch').addEventListener('keydown', function (e) {
  if (!e) { var e = window.event; }
  if (e.keyCode == 13) { searchbio(); }
}, false);

