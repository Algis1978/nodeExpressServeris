import express from "express";
import exphbs from "express-handlebars";

const port = 3000
const web = "web";

let nextId = 1;
const zmones = [
    {
        id: nextId++,
        vardas: "Jonas",
        pavarde: "Jonaitis",
        alga: 7234.56
    },
    {
        id: nextId++,
        vardas: "Petras",
        pavarde: "Petraitis",
        alga: 750
    },
    {
        id: nextId++,
        vardas: "Antanas",
        pavarde: "Antanaitis",
        alga: 750,
    },
];

const app = express();
//Šitie du reikalingi, kad veiktų express-handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(web, {
    index: "index.html"
    // GALIMA NURODYTI IR DAUGIAU REIKALAVIMU  INDEX, JEIGU PVZ, NETYCIA VIENO IS FAILU IESKOMU NEBUTU, TAIM REIKTU RASYTI index: ["index.html", "failas.html"]
}));
// MIDLE WAR SUKURIMAS
app.use(express.urlencoded({
    extended: true,
}));
// extended reiskias jog moka naudotis nauja sintakse, viska padaro stringu
// CIA YRA ENT POINTAI: jeigu pasakei / atspausdins hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// CIA YRA ENT POINTAI: jeigu pasakei /index.html / atspausdins Labas pasauli
app.get('/index.html', (req, res) => {
    res.send("<html><body>Labas pasauli!</body></html>");
});
// SUKURIAMAS ENT POINTAS I ZMONIU SARA
app.get('/zmones', async (req, res) => {
    res.render("zmones", { zmones });//vietoj buvusio HTML bylos skaitymo/kodo
});

app.get('/zmogusEdit', (req, res) => {
    let zmogus;
    if (req.query.id) {
        // REDAGUOTI ESAMA FORMA
        const id = parseInt(req.query.id);
        // NURODOA I NORIMA KOREAGUOTI ZMOGU IS SARASO
        zmogus = zmones.find(e => e.id === id);
        if (!zmogus) {
            res.redirect("/zmones");
            return;
        }
    }
    res.render("zmogus", { zmogus });//vietoj buvusio HTML kodo/bylos skaitymo
});

app.post("/zmogusSave", (req, res) => {
    let zmogus;
    if (req.body.id) {
        const id = parseInt(req.body.id);
        zmogus = zmones.find(e => e.id === id);
        if (!zmogus) {
            res.redirect("/zmones");
            return;
        }
    }
    // PATIKRINAMI DUOMENYS BEI KLAIDOS
    let klaidos = [];
    if (!req.body.vardas || req.body.vardas.trim() === "") {
        klaidos.push("Neivestas vardas");
    }
    if (!req.body.pavarde || req.body.pavarde.trim() === "") {
        klaidos.push("Neivesta pavarde");
    }
    let alga = parseFloat(req.body.alga);
    if (isNaN(alga)) {
        klaidos.push("Neteisingai ivesta alga");
    }
    if (klaidos.length > 0) {
        //vietoj buvusio HTML kodo/bylos skaitymo
    res.render("blogiDuomenys", {klaidos, zmogus})    } else {
        if (zmogus) {
            zmogus.vardas = req.body.vardas;
            zmogus.pavarde = req.body.pavarde;
            zmogus.alga = req.body.alga;
        } else {
            zmones.push({
                id: nextId++,
                vardas: req.body.vardas,
                pavarde: req.body.pavarde,
                alga,
            });
        }
        res.redirect("/zmones");
    }
});

// NORINT ISTRINTI IS SARASO VIENA IS ZMONIU = 1. REIKIA PRIDETI MYGTUKA.
// KAIP SERVERIUI PASAKYTI KURI ZMOGU ISTRINTI? KIEKVIENAM ZMOGUI PRIDESIM ID ELEMENTA.

app.get("/zmogusDelete", (req, res) => {
    const id = parseInt(req.query.id);
    // NURODOA I NORIMA ISTRINTI ZMOGU IS SARASO
    const index = zmones.findIndex(e => e.id === id);
    if (index >= 0) {
        zmones.splice(index, 1);
    }
    // KA REIKIA NUSIUSTI ATGAL JOG ZMOGUS ISTRINTAS?
    res.send("istrynem");
    console.log("Kazka nori istrinti");
    // RESPONSE GALI NENUSIUSTI TEKSTA JOG ISTRYNEM BET:
    // res.send("nieko mes neistrynem");
    res.redirect("/zmones");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});