// const mongoose = require("mongoose");

// //testdb is name of database, it will automatically make it
// mongoose
//   .connect("mongodb+srv://eek1_db_user:Fashiondiva0@reverie.0znkakq.mongodb.net/?appName=Reverie")
//   .then(() => console.log("Connected to mongodb..."))
//   .catch((err) => console.error("could not connect ot mongodb...", err));

// const schema = new mongoose.Schema({
//   name: String,
// });

// async function createMessage() {
//   const result = await message.save();
//   console.log(result);
// }

// //this creates a Message class in our app
// const Message = mongoose.model("Message", schema);
// const message = new Message({
//   name: "Hello World",
// });

// createMessage();



//brewery api!!!

//READing data from json file!!
//npm i express
const express = require("express");
//to access this across browsers; npm i cors
const cors = require("cors"); 
//npm i multer
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

let womens = [
    {
        "_id": 9,
        "img_name":"womens7.jpg",
        "title":"Open Back Button-Down",
        "price":17,
        "features":["Open Back","Tie Back"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","6'"],
        "link":"#"
    },
    {
        "_id": 8,
        "img_name":"womens6.jpg",
        "title":"Chunky Knit Sweater",
        "price":60,
        "features":["Turtle Neck", "Over Sized Fit"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'4"],
        "link":"#"
    },
    {
        "_id": 7,
        "img_name":"womens5.jpg",
        "title":"Wrap Dress",
        "price":29,
        "features":["Rouched Waist","V-Neck Neckline"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["XS","5'10"],
        "link":"#"
    },
    {
        "_id": 6,
        "img_name":"womens4.jpg",
        "title":"Khaki Straight Leg Pants",
        "price":59,
        "features":["High Waisted"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'6"],
        "link":"#"
    },
    {
        "_id": 5,
        "img_name":"womens3.jpg",
        "title":"Metallic Lace Dress",
        "price":16,
        "features":["Ruffled Lace Collar", "Black Lining"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["XS","5'10"],
        "link":"#"
    },
    {
        "_id": 4,
        "img_name":"womens2.jpg",
        "title":"White Heeled Sandals",
        "price":49,
        "features":["Adjustable Ankle Strap"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["9","5'7"],
        "link":"#"
    },
    {
        "_id": 3,
        "img_name":"womens1.jpg",
        "title":"White Sneakers",
        "price":99,
        "features":["Platform Sole", "Memory Foam Insole"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["7 1/2", "5'9"],
        "link":"#"
    },
    {
        "_id":2,
        "img_name":"reveriePuffer.png",
        "title":"Pink Puffer",
        "price": 19,
        "features":["Zipper"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'7"],
        "link":"#"
    },
    {
        "_id": 1,
        "img_name":"reverieImgButtonDown.jpg",
        "title":"Brown Button-down",
        "price": 28,
        "features":["Light Brown Embroidered Detail", "Black Buttons"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S", "5'9"],
        "link":"/shop"
    }
]

let mens = [
  {

  }
]

let decor = [
  {

  }
]

app.get("/api/womens", (req,res)=>{
  res.send(womens);
});

app.get("/api/womens/:id", (req,res)=>{
  //if we have a one line arrow function, we dont need curly braces
  // === means same in type and value
  const women = womens.find((item)=>item._id===parseInt(req.params.id));
  res.send(women);
});

//listen for incoming requests
app.listen(3002, ()=>{
  //console log shows up in terminal!! (Bc backend)
  console.log("server is up and runningggg");
});