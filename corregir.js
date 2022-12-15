// recorrer diccionario

// si esta la key dentro de la lista

// volver a agregar la key y su valor en otra lista
const fs = require('fs');

let diccionario=JSON.parse(fs.readFileSync("ya_traducidos.json","utf-8"));
let lista_a_traducir=JSON.parse(fs.readFileSync("../proyecto-node-recopila/base_de_datos.txt","utf-8"));
let nuevo_diccionario={}

let lista_claves=Object.keys(diccionario);
console.log("tamaño antes de corregir", lista_claves.length)
for (let i = 0; i < lista_claves.length; i++) {
    if(lista_a_traducir.indexOf(lista_claves[i])!=-1)//significa que esa clave existe en la base de datos
    {
        nuevo_diccionario[lista_claves[i]]=diccionario[lista_claves[i]];
    }
    
}

console.log("tamaño actual", Object.keys(nuevo_diccionario).length)
fs.writeFileSync("ya_traducidos.json",JSON.stringify(nuevo_diccionario),"utf-8");
// termino de verificar