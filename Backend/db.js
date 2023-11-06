const mongoose=require('mongoose')
const mongoURI='mongodb+srv://ojesvibehal15:ojesvi123@cluster0.0zyxoic.mongodb.net/FoodDelivery?retryWrites=true&w=majority'
const {MongoClient}=require('mongodb')

const connectToMongo = async () => {
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
      if(err)console.log(err)
    else
    {
      console.log("connected")
      const fetched_data=await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function(err,data){
        const foodCategory=await mongoose.connection.db.collection("food_category")
        foodCategory.find({}).toArray(function(err,Catdata){
          if(err)console.log(err)
            else{
          global.food_items=data
          global.food_category=Catdata

          // console.log(global.food_items);
          }
        })
      })
      //   if(err)console.log(err)
      //   else{
      // global.food_items=data
      // // console.log(global.food_items);
      // }
      // })
    };
  })
}
  module.exports = connectToMongo;
  