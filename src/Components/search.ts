import { RequestHandler } from 'express-serve-static-core'
import { request } from '../Utils/request'

const Search : RequestHandler = async (req,res) => {
    const keywords = decodeURIComponent(req.query.keywords);
    try {
        res.send(await request(`http://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(keywords)}&page=1&pagesize=30`, req.query.proxy));
    }
    catch(err) {
        res.status(502).send(err);
    }
}
export default Search;
