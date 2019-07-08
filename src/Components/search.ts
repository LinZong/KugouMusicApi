import axio from 'axios'
import { RequestHandler } from 'express-serve-static-core'

const Search : RequestHandler = async (req,res) => {
    const keywords = decodeURIComponent(req.query.keywords);
    try {
        res.send((await axio.get('http://songsearch.kugou.com/song_search_v2',{
            params:{
                keyword : keywords,
                page : 1,
                pagesize : 30
            }
        })).data);
    }
    catch(err) {
        res.status(502).send(err);
    }
}
export default Search;