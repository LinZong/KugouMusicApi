import axio from 'axios'
import { RequestHandler } from 'express-serve-static-core'
import { KugouMid } from '../Utils/encryptor'

const GetSongUrl : RequestHandler = async (req,res) => {
    const hash = decodeURIComponent(req.query.hash).toUpperCase();
    const mid = KugouMid();
    try {
        res.send((await axio.get('https://wwwapi.kugou.com/yy/index.php',{
            params:{
                r : 'play/getdata',
                hash: hash,
                mid: mid
            }
        })).data);
    }
    catch(err) {
        res.status(502).send(err);
    }
}
export default GetSongUrl;
