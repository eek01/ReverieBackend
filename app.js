require("dotenv").config();
//npm i mongoose
const mongoose = require("mongoose");
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
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const category = req.body.category; 
      cb(null, `./public/images/${category}`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

  const itemSchema = new mongoose.Schema({
    //mongodb does id management
    img_name:String,
    title:String,
    price:Number,
    featues:[String],
    care:[String],
    size_fit:[String],
    category:String
  });

  const Item = mongoose.model("Item", itemSchema);

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
app.get("/api/items",async(req,res)=>{
  const items = await Item.find()
  res.send(items);
});

app.get("/api/items/:id",async(req,res)=>{
  //if we have a one line arrow function, we dont need curly braces
  // === means same in type and value
  const itemId = await Item.findById(req.params.id);

  res.send(itemId);
});

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

// POST
app.post("/api/items", upload.single("img"),async(req,res)=>{
  const result = validateItem(req.body);
  console.log(req.body);

  if(result.error) {
    console.log("Error in validation");
    res.status(400).send(result.error.details[0].message);
    return;
  }
  console.log("Passed Validation!!");
  console.log(req.body);

  const item = new Item({
    title:req.body.title,
    price:req.body.price,
    features:req.body.features,
    care:req.body.care ? req.body.care.split(",") : [],
    size_fit:req.body.size_fit ? req.body.size_fit.split(",") : [],
    category:req.body.category
  });
  //adding img
  if(req.file){
    item.img_name = req.file.filename;
  }

  //adding to array
  const newItem = await item.save();
  res.status(200).send(newItem);
});

//EDIT CODE
app.put("/api/items/:id", upload.single("img"), async(req,res)=>{
  console.log("In put");

  const result = validateItem(req.body);

  if(result.error){
    console.log("Error in validation");
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const fieldsToUpdate = {
    title:req.body.title,
    price:req.body.price,
    features: req.body.features?(Array.isArray(req.body.features)?req.body.features:[req.body.features]):[],
    care:req.body.care ? req.body.care.split(",") : [],
    size_fit:req.body.size_fit ? req.body.size_fit.split(",") : [],
    category:req.body.category
  }

  if(req.file){
    fieldsToUpdate.img_name = req.file.filename;
  }

  const success = await Item.updateOneitem({_id:req.params.id}, fieldsToUpdate);

  if(!success) {
    res.status(404).send("We couldn't find that item");
  } else {
    const item = await Item.findById(req.params.id);
    res.status(200).send(item);
  }
});

app.delete("/api/items/:id", async(req,res)=>{
  const item = await Item.findByIdAndDelete(req.params.id);

  if(!item){
    res.status(404).send("The item you wanted to delete is not available");
    return;
  }
  res.status(200).send(item);
});

const validateItem = (item) => {
  const schema = Joi.object({
    // for next week
    _id:Joi.allow(""),
    title:Joi.string().min(3).required(),
    price:Joi.number().required(),
    features: Joi.array().items(Joi.string()).required(),
    care:Joi.string(),
    size_fit:Joi.string(),
    category:Joi.string().required()
  });
  return schema.validate(item);
};

//listen for incoming requests
app.listen(3002, ()=>{
  //console log shows up in terminal!! (Bc backend)
  console.log("server is up and runningggg");
});