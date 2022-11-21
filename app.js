const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false})
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')

const morgan = require('morgan')

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(urlencodedParser);

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);


db.authenticate()
  .then(() => {
    console.log('connected to the database');
})

app.get('/', (req,res, next) => {
  res.redirect('/wiki')
})

const PORT = 3000;
const init = async () => {
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`Server is listening in Port: ${PORT}`)
  })
}

init();
