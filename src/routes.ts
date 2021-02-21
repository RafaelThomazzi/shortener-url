import { Router, Request, Response } from 'express'
import { getUrls, shortener, redirect } from './controller/UrlController'
const routes = Router()

routes.get('/', (_req: Request, res: Response) => {
    return res.send("wiser-api is running")
})

routes.get('/urls', getUrls);
routes.post('/encurtador', shortener);
routes.get('/:short_url', redirect);

export default routes