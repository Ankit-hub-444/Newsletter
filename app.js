const express=require("express");
const bodyParser =require("body-parser");
const https=require("https");
const request=require("request");
const app=express();
const port=3000;

app.use(express.static("publicimages"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    console.log(firstname, lastname, email);

    const data={
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstname,
            LNAME:lastname
          }
        }
      ]
    };

    const jsonData=JSON.stringify(data);

    const url= "https://us1.api.mailchimp.com/3.0/lists/66b902fd6f";

    const options={
      method:"post",
      auth:"ankit444:d244d5aed94f9d7a03484aa467bbfb4f-us1"
    };

  const request=  https.request(url,options, function(response){

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");

  }

      response.on("data",function(data){
        console.log(JSON.parse(data));
      })


    });

   request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ||port,function(){
  console.log(`Server is running at http://localhost:${port}`)
});


//Api key
//d244d5aed94f9d7a03484aa467bbfb4f-us1
//list // ID
//66b902fd6f
