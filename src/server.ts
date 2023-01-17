import express, {NextFunction, Request, Response} from "express"

const app = express()

const init  = (port: number) => {
  app.use(express.json())
  app.get("/", (_req: Request, res: Response, _next: NextFunction  ) => {
   res.status(200).json({message: "hello"})
  })
  app.listen(port, () => console.log(`server started on ${port}`))
}
export { init }
