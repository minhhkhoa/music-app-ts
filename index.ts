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
const methodOverride = require('method-override');

//-thay the cho body-parser
app.use(express.json()); // Để parse JSON
app.use(express.urlencoded({ extended: true })); // Để parse URL-encoded
//-end thay the cho body-parser

app.use(express.static(`${__dirname}/public`)) //-Express sẽ tự động tìm các tệp trong thư mục public và cung cấp chúng cho người dùng khi có yêu cầu (request) tương ứng-->(ko can tao route)

//-pug view
app.set("views", `${__dirname}/views`) //-xet thu muc views
app.set("view engine", "pug") //- V s/d: pug
//-end pug view

//-App lacal variables(tạo biến toàn cục để bất kể ở file bug nào cx dùng dc prefixAdmin)
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Sử dụng method-override với tham số _method
app.use(methodOverride('_method'));

//-admin route
adminRoutes(app)
//- end admin route

//-client route
clientRoutes(app)
//-end client route


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})