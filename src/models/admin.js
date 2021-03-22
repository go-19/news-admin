const Date = require("../../date/date.js");
const fs = require("fs").promises;
const path = require("path");

const newsMaker = async ({ title, more }, { file }) => {
    const fileName = path.join(__dirname, "../../data", "newsData.json")
    const admin = await fs.readFile(fileName, "utf8");
    const parsed = JSON.parse(admin);

    file.mv(path.join(__dirname, "../../images", file.name), (err) => {
        console.log(err);
    })

    const data = {
        id: parsed.length + 1,
        title,
        more,
        img: file.name,
        date: [Date.month, Date.monthDay, Date.year, Date.startTime()]
    }

    parsed.unshift(data);

    await fs.writeFile(fileName, JSON.stringify(parsed, null, 4));

}

module.exports.newsMaker = newsMaker;