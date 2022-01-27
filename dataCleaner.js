fs = require('fs');
currentPathId = 3;

fs.readFile(`./SupplyLines-Path${currentPathId}.csv`, 'utf8', function (err, data) {
    if (err) { return console.log(err) };

    processData(data);
})

function processData(csv) {
    const supplyLines = csv.split("\n,,,,,,,,");

    mapSLs = supplyLines.map((sl) => {
        let rows = sl.split("\n");
        filteredRows = rows.filter((row) => {
            return '\r' !== row;
        })
        let name = filteredRows[0].slice(0, -9);
        if (name.includes("->")) {
            name = name.split(" ->")[0];
        }

        types = filteredRows[2].slice(0, -2).split(",");
        names = filteredRows[3].slice(0, -2).split(",");
        costs = filteredRows[4].slice(0, -2).split(",");

        const award = new Array(types.length);
        return award.fill().map((_item, i) => {
            return {
                "sLName": name,
                "type": types[i],
                "name": names[i],
                "cost": costs[i]
            }
        }).filter((item) => {
            return item.type !== "-";
        })
    })

    flattenedSL = mapSLs.flat();
    finalfinalV3 = flattenedSL.map((item, index) => {
        item.id = ["a", "b", "c"][currentPathId - 1] + index;
        return item;
    })

    fs.writeFile(`./sl-path${currentPathId}.js`, `path${currentPathId} = ${JSON.stringify(finalfinalV3)}`, err => {
        if (err) {
            console.error(err);
            return
        }
    })
}