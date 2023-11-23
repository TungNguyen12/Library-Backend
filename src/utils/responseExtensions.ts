import { type Express, type Response } from 'express'

export interface ExtendedResponse extends Response {
  ok: (data: any) => Response
  created: (data: any) => Response
  deleted: () => Response
}
declare module 'express-serve-static-core' {
  interface Response {
    ok: (data: any) => Response
    created: (data: any) => Response
    deleted: () => Response
  }
}

export function extendResponse(express: Express): void {
  const res = express.response

  res.ok = function (data: any): Response {
    return this.status(200).json(data)
  }

  res.created = function (data: any): Response {
    return this.status(201).json(data)
  }

  res.deleted = function (): Response {
    return this.status(204).send()
  }
}
