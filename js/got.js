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
  namesandportraits(userDatas);
  console.log('object');
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function namesandportraits(userDatas) {
  var tomb = '';
  for ( var i = 0; i < userDatas.length; i += 1) {
    tomb += `<div class='card'> <img src=${userDatas[i].portrait}>
  <div><p>${userDatas[i].name}</p>
 </div></div> `;
  }
  document.querySelector('.portraitcontainer').innerHTML = tomb;
}
