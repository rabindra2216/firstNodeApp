let express = require("express");
//const { studentsData } = require("./studentData");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
//const port = 2410;
var port=process.env.PORT || 2410;
app.listen(port, () =>console.log(`Node app listening on port ${port}!`));
let {cars,carMaster}=require('./carsData')
app.get('/cars/:id',function(req,res){
     let id=req.params.id;
     let car=cars.find(st=>st.id===id);
     if(car) {
       //res.send(students[2]);
        res.send(car);
    }
     else{ res.status(404).send('No Car Found')
}
})
app.get('/svr/students/course/:name',function(req,res){
    let name=req.params.name;
    let arr1=students.filter(st=>st.course===name);
     res.send(arr1);
})
app.get('/cars',function(req,res){
    let sort=req.query.sort;
    let type=req.query.type;
    let fuel=req.query.fuel;
    let minprice=req.query.minprice;
    let maxprice=req.query.maxprice;
    console.log('Query=',req.query)
    let arr1=cars ;
    if(fuel)
    {
        arr1=arr1.filter(st=>(carMaster.find(c1=>c1.model===st.model)).fuel===fuel);
    }
    if(type){
        arr1=arr1.filter(st=>(carMaster.find(c1=>c1.model===st.model)).type===type);
    }
    if(minprice){
        arr1=arr1.filter(st=>st.price>=minprice)
  }
  if(maxprice){
    arr1=arr1.filter(st=>st.price<=maxprice)
}
    if(sort==='kms'){
          arr1.sort((st1,st2)=>st1.kms-st2.kms);
    }
    if(sort==='price'){
        arr1.sort((st1,st2)=>st1.price-st2.price);
  }
  if(sort==='year'){
    arr1.sort((st1,st2)=>st1.year-st2.year);
}
     res.send(arr1);
})
app.post("/cars", function (req, res) {
    let body = req.body; 
    console.log(body);
    let newCar = {...body };
    cars.push(newCar);
    res.send(newCar);
    });
    app.put("/cars/:id", function (req, res) {
        let id = req.params.id;
        let body= req.body;
        let index = cars.findIndex((st)=> st.id === id);
        if(index>=0){
        let updatedCar = {...body };
        cars[index] = updatedCar;
        res.send(updatedCar);
        }
        else res.status(404).send('No Car found!');
        });
    app.delete("/cars/:id", function (req, res) {
            let id = req.params.id; 
            let index = cars.findIndex ((st) => st.id === id);
            if(index>=0){
             let deletedCar = cars.splice (index, 1); 
             res.send(deletedCar)
            }
            else res.status(404).send('No Car found!');
    });