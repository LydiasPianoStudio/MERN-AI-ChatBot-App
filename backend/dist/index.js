import express from "express";
const app = express();
// GET -
// PUT -
// POST -
// DELETE -
app.use(express.json());
app.delete("/user/:id", (req, res, next) => {
    console.log(req.params.id);
    return res.send("Hello");
});
app.listen(5000, () => console.log("Server Open"));
//# sourceMappingURL=index.js.map