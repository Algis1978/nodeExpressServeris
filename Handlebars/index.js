//Importuojama biblioteka 'handlebars'
import handlebars from "handlebars";

//{{#if alga}} {{/if}} - aka 'helperis', kuris paima elementą, jei jis yra, ir įterpia tarp savo tagų.
const html = `
<html>
<body>
Vardas: {{vardas}}<br>
Pavarde: {{pavarde}}<br>
{{#if alga}}
Uzdirba {{alga}}
{{/if}}
</body>
</html>
`;
// 'template' yra funkcija, kuri sukompiliuoja HTML tekstą į 'handlebars' objektą,
//Šiuo atveju 'html' teksto forma.
const template = handlebars.compile(html);

const zmones = [
  {vardas: "Jonas", pavarde: "Jonaitis", alga: 100},
  {vardas: "Petras", pavarde: "Petraitis"},
  {vardas: "Antanas", pavarde: "Antanaitis"},
];

const jonoHtml = template(zmones[0]);
const petroHtml = template(zmones[1]);

console.log(jonoHtml);
console.log(petroHtml);

// {{each masyvas}}{{/each}} aka 'helperis', kuris paima visus elementus iš masyvo 'zmones' ir kartoja juos tarp savo tagų.
const html1 = `
<ul>
{{#each zmones}}
<li>{{vardas}} {{pavarde}}</li>
{{/each}} 
</ul>
`;

const t1 = handlebars.compile(html1);

console.log(t1({zmones}));

