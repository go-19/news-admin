const fs = require("fs").promises;
const path = require("path");

module.exports = {
    GET: async (_, res) => {

        const file = path.join(__dirname, "../../data", "newsData.json")
        const admin = await fs.readFile(file, "utf8");
        const parsed = JSON.parse(admin);

        res.render("more", {
            data: parsed
        })
    }
}