const fs = require("fs").promises;
const path = require("path");

const create = async ({ name, username, password }) => {

  const file = path.join(__dirname, "../../data", "data.json")
  const admin = await fs.readFile(file, "utf8");
  const parsed = JSON.parse(admin);

  parsed.unshift({ id: parsed.length + 1, name, username, password })

  await fs.writeFile(file, JSON.stringify(parsed, null, 4));

  return parsed;  
}

module.exports.create = create;