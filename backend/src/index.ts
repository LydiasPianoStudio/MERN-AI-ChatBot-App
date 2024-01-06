import express from "express";

const app = express();


// GET -
// PUT -
// POST -
// DELETE -

app.get("/hello", (req, res, next) => {
    return res.send("Hello");
});

app.listen(5000, () => console.log("Open Server"));












