
const User = require("./schema");

const reader = require('xlsx')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kropbook', {
    useNewUrlParser: true,

});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const seedDB = async () => {
    await User.deleteMany({});

    // Reading our test file
    const file = reader.readFile('./database.xlsx')

    let data = []

    const sheets = file.SheetNames
    // console.log(sheets.length)
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    // Printing data
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        const userr = new User(
            data[i])

        await userr.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})