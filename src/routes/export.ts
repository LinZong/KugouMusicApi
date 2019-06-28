import * as express from 'express'
import { Router } from 'express-serve-static-core'
import * as path from 'path'
//import components
import * as fs from 'fs'

const KugouApiRouter : Router = express.Router();
fs.readdirSync(path.join(__dirname, '..','Components')).forEach(file => {
    if(!/(\.js$|\.ts$|\.tsx$)/.test(file)) return;
    console.log('Loaded router : ', file);
    const modulez = require(path.join(__dirname, '..','Components',file));
    KugouApiRouter.use('/'+file.replace(/(\.js$|\.ts$|\.tsx$)/i,''),modulez.default)
})

export { KugouApiRouter }