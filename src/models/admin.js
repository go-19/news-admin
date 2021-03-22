const Date = require("../../date/date.js");

const newsMaker = async ({ title, more }, files) => {
    const fileName = path.join(__dirname, "../../data", "newsData.json")
    const admin = await fs.readFile(fileName, "utf8");
    const parsed = JSON.parse(admin);

    const file = files.file;

    file.mv(path.join(__dirname, "/images", file.name), (err) => {
        console.log(err);
    })

    const data = {
        id: parsed.length + 1,
        title,
        more,
        img: files.img,
        date: [Date.month, Date.monthDay, Date.year, Date.startTime()]
    }

    parsed.unshift(data);

    await fs.writeFile(fileName, JSON.stringify(parsed, null, 4));

}

module.exports.newsMaker = newsMaker;