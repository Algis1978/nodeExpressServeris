console.log("Go Away!!!");
import express from "express";
const app = express() //sukurta programas
const port = 3000 // laukiama iš 3000 porto
const web = "WEB";

let id=1;
const zmones = [ {
  vardas: "Ieva",
  pavarde: "Lalaitė",
  atlyginimas: 750,
  myId : id++
},
{
  vardas: "Tomas",
  pavarde: "Kukaitis",
  atlyginimas: 1050,
  myId : id++
}
];
app.use (express.static(web, {index:false})); // ieško nurodytos index bylos nurodytame kataloge, jei false - neieško, pereina prie endpointų.
app.use (express.static(web, {index:["index.html", "testCss.css"]})) // ieško nurodytos bylos/ų (masyve).


app.get('/zmones', (req, res) => { //Nusiunčia pranešimą jei ieškomas "/zmones".
  let turinys = "";
  turinys += "<html>\r\n"
  turinys += "<body>\r\n"
  turinys += "<h1>List:</h1>\r\n"
  turinys += "<ul>\r\n"; 
  for (const zmogus of zmones) { //forOf ciklas, iteruoja per masyvo elementus
    turinys +=`<li>${zmogus.vardas} ${zmogus.pavarde} ${zmogus.atlyginimas} 
    <a href="/trintiZmogu?id=${zmogus.myId}">X</a></li>`// nukreipimas į puslapį su parametru.
  }
  turinys += "</ul>\r\n"
  turinys += "</body>\r\n"
  turinys += "</html>\r\n"
  res.send(turinys);
  //Nusiunčia pranešimą jei ieškomas "/zmones".
}) // aka 'endpointas'

app.get("/trintiZmogu", (req, res) =>{
  res.send("nieko neistrynem")
})


app.get('/', (req, res) => {
  res.send('Yooooh broh!')//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'
app.get('/', (req, res) => {
  res.send('Go Away!')//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'

app.get('/bum', (req, res) => { // req - request, res - resolve, express spec sukurti objektai.
  console.log(req.ip); // IP adresas (localhost)
  console.log(req.method);// užklausos metodas
  console.log(req.path); // užklausos kelias
  console.log(req.query); // sukuria objektą iš užklausos parametrų.
  //PVZ: ?id=2334&param1=valueA&param2=value2
  //query grąžina { id: '2334', param1: 'valueA', param2: 'value2' }
  //Dabar galima išrinkti parametrų vertes:
  const parId = req.query
  res.send("<html><body><h1>Yeah, that's right</h1></body></html>")//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

