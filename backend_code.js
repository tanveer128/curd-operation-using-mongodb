var express=require('express')
var app=express();
var mongoose=require('mongoose');
var port=3000;
var cors=require('cors')
mongoose.connect("mongodb://localhost:27017/mydb");
var schema=new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});
app.use(express.json());
var st =new mongoose.model("info2",schema);

app.use(cors());
app.post('/addstu',(req,res)=>{
    const {id, name, age } = req.body;
  const student = new st({ id, name, age });
     student.save();
   return  res.send({"msg" :"added sucessfully"});
})
app.get('/display', async (req, res) => {
   
    const stu=await st.find();
    res.json(stu);
});

app.get('/find/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    const s=await st.find({id: id});
    res.json(s);
})

app.put('/up/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const {name,age} = req.body;
    await st.findOneAndUpdate({id: id},{$set:{name: name,age:age}});
    console.log("updated----");
    return res.send({"updated":"one field updateed"});
})

app.delete('/del/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const cond={id : id};
    await st.deleteMany(cond);
    console.log("delete one item");
    return res.send("deleted one item");
})
app.listen(port,(err)=>{
    if(!err)
        console.log("successlful");
    else
        console.log("error"+err);
});