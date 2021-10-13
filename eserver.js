console.log("Go Away!!!");
import express from "express";
const app = express() //sukurta programa
const port = 3000 // laukiama iš 3000 porto
const web = "WEB"; // kintamasis rodo į pakatalogį "WEB"

app.use (express.static(web, {index:false})); // ieško nurodytos index bylos nurodytame kataloge, jei false - neieško, pereina prie endpointų.
app.use (express.static(web, {index:["index.html", "testCss.css"]})) // ieško nurodytos bylos/ų (masyve).

//Pavyzdys su zmonių masyvu.
let nextId=1;// id reikalingas, kad pograma atskirtų masyvo elementus.
const zmones = [ {
  vardas: "Ieva",
  pavarde: "Lalaitė",
  atlyginimas: 750,
  id : nextId++
},
{
  vardas: "Tomas",
  pavarde: "Kukaitis",
  atlyginimas: 1050,
  id : nextId++
}
];

//Suformuojamas turinys, kai kreipiamasi ieškant "/zmones":
app.get('/zmones', (req, res) => { //Nusiunčia pranešimą jei ieškomas "/zmones".
  let turinys = "";
  turinys += "<html>\r\n"
  turinys += "<body>\r\n"
  turinys += "<h1>Sąrašas:</h1>\r\n"
  turinys += "<a href='/naujas'>Naujas žmogus\r\n"; 
  turinys += "<ul>\r\n"; 
  for (const zmogus of zmones) { //forOf ciklas, iteruoja per masyvo elementus ir prideda prie turinio vertes:
    turinys +=`<li>${zmogus.vardas} ${zmogus.pavarde} ${zmogus.atlyginimas} 
    <a href="/trintiZmogu?id=${zmogus.id}">X</a></li>`// Pridedamas X ženklas, kuriam bus priskirta įrašo trynimo funkcija onclick ir nukreipimas į puslapį su parametru "/trintiZmogu".
  }
  turinys += "</ul>\r\n"
  turinys += "</body>\r\n"
  turinys += "</html>\r\n"
  res.send(turinys);
  //Nusiunčia pranešimą jei ieškomas "/zmones".
})

app.get('/naujas', (req, res) => { //Nusiunčia pranešimą jei ieškomas "/zmones".
  let turinys = "";
  turinys += "<html>\r\n"
  turinys += "<body>\r\n"
  turinys += "<h1>Naujas žmogus</h1>\r\n"
  turinys += '<form action="/zmogusInsert" method="POST" >\r\n'
  turinys += 'Vardas: <input type="text" name="vardas"><br>\r\n'
  turinys += 'Pavardė: <input type="text" name="pavarde"><br>\r\n'
  turinys += 'Atlyginimas: <input type="number" name="atlyginimas"><br>\r\n'
  turinys += '<input type="submit" value="Save"><br>\r\n'
  turinys += "</form>\r\n"
  turinys += '<a href="/zmones">Atgal</a>\r\n'
  turinys += "</body>\r\n"
  turinys += "</html>\r\n"
  res.send(turinys);
  //Nusiunčia pranešimą jei ieškomas "/zmones".
})

app.post("/zmogusInsert", (req, res) => {
  res.redirect("/zmones")
});

app.get("/trintiZmogu", (req, res) =>{
  const findId = parseInt(req.query.id);
  //Ieškomas trynimo elementas:
  const index = zmones.findIndex(e => e.id === findId)
  //Ištrinamas masyvo elementas:
  if (index>=0) {zmones.splice(index, 1)}
  res.send("Ištrinta");
})

app.get('/', (req, res) => {
  res.send('Yooooh broh!')//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'
app.get('/', (req, res) => {
  res.send('Go Away!')//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'

//req, res veikimo analizė:
app.get('/bum', (req, res) => { // req - request, res - resolve, express spec sukurti objektai.
  console.log("IP adresas"); // IP adresas (localhost)
  console.log(req.ip); // IP adresas (localhost)
  console.log("Užklausos metodas");// užklausos metodas
  console.log(req.method);// užklausos metodas
  console.log("Užklausos kelias"); // užklausos kelias
  console.log(req.path); // užklausos kelias
  console.log("Objektas iš užklausos argumentų"); // sukuria objektą iš užklausos parametrų.
  console.log(req.query); // sukuria objektą iš užklausos parametrų.
  //PVZ: ?id=2334&param1=valueA&param2=value2
  //query grąžina { id: '2334', param1: 'valueA', param2: 'value2' }
  //Dabar galima išrinkti parametrų vertes, šiuo atveju paimamas id vertė ir paverčiama skaičiumi:
  const parId = parseInt(req.query.id);
  //Ieškomas elementas:
  const index = zmones.findIndex (e => e.id === id)
  //Sukuriama funkcija su šiuo elementu (šiuo atveju trynimas iš masyvo):
  if (index>=0) {zmones.splice(index, 1)}
  res.send("Ištrinta");
})
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

