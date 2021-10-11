console.log("Go Away!!!");
import express from "express";
const app = express() //sukurta programas
const port = 3000 // laukiama iš 3000 porto

app.get('/', (req, res) => {
  res.send('Hello World!')//Nusiunčia pranešimą jei ieškomas "/".
}) // aka 'endpointas'

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})