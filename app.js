let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
app.use(cors())
const db = require('./models/ExpenseModel.js');
const apiRoutes = require('./routes/ExpenseRoute.js');

app.use(
    bodyParser.json({
        extended:false
    })
);

app.use(bodyParser.json());
app.use('/api',apiRoutes);

db.sequelize.sync({force:false}).then(()=>{
    app.listen(3000,()=>{
        console.log(`listening on port 3000`);
    })
})