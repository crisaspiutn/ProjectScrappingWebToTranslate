// const { default: fetch } = require("node-fetch")
// import {fetch,Request,Response} from 'undici';
// const axios=require("axios");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));//https://www.npmjs.com/package/node-fetch#installation
const fs=require("fs");
const path=require("path");
// import("node-fetch")
// const res=await fetch("https://randomuser.me/api/")
// let lista_a_traducir=["hello","dog","how"]
let lista_a_traducir=JSON.parse(fs.readFileSync("../proyecto-node-recopila/base_de_datos.txt","utf-8"));
let lista_ya_traducida=JSON.parse(fs.readFileSync("./ya_traducidos.json","utf-8"));
// let lista_a_traducir=JSON.parse(fs.readFileSync(,"utf-8"));
if(fs.existsSync("../proyecto-node-recopila/base_de_datos.txt")){
    console.log("exite el directorio");
    console.log("lista_a_traducir");
    console.log(lista_a_traducir);
}
else console.log("no exite el directorio");

const puppeteer=require("puppeteer");
 if(fs.existsSync(path.join(__dirname,'node_modules/puppeteer/.local-chromium/win64-991974/chrome-win/chrome.exe')))console.log("siiii")
async function ejecu(lista_a_traducir){
    const browser=await puppeteer.launch({headless: false,executablePath:path.join(__dirname,'node_modules/puppeteer/.local-chromium/win64-1011831/chrome-win/chrome.exe')});
    
    const page=await browser.newPage();
    for (let i = 0; i < lista_a_traducir.length; i++) {
        try {
            if(siPalabraExisteEnLista(lista_a_traducir[i],lista_ya_traducida)){
                console.log("ya tienes traducida: " + lista_a_traducir[i])
            }else{
                let palabras_encontradas=await traduce_palabra(page,lista_a_traducir[i]);
                lista_ya_traducida[lista_a_traducir[i]]=palabras_encontradas;
                fs.writeFileSync("./ya_traducidos.json",JSON.stringify(lista_ya_traducida),"utf-8");
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    // await guardar[0].click();
    console.log("termino de traducir la lista")
    page.screenshot({path:'hoja4.jpg'});
    setTimeout(() => {
        browser.close();
        page.close();
    }, 5000);

}
ejecu(lista_a_traducir);
async function traduce_palabra(page,palabra){
    console.log("traducire palabra: "+palabra);
    await page.goto("https://translate.google.com.ar/?hl=es&sl=en&tl=es&text="+palabra+"&op=translate");
    await page.setViewport({width:1800,height:1000});
    // await page.waitForSelector('#user');
    await page.waitForTimeout(3000);
    // await page.type('#user','cristianmultiutn@hotmail.com')
    // await page.type('#password','donaspi123')
    // var titulo2=await page.$x('//span[@lang="es"]');
    // var titulo2=await page.$x('//div[@class="J0lOec"]//span');//atrapa 9 elementos
    var titulo2=await page.$x('//div[@class="lRu31"]//span');//atrapa 9 elementos
    // var titulo2=await page.$x('//div[@class="J0lOec"]//span/span');//atrapa 5 elementos
    // var titulo2=await page.$x('//div[@class="J0lOec"]//span/span/span');//atrapa 2 elementos
    console.log(titulo2.length);// 1
    console.log(palabra);
    // console.log(typeof titulo2);// 1
    let value;
    let value2;
    if(typeof titulo2=="object"){
        // let value = await page.evaluate(el => el.textContent, titulo2[0])
        
        value = await titulo2[0].evaluate((ddd) => {
            return ddd.innerText
        })
        console.log(value);
        value2 = await titulo2[1].evaluate((ddd) => {
            return ddd.innerText
        })
        console.log(value2);
        // console.log(titulo2[0].getProperties());
        // console.log(await titulo2[0].text);// no
        // console.log(titulo2[0].getProperty("innerHTML"));
    }
    console.log("Termine palabra: "+palabra);
    return [value,value2];
}
async function ejecuta(texto){
    try {
        // const res=await fetch("https://translate.google.com.ar/?hl=es&sl=en&tl=es&text=hola%0A&op=translate")
        // const res=await fetch("https://translate.google.com.ar/?hl=es&sl=en&tl=es&text="+texto.trim()+"%0A&op=translate")
        const res=await fetch("https://translate.google.com.ar/?hl=es&sl=en&tl=es&text=dog&op=translate")
        const txt=await res.text()
        // console.log(txt);
        console.log(txt.indexOf('data-language-name="inglés"'));
        // let lista=txt.split(txt.indexOf('data-language-name="inglés"'))[1];
        let lista=txt.split('data-language-name="inglés"')[1];
        lista=lista.split("\n")[0]
        console.log(lista);
        fs.writeFileSync("texto.txt",txt,"utf-8");
    } catch (error) {
        console.log(error);
    }
}
// .then(x=>x.json())
// .then(d=>console.log(d))
// ejecuta(lista_a_traducir[1]);
// fetch('https://api.mercadolibre.com/users/test_user',{
//     method:'POST',
//     headers:{
//         'Authorization': 'Bearer '+'APP_USR-8513290730145598-081315-c82979ccbbbf07bc6defcb491a06381c-244140036',
//         'content-type':'application/json',
//     },
//     body:JSON.stringify({
//         site_id: 'MLA'
//     })
// })
// .then(x=>x.json())
// .then(z=>console.log(z))
function siPalabraExisteEnLista(palabra,lista){
    if(lista.hasOwnProperty(palabra)){
        return true;
    }else{
        return false;
    }
}