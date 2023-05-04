const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


app.use(bodyParser.json());

app.use(express.static(process.cwd()+"/dist/cko-factory-app/"));

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/dist/cko-factory-app/index.html")
  });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});