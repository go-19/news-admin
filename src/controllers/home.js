const fs = require("fs").promises;

module.exports = {

    GET: async (_, res) => {
    
        const news = await fs.readFile("./data/newsData.json", "utf8");
        const parsed = JSON.parse(news);
    
        let cut = parsed.splice(0, 6);
    
        res.render("index", {
            data: cut
        })
    }
}