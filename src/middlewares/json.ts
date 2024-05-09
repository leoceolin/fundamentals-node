import { MyIncomingMessageProps } from "../server"

export async function json(req: MyIncomingMessageProps, res: any) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}
