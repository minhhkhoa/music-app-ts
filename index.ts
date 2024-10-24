import express, { Express } from "express"
import dotenv from "dotenv"
import * as database from "./config/database"
import adminRoutes from "./routes/admin/index.route"
import clientRoutes from "./routes/client/index.route"
import { systemConfig } from "./config/config"

dotenv.config()
database.connect() //-goi ham connect

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.use(express.static("public")) //-Express sẽ tự động tìm các tệp trong thư mục public và cung cấp chúng cho người dùng khi có yêu cầu (request) tương ứng-->(ko can tao route)

//-pug view
app.set("views", "./views") //-xet thu muc views
app.set("view engine", "pug") //- V s/d: pug
//-end pug view

//-App lacal variables(tạo biến toàn cục để bất kể ở file bug nào cx dùng dc prefixAdmin)
app.locals.prefixAdmin = systemConfig.prefixAdmin

//-admin route
adminRoutes(app)
//- end admin route

//-client route
clientRoutes(app)
//-end client route


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})