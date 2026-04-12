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
//npm i joi
const Joi = require("joi");
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

let items = [
  {
        "_id": 9,
        "img_name":"womens7.jpg",
        "title":"Open Back Button-Down",
        "price":17,
        "features":["Open Back","Tie Back"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","6'"],
        "category":"womens"
    },
    {
        "_id": 8,
        "img_name":"womens6.jpg",
        "title":"Chunky Knit Sweater",
        "price":60,
        "features":["Turtle Neck", "Over Sized Fit"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'4"],
        "category":"womens"
    },
    {
        "_id": 7,
        "img_name":"womens5.jpg",
        "title":"Wrap Dress",
        "price":29,
        "features":["Rouched Waist","V-Neck Neckline"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["XS","5'10"],
        "category":"womens"
    },
    {
        "_id": 6,
        "img_name":"womens4.jpg",
        "title":"Khaki Straight Leg Pants",
        "price":59,
        "features":["High Waisted"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'6"],
        "category":"womens"
    },
    {
        "_id": 5,
        "img_name":"womens3.jpg",
        "title":"Metallic Lace Dress",
        "price":16,
        "features":["Ruffled Lace Collar", "Black Lining"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["XS","5'10"],
        "category":"womens"
    },
    {
        "_id": 4,
        "img_name":"womens2.jpg",
        "title":"White Heeled Sandals",
        "price":49,
        "features":["Adjustable Ankle Strap"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["9","5'7"],
        "category":"womens"
    },
    {
        "_id": 3,
        "img_name":"womens1.jpg",
        "title":"White Sneakers",
        "price":99,
        "features":["Platform Sole", "Memory Foam Insole"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["7 1/2", "5'9"],
        "category":"womens"
    },
    {
        "_id":2,
        "img_name":"reveriePuffer.png",
        "title":"Pink Puffer",
        "price": 19,
        "features":["Zipper"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'7"],
        "category":"womens"
    },
    {
        "_id": 1,
        "img_name":"reverieImgButtonDown.jpg",
        "title":"Brown Button-down",
        "price": 28,
        "features":["Light Brown Embroidered Detail", "Black Buttons"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S", "5'9"],
        "category":"womens"
    },
    {
        "_id": 18,
        "img_name":"mens1.jpg",
        "title":"Navy Windbreaker",
        "price":55,
        "features":["Quarter Zip","Quarter Buttons"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","6'"],
        "category":"mens"
    },
    {
        "_id": 17,
        "img_name":"mens2.jpg",
        "title":"White T-Shirt",
        "price":15,
        "features":["Turtle Neck", "Over Sized Fit"],
        "care":["Cotton", "Machine wash"],
        "size_fit":["S","5'8"],
        "category":"mens"
    },
    {
        "_id": 16,
        "img_name":"mens3.jpg",
        "title":"Stone-Wash Jeans",
        "price":79,
        "features":["Straight leg"],
        "care":["Demin", "Machine wash"],
        "size_fit":["M","5'10"],
        "category":"mens"
    },
    {
        "_id": 15,
        "img_name":"mens4.jpg",
        "title":"Denim Jacket",
        "price":58,
        "features":["Button-Down"],
        "care":["Denim", "Machine wash"],
        "size_fit":["M","5'9"],
        "category":"mens"
    },
    {
        "_id": 14,
        "img_name":"mens5.jpg",
        "title":"Short Sleeved Button Down",
        "price":28,
        "features":["Chest Pockets", "Button Down"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["M","5'10"],
        "category":"mens"
    },
    {
        "_id": 13,
        "img_name":"mens6.jpg",
        "title":"Gray Striped Blazer Jacket",
        "price":39,
        "features":["Decorative Front Buttons", "Front Pocket"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["M","5'7"],
        "category":"mens"
    },
    {
        "_id": 12,
        "img_name":"mens7.jpg",
        "title":"Puffer Jacket",
        "price":60,
        "features":["Faux Fur Collar", "Zip-up Closure"],
        "care":["Nylon", "Machine wash"],
        "size_fit":["M", "5'9"],
        "category":"mens"
    },
    {
        "_id":11,
        "img_name":"mens8.jpg",
        "title":"Burnt Orange T-Shirt",
        "price": 20,
        "features":["Over Sized Fit", "Raw Hem"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","5'7"],
        "category":"mens"
    },
    {
        "_id": 10,
        "img_name":"mens9.jpg",
        "title":"Sweater",
        "price": 39,
        "features":["V-Neck collar"],
        "care":["Cashmere", "Hand-wash only"],
        "size_fit":["M", "5'9"],
        "category":"mens"
    },
    {
        "_id": 19,
        "img_name":"home9.jpg",
        "title":"Coffee Table Assortment",
        "price":79,
        "features":["Three Piece"],
        "category":"decor"
    },
    {
        "_id": 20,
        "img_name":"home8.jpg",
        "title":"Wired Light",
        "price":17,
        "features":["Wall Plug In", "Hanger"],
        "category":"decor"
    },
    {
        "_id": 21,
        "img_name":"home7.jpg",
        "title":"Woven Table Map",
        "price":13,
        "features":["Multicolored", "24in. Diameter"],
        "category":"decor"
    },
    {
        "_id": 22,
        "img_name":"home6.jpg",
        "title":"Square Wall Shelves",
        "price":40,
        "features":["Four Piece"],
        "category":"decor"
    },
    {
        "_id": 23,
        "img_name":"home5.jpg",
        "title":"Woven Chevron Hamper",
        "price":24,
        "features":["Side Handles"],
        "category":"decor"
    },
    {
        "_id": 24,
        "img_name":"home4.jpg",
        "title":"Decorative Mosaic tea Kettle",
        "price":29,
        "features":["Mosaic Inpired Pattern", "Removeable Lid"],
        "category":"decor"
    },
    {
        "_id": 25,
        "img_name":"home3.jpg",
        "title":"Wide Pot",
        "price":16,
        "features":["Saucer Dish Included", "10in. Long"],
        "category":"decor"
    },
    {
        "_id":26,
        "img_name":"home2.jpg",
        "title":"Textured Pot",
        "price": 35,
        "features":["Leaf-inspired texture", "25in. Diameter"],
        "category":"decor"
    },
    {
        "_id": 27,
        "img_name":"home1.jpg",
        "title":"Ceramic Pitcher Vase",
        "price": 28,
        "features":["Floral Painting"],
        "category":"decor"
    }
]

// let womens = [
//     {
//         "_id": 9,
//         "img_name":"womens7.jpg",
//         "title":"Open Back Button-Down",
//         "price":17,
//         "features":["Open Back","Tie Back"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","6'"],
//         "link":"#"
//     },
//     {
//         "_id": 8,
//         "img_name":"womens6.jpg",
//         "title":"Chunky Knit Sweater",
//         "price":60,
//         "features":["Turtle Neck", "Over Sized Fit"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","5'4"],
//         "link":"#"
//     },
//     {
//         "_id": 7,
//         "img_name":"womens5.jpg",
//         "title":"Wrap Dress",
//         "price":29,
//         "features":["Rouched Waist","V-Neck Neckline"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["XS","5'10"],
//         "link":"#"
//     },
//     {
//         "_id": 6,
//         "img_name":"womens4.jpg",
//         "title":"Khaki Straight Leg Pants",
//         "price":59,
//         "features":["High Waisted"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","5'6"],
//         "link":"#"
//     },
//     {
//         "_id": 5,
//         "img_name":"womens3.jpg",
//         "title":"Metallic Lace Dress",
//         "price":16,
//         "features":["Ruffled Lace Collar", "Black Lining"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["XS","5'10"],
//         "link":"#"
//     },
//     {
//         "_id": 4,
//         "img_name":"womens2.jpg",
//         "title":"White Heeled Sandals",
//         "price":49,
//         "features":["Adjustable Ankle Strap"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["9","5'7"],
//         "link":"#"
//     },
//     {
//         "_id": 3,
//         "img_name":"womens1.jpg",
//         "title":"White Sneakers",
//         "price":99,
//         "features":["Platform Sole", "Memory Foam Insole"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["7 1/2", "5'9"],
//         "link":"#"
//     },
//     {
//         "_id":2,
//         "img_name":"reveriePuffer.png",
//         "title":"Pink Puffer",
//         "price": 19,
//         "features":["Zipper"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","5'7"],
//         "link":"#"
//     },
//     {
//         "_id": 1,
//         "img_name":"reverieImgButtonDown.jpg",
//         "title":"Brown Button-down",
//         "price": 28,
//         "features":["Light Brown Embroidered Detail", "Black Buttons"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S", "5'9"],
//         "link":"/shop"
//     }
// ]

// let mens = [
//         {
//         "_id": 18,
//         "img_name":"mens1.jpg",
//         "title":"Navy Windbreaker",
//         "price":55,
//         "features":["Quarter Zip","Quarter Buttons"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","6'"],
//         "link":"#"
//     },
//     {
//         "_id": 17,
//         "img_name":"mens2.jpg",
//         "title":"White T-Shirt",
//         "price":15,
//         "features":["Turtle Neck", "Over Sized Fit"],
//         "care":["Cotton", "Machine wash"],
//         "size_fit":["S","5'8"],
//         "link":"#"
//     },
//     {
//         "_id": 16,
//         "img_name":"mens3.jpg",
//         "title":"Stone-Wash Jeans",
//         "price":79,
//         "features":["Straight leg"],
//         "care":["Demin", "Machine wash"],
//         "size_fit":["M","5'10"],
//         "link":"#"
//     },
//     {
//         "_id": 15,
//         "img_name":"mens4.jpg",
//         "title":"Denim Jacket",
//         "price":58,
//         "features":["Button-Down"],
//         "care":["Denim", "Machine wash"],
//         "size_fit":["M","5'9"],
//         "link":"#"
//     },
//     {
//         "_id": 14,
//         "img_name":"mens5.jpg",
//         "title":"Short Sleeved Button Down",
//         "price":28,
//         "features":["Chest Pockets", "Button Down"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["M","5'10"],
//         "link":"#"
//     },
//     {
//         "_id": 13,
//         "img_name":"mens6.jpg",
//         "title":"Gray Striped Blazer Jacket",
//         "price":39,
//         "features":["Decorative Front Buttons", "Front Pocket"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["M","5'7"],
//         "link":"#"
//     },
//     {
//         "_id": 12,
//         "img_name":"mens7.jpg",
//         "title":"Puffer Jacket",
//         "price":60,
//         "features":["Faux Fur Collar", "Zip-up Closure"],
//         "care":["Nylon", "Machine wash"],
//         "size_fit":["M", "5'9"],
//         "link":"#"
//     },
//     {
//         "_id":11,
//         "img_name":"mens8.jpg",
//         "title":"Burnt Orange T-Shirt",
//         "price": 20,
//         "features":["Over Sized Fit", "Raw Hem"],
//         "care":["Rayon, Cotton", "Machine wash"],
//         "size_fit":["S","5'7"],
//         "link":"#"
//     },
//     {
//         "_id": 10,
//         "img_name":"mens9.jpg",
//         "title":"Sweater",
//         "price": 39,
//         "features":["V-Neck collar"],
//         "care":["Cashmere", "Hand-wash only"],
//         "size_fit":["M", "5'9"],
//         "link":"/shop"
//     }
// ]

// let decor = [
//         {
//         "_id": 19,
//         "img_name":"home9.jpg",
//         "title":"Coffee Table Assortment",
//         "price":79,
//         "features":["Three Piece"]
//     },
//     {
//         "_id": 20,
//         "img_name":"home8.jpg",
//         "title":"Wired Light",
//         "price":17,
//         "features":["Wall Plug In", "Hanger"]
//     },
//     {
//         "_id": 21,
//         "img_name":"home7.jpg",
//         "title":"Woven Table Map",
//         "price":13,
//         "features":["Multicolored", "24in. Diameter"]
//     },
//     {
//         "_id": 22,
//         "img_name":"home6.jpg",
//         "title":"Square Wall Shelves",
//         "price":40,
//         "features":["Four Piece"]
//     },
//     {
//         "_id": 23,
//         "img_name":"home5.jpg",
//         "title":"Woven Chevron Hamper",
//         "price":24,
//         "features":["Side Handles"]
//     },
//     {
//         "_id": 24,
//         "img_name":"home4.jpg",
//         "title":"Decorative Mosaic tea Kettle",
//         "price":29,
//         "features":["Mosaic Inpired Pattern", "Removeable Lid"]
//     },
//     {
//         "_id": 25,
//         "img_name":"home3.jpg",
//         "title":"Wide Pot",
//         "price":16,
//         "features":["Saucer Dish Included", "10in. Long"]
//     },
//     {
//         "_id":26,
//         "img_name":"home2.jpg",
//         "title":"Textured Pot",
//         "price": 35,
//         "features":["Leaf-inspired texture", "25in. Diameter"]
//     },
//     {
//         "_id": 27,
//         "img_name":"home1.jpg",
//         "title":"Ceramic Pitcher Vase",
//         "price": 28,
//         "features":["Floral Painting"]
//     }
// ]

let quickShop = [
  [
    {
       "_id": 28,
      "img_name":"reverie11_cropped.png",
      "title":"Chunky Knit Sweater",
      "price":60,
      "features":["Turtle Neck", "Over Sized Fit"],
      "care":["Rayon, Cotton", "Machine wash"],
      "size_fit":["S","5'4"],
      "link":"#"
    },
    {
      "_id": 29,
        "img_name":"reverie15_cropped.png",
        "title":"White Heeled Sandals",
        "price":49,
        "features":["Adjustable Ankle Strap"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["9","5'7"],
        "link":"#"
    },
    {
      "_id": 30,
        "img_name":"reverie16_cropped.png",
        "title":"Navy Windbreaker",
        "price":55,
        "features":["Quarter Zip","Quarter Buttons"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S","6'"],
        "link":"#"
    }
  ],
  [
    {
      "_id": 31,
        "img_name":"mens3_cropped.jpg",
        "title":"Stone-Wash Jeans",
        "price":79,
        "features":["Straight leg"],
        "care":["Demin", "Machine wash"],
        "size_fit":["M","5'10"],
        "link":"#"
    },
    {
        "_id": 32,
        "img_name":"reverie2_cropped.jpg",
        "title":"White Sneakers",
        "price":99,
        "features":["Platform Sole", "Memory Foam Insole"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["7 1/2", "5'9"],
        "link":"#"
    },
    {
       "_id": 33,
        "img_name":"reverie5_cropped.jpg",
        "title":"Brown Button-down",
        "price": 28,
        "features":["Light Brown Embroidered Detail", "Black Buttons"],
        "care":["Rayon, Cotton", "Machine wash"],
        "size_fit":["S", "5'9"],
        "link":"/shop"
    }
  ]
]

//items
app.get("/api/items", (req,res)=>{
  res.send(items);
});

app.get("/api/items/:id", (req,res)=>{
  //if we have a one line arrow function, we dont need curly braces
  // === means same in type and value
  const items = items.find((item)=>item._id===parseInt(req.params.id));
  res.send(items);
});

// POST
app.post("api/items", upload.single("img"), (req,res)=>{
  console.log("In post request");
  console.log(req.body);

  const results = validateItem(req.body);
  if(result.error) {
    console.log("Error in validation");
    response.status(400).send(result.error.details[0].message);
    return;
  }
  console.log("Passed Validation!!");

  const item = {
    _id:items.Length+1,
    title:req.body.title,
    price:req.body.price,
    features:req.body.features,
    care:req.body.features,
    size_fit:req.body.size_fit
  }
  //adding img
  if(req.file){
    item.img_name = req.file.filename;
  }

  //adding to array
  womens.push(item);
  // console.log(womens);
  response.status(200).send(item);
});


// womens
// app.get("/api/womens", (req,res)=>{
//   res.send(womens);
// });

// app.get("/api/womens/:id", (req,res)=>{
//   //if we have a one line arrow function, we dont need curly braces
//   // === means same in type and value
//   const women = womens.find((item)=>item._id===parseInt(req.params.id));
//   res.send(women);
// });

// mens
// app.get("/api/mens", (req,res)=>{
//   res.send(mens);
// });

// app.get("/api/mens/:id", (req,res)=>{
//   //if we have a one line arrow function, we dont need curly braces
//   // === means same in type and value
//   const men = mens.find((item)=>item._id===parseInt(req.params.id));
//   res.send(men);
// });

// decor
// app.get("/api/decor", (req,res)=>{
//   res.send(decor);
// });

// app.get("/api/decor/:id", (req,res)=>{
//   //if we have a one line arrow function, we dont need curly braces
//   // === means same in type and value
//   const item = decor.find((item)=>item._id===parseInt(req.params.id));
//   res.send(item);
// });

// quickshop
app.get("/api/quickShop", (req,res)=>{
  res.send(quickShop);
});

app.get("/api/quickShop/:id", (req,res)=>{
  //if we have a one line arrow function, we dont need curly braces
  // === means same in type and value
  const item = quickShop.find((item)=>item._id===parseInt(req.params.id));
  res.send(item);
});

// // POST
// app.post("api/womens", upload.single("img"), (req,res)=>{
//   console.log("In post request");
//   console.log(req.body);

//   const results = validateItem(req.body);
//   if(result.error) {
//     console.log("Error in validation");
//     response.status(400).send(result.error.details[0].message);
//     return;
//   }
//   console.log("Passed Validation!!");

//   const item = {
//     _id:womens.Length+1,
//     title:req.body.title,
//     price:req.body.price,
//     features:req.body.features,
//     care:req.body.features,
//     size_fit:req.body.size_fit
//   }
//   //adding img
//   if(req.file){
//     item.img_name = req.file.filename;
//   }

//   //adding to array
//   womens.push(item);
//   // console.log(womens);
//   response.status(200).send(item);
// });

const validateItem = (item) => {
  const schema = Joi.object({
    // for next week
    _id:Joi.allow(""),
    title:Joi.string().min(3).required,
    price:Joi.number().required(),
    features:Joi.string().required(),
    care:Joi.string(),
    size_fit:Joi.string()
  });
  return schema.validate(item);
};

//listen for incoming requests
app.listen(3002, ()=>{
  //console log shows up in terminal!! (Bc backend)
  console.log("server is up and runningggg");
});