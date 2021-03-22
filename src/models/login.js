const fs = require("fs").promises;
const path = require("path");

const checkUser = async ({ username, password }) => {

    const file = path.join(__dirname, "../../data", "data.json")
    const admin = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(admin);

    const found = parsed.find(user => user.username === username && user.password === password)

    return found
}

module.exports.checkUser = checkUser;