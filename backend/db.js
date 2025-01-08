const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://prajjwalajit:mickey123%40@cluster0.l5de4.mongodb.net/gofoodmern1?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected successfully to MongoDB");

        // Fetch food items and food categories concurrently using await
        const fetched_data = mongoose.connection.db.collection("food_items");
        const foodCategory = mongoose.connection.db.collection("foodCategory");

        const [foodItemsData, foodCategoryData] = await Promise.all([
            fetched_data.find({}).toArray(),
            foodCategory.find({}).toArray()
        ]);
        

        // Assign global variables only after both queries are successful
        global.food_items = foodItemsData || []; // Initialize as empty if no data
        global.foodCategory = foodCategoryData || []; // Initialize as empty if no data

    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data:", error);
        process.exit(1);
    }
};

module.exports = mongoDB;
