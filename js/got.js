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
  var charbioimg = [];
  var charbiotext = [];
  /*
	for (var i = 0; i < elohalott(userDatas).length; i += 1) {
		var portdiv = document.createElement("div");
		portdiv.className = "card";

		var portimg = document.createElement("img");
		portimg.src = elohalott(userDatas)[i].portrait;
		portdiv.appendChild(portimg);

		var portnamediv = document.createElement("div");
		var portp = document.createElement("p");
		var portname = document.createTextNode(elohalott(userDatas)[i].name);
		portp.appendChild(portname);
		portnamediv.appendChild(portp);
		portdiv.appendChild(portnamediv);

		document.querySelector('.portraitcontainer').appendChild(portdiv);
		charbioimg[i] = elohalott(userDatas)[i].picture;
		charbiotext[i] = elohalott(userDatas)[i].bio;
	}
	document.querySelectorAll('.card').forEach(function (card, index) {
		card.addEventListener('click', function () {
			callbio(charbioimg[index] , charbiotext[index]);
		});
	});
	*/

  var tomb = '';
  for (var i = 0; i < elohalott(userDatas).length; i += 1) {
    tomb += `<div class='card'><img src=${elohalott(userDatas)[i].portrait}><div><p>${elohalott(userDatas)[i].name}</p></div></div> `;
    charbioimg[i] = elohalott(userDatas)[i].picture;
    charbiotext[i] = elohalott(userDatas)[i].bio;
  }

  document.querySelector('.portraitcontainer').innerHTML = tomb;

  document.querySelectorAll('.card').forEach(function (card, index) {
    card.addEventListener('click', function () {
      callbio(charbioimg[index], charbiotext[index]);
    });
  });
}

function callbio(a, b) {
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
}
function searchbio(name) {
  var what = new RegExp(name, 'i');
  document.querySelectorAll('.card').forEach(function (card) {
    if (card.innerHTML.search(what) > 0) {
      card.click.apply(card);
    }
  });
}

