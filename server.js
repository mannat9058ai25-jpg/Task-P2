const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/DEV@Deakin"));

app.post("/subscribe", (req, res) => {
    const email = req.body.email;

    console.log("New subscriber:", email);

    res.status(200).json({
        message: "Subscription successful!"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});