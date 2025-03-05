import {createServer} from 'node:http'
import sirv from 'sirv'

import template from '../dist/client/index.html?raw'
import render from './render'

const PORT = Number(process.env.PORT) || 5173
const serve = sirv('../client')

createServer(async (req: any, res: any) => {
  console.log(req.url)

  serve(req, res, async () => {
    const {
      body,
      headers,
      statusCode = 200,
      statusMessage
    } = await render({
      headers: req.headers,
      template: template,
      url: req.url,
    } as any) as any;

    if (statusMessage) {
      res.statusMessage = statusMessage
    }

    res.writeHead(statusCode, headers)
    res.end(body)
  })
}).listen(PORT)

console.log(`Server running at http://localhost:${PORT}`)
