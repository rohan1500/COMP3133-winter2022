const csv = require('csv-parser');
const fs = require('fs');

const filepath = "./input_countries.csv"

const path1 = './canada.txt'
const path2 = './usa.txt'

try {
    fs.unlinkSync(path1)
    console.log("file has been removed : canada.txt")
    fs.unlinkSync(path2)
    console.log("file has been removed : usa.txt")
} catch(err) {
    console.log(err)
}

fs.createReadStream(filepath)
    .on('error', (err) => {
        console.log(err)
    })

    .pipe(csv())
    .on('data', (row) => {
        // data for canada
        if(row['country'] == "Canada")
        {
            var str = `${row['country']}, ${row['year']}, ${row['population']}\n`
            fs.appendFile('canada.txt', str, function (err) {
                if(err)()=> {console.log(err)};
            });

        }
        // data for USA
        else if(row['country'] == "United States")
        {
            var str = `${row['country']}, ${row['year']}, ${row['population']}\n`
            fs.appendFile('usa.txt', str, function (err) {
                if(err)()=> {console.log(err)};
            });
        }
    })
    .on('end', () => {
        console.log("successfully completed")
    })