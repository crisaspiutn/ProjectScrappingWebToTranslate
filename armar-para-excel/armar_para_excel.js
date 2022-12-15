const fs = require('fs');
let lista=JSON.parse(fs.readFileSync("ya_traducidos.json","utf-8"));
let lista_claves=Object.keys(lista);
let json_para_excel=[];
for (let i = 0; i < lista_claves.length; i++) {
    json_para_excel.push({
        "en ingles":lista_claves[i],
        "traduccion 1":lista[lista_claves[i]][0],
        "traduccion 2":lista[lista_claves[i]][1]
    });
}
fs.writeFileSync("lista_para_excel.json",JSON.stringify(json_para_excel),"utf-8");
console.log("construido con exito");