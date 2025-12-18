const app = require('./index');
const dotenv = require('dotenv');
const cors = require('cors');

const mongoose = require('mongoose');

dotenv.config({path:"./config.env"});
console.log(process.env.DB_URL);
app.use(cors());
mongoose.connect(process.env.DB_URL)
.then(() => console.log("DATABASE SUCCESSFULLY CONNECTED"))
.catch(err => console.error(err));

app.listen(process.env.PORT_NO, () => {
    console.log(`Server is running on port ${process.env.PORT_NO}`);
});