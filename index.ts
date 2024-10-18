import express, { Express, Request, Response} from "express"
import dotenv from "dotenv"
import * as database from "./config/database"

dotenv.config()
database.connect() //-goi ham connect

const app: Express = express()
const port: number | string = process.env.PORT || 3000

//-pug view
app.set("views", "./views") //-xet thu muc views
app.set("view engine", "pug") //- V s/d: pug
//-end pug view

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/pages/topics/index")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})