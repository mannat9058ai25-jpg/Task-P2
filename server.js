
require("dotenv").config();

const express = require("express");
const { Resend } = require("resend");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/DEV@Deakin"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/subscribe", async (req, res) => {
    try {
        const email = req.body?.email?.trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: "Welcome to our newsletter!",
            html: `
                <h2>Welcome to our newsletter!</h2>
                <p>Thank you for subscribing!</p>
            `
        });

        if (error) {
            console.error("Resend error:", error);
            return res.status(500).json({
                message: "Email could not be sent."
            });
        }

        console.log("New subscriber:", email);
        console.log("Email sent successfully:", data.id);

        return res.status(200).json({
            message: "Subscription successful! Welcome email sent."
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            message: "Something went wrong."
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
