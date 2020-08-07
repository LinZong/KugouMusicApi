import { RequestHandler } from 'express-serve-static-core'
import { KugouMid } from '../Utils/encryptor'
import { request } from '../Utils/request';

const GetSongUrl : RequestHandler = async (req,res) => {
    const hash = decodeURIComponent(req.query.hash).toUpperCase();
    const mid = KugouMid();
    try {
        res.send(await request(`http://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=${hash}&mid=${mid}`, req.query.proxy));
    }
    catch(err) {
        res.status(502).send(err);
    }
}
export default GetSongUrl;
