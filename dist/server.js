import { createServer } from 'node:http';
import { json } from './middlewares/json';
import { Request } from './utils/request';
import { routes } from './routes';
import { extractQueryParams } from './utils/extract-query-params';
const server = createServer({ IncomingMessage: Request }, async (req, res) => {
    const { method, url } = req;
    await json(req, res);
    const route = routes.find(route => {
        return route.method === method && route.path.test(url ?? '');
    });
    if (route && req.url) {
        const routeParams = req.url.match(route.path);
        if (routeParams?.groups?.query) {
            const { query, ...params } = routeParams?.groups;
            req.params = params;
            req.query = query ? extractQueryParams(query) : {};
            return route.handler(req, res);
        }
    }
    return res.writeHead(404).end();
});
server.listen(3333);
