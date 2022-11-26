const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path');
const app = express();

app.use(cors());
const engines = require("consolidate");

const dotenv = require('dotenv');

dotenv.config();

connectDB();

app.use(express.json({limit: '50mb'}));
app.use(express.json({ extended: false }));
app.engine("ejs", engines.ejs);




// app.get('/',(req,res) =>{
//     res.send("Login Details");
// });

app.use('/v1', require('./routes/api/login'));




// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));                                            

  app.get('*', (req, res) => {
    
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
  });
}
const PORT = process.env.PORT||8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
































// app.set("views", "./views");
// app.set("view engine", "ejs");
// const options = {
// 	definition: {
// 		openapi: "3.0.2",
// 		info: {
// 			title: "Mentor API",
// 			version: "1.0.0",
// 			description: "A node express mentor API",
// 		},
// 		servers: [
// 			{
// 				url: "localhost:3000",
// 			},
// 		],
// 	},
// 	apis: ["./routes/api/*.js"],
// };