require('dotenv').config()
const express = require('express')
const userRouter = require('./src/routes/user.routes')
const roleRouter = require('./src/routes/role.routes')
const permissionRouter = require('./src/routes/permission.routes')
const authRouter = require('./src/routes/auth.routes')
const contactRouter = require('./src/routes/contacts/contacts.routes')
const siteRouter = require('./src/routes/sitesettings/sitesetting.routes')
const integrationRouter = require('./src/routes/integrations/integration.routes')
const fileUpload = require('express-fileupload')
const dataBase = require('./src/config/db.config')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();

app.use(cors({
    'Access-Control-Allow-Origin': '*', //normal-website.com
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Special-Request-Header',
    'Access-Control-Allow-Credentials': true
}))
app.use(express.json())
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/public/images/'
}));

dataBase.connectDB()

const port = process.env.PORT || 3000


app.use('/api/v1',authRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',roleRouter)
app.use('/api/v1',permissionRouter)
app.use('/api/v1',contactRouter)
app.use('/api/v1',siteRouter)
app.use('/api/v1',integrationRouter);


;

app.listen(port, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
})