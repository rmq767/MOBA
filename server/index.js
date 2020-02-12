const express = require('express')
const app = express()

app.set('secret', 'AR3-%^&&t1gr82')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads')) //静态文件 
app.use('/admin', express.static(__dirname + '/admin')) //静态文件 
app.use('/', express.static(__dirname + '/web')) //静态文件 

require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('server running')
})