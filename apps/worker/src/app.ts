import Koa from "koa"

import { registerApolloServer } from "@/graphql"
import { createRouter } from "@/rest"

export const createApp = async () => {
  const app = new Koa()

  const router = await createRouter()
  app.use(router.routes()).use(router.allowedMethods())

  await registerApolloServer(app)

  return app
}
