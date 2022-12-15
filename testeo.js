const fs = require('fs');
let lista=JSON.parse(fs.readFileSync("./ya_traducidos.json","utf-8"));

function siPalabraExisteEnLista(palabra,lista){
    if(palabra.hasOwnProperty(lista)){
        return true;
    }else{
        return false;
    }
}
console.log("dara falso");

if(siPalabraExisteEnLista("this",lista)==false)console.log("funciona bien")
else console.log("funciona mal")