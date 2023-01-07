const fs = require('fs');
var json2csv = require('json2csv').parse;
const bodyParser = require('body-parser');



// const { parse } = require("csv-parse");
// const jsonData = {
//   "test": "test",
//   "test1": "test1"
// }
// const csv = json2csv.Parse(jsonData);
// fs.appendFile('filename.csv', csv, (err) => {
//   if (err) console.error('Couldn\'t append the data');
//   console.log('The data was appended to file!');
// });

// fs.createReadStream("./filename.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", function (row) {
//     console.log(row);
//   })



const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + 'index.html');
})

app.post('/', (req, res) => {
    var header = "Age,Gender,Score1,Score2,Score3,Average\n"
    var newLine = req.body.age + "," + req.body.gender + "," + req.body.scores + "," + req.body.averageScore + "\n"
    fs.stat('file.csv', function (err, stat) {
      if (err == null) {
        console.log('File exists');
    
        fs.appendFileSync('file.csv', newLine, function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
      } else {
        console.log('New file, just writing headers');
        fs.writeFileSync('file.csv', header + newLine, function (err) {
          if (err) throw err;
          console.log('file saved');
        });
      }
    });
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})