import express, {Request, Response, Express} from 'express';
import dotenv from "dotenv";
import { Server } from 'http';
dotenv.config();

const port: String = process.env.PORT || '2024';
const app: Express = express();

app.use("/", (_, res: Response) =>{
    res.send("Hi you are in wrong window").status(200);
})

app.listen(port, () => {
    console.log(`App is running on Port ${port}`);
})