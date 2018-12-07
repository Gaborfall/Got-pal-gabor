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

  for ( var i = 0; i < elohalott(userDatas).length; i += 1) {
    tomb += `<div class='card' id='kep${[i]}'> <img src=${elohalott(userDatas)[i].portrait}>
  <div><p>${elohalott(userDatas)[i].name}</p>
 </div></div> `;
  }

  document.querySelector('.portraitcontainer').innerHTML = tomb;
  var imgTag = document.getElementById('kep2');
  imgTag.addEventListener('click', function () {
    alert('region number');
  });
}

