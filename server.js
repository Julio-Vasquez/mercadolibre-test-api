const app = require('express')()

app.use('/', require('./src/routes/app.routes'))

app.listen(8550, () => console.log('server running on port 3001'))
