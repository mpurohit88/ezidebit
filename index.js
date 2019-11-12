const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const { validateToken } = require("./utils");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

const userRouter = require('./routes/user');

app.use('/api/user', userRouter);

app.use("/api/auth/home", function (req, res) {
  if (req && req.headers) {
    if (validateToken(req.headers.authorization)) {
      res.send({ message: "Validated", status: 200 });
    } else {
      res.send({ message: "You are not authorized", status: 401 });
    }
  }
});

app.use(function (error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  console.log("Server Error....", error);
  const result = {
    error: `Server Error, Please contact administrator`
  };
  // if(error){res.status(error.statusCode).send(result.message);}else
  if (!error.statusCode) error.statusCode = 500;

  res.status(error.statusCode).send(result.message);
});

// const server = https.createServer(https_options, app);
const server = http.createServer(app);

// const io = require('socket.io')(server);
// require('./socket')(io)
const PORT = process.env.PORT || 3001;
server.listen(PORT, function (err) {
  console.log("Server is running on localhost:" + PORT);

  if (err) {
    console.log(err);
  }
});
