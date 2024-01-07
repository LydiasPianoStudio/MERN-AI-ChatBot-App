import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connecions and listeners
connectToDatabase().then(() => {
    app.listen(5000, () => console.log("Server Open Connected & to Database! Tee HEE HEE"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map