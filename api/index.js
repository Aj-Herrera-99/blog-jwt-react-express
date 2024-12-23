// * inizializzazione
// importazione modulo express
const express = require("express");
const cors = require("cors");
// creazione istanza server con express()
const app = express();
const PORT = 3000;
// importazioni routers
const apiRouter = require("./routers/apiRouter")
const postsRouter = require("./routers/postsRouter")
// * global middlewares
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter)
app.use("/posts", postsRouter)

// * apertura server
app.listen(PORT, () => console.log("server aperta sulla porta", PORT));

