import  express from "express";
import bodyParser from "body-parser";
import CreateWallet from "./useCases/createWallet";



const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.post("/wallet", (req, res) => {
    const { name, limit } = req.body;
    const createWallet = new CreateWallet(name, limit);
    const wallet = createWallet.execute();
    res.send(wallet);
});


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
});