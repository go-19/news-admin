const fs = require("fs").promises;
const path = require("path");

module.exports = {
    GET: async (req, res) => {

        const file = path.join(__dirname, "../../data", "newsData.json")
        const admin = await fs.readFile(file, "utf8");
        const parsed = JSON.parse(admin);
    
        const found = parsed.find(item => item.id === Number(req.params.id));
    
        res.render("read-more", {
            newsObj: found
        })
    }
}