const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/customerDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const customerSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    phone: String

});

const Customer = mongoose.model("Customer", customerSchema);

app.post("/register", async (req, res) => {

    try {

        const customer = new Customer(req.body);

        await customer.save();

        res.json({
            message: "Customer Stored Successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Error storing customer"
        });

    }

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});