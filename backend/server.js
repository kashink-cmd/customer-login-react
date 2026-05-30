require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log("MongoDB Connection Error:");
    console.log(err);

});

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }

});

const Customer = mongoose.model("Customer", customerSchema);

app.post("/register", async (req, res) => {

    try {

        console.log("Received Data:");
        console.log(req.body);

        const customer = new Customer({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone

        });

        const savedCustomer = await customer.save();

        console.log("Saved Successfully:");
        console.log(savedCustomer);

        res.status(200).json({

            message: "Customer Stored Successfully"

        });

    }

    catch (error) {

        console.log("SAVE ERROR:");
        console.log(error);

        res.status(500).json({

            message: "Error storing customer"

        });

    }

});

app.get("/", (req, res) => {

    res.send("Backend Running Successfully");

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});