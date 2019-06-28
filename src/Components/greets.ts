import { RequestHandler,Response } from 'express-serve-static-core'

const Greets : RequestHandler = async (req,res) => {
    res.send("Hello! Express!");
};

export default Greets;