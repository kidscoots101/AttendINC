var express = require("express");
require("dotenv").config();
const { affinidiProvider } = require("@affinidi/passport-affinidi");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const cors = require("cors");

app.use(cors());

app.use(
  cors({
    origin: "https://attend-inc-sandy.vercel.app",
  }),
);

const initializeServer = async () => {
  await affinidiProvider(app, {
    id: "affinidi",
    issuer: process.env.AFFINIDI_ISSUER,
    client_id: process.env.AFFINIDI_CLIENT_ID,
    client_secret: process.env.AFFINIDI_CLIENT_SECRET,
    redirect_uris: ["http://localhost:3000/auth/callback"],
  });

  app.get("/", function (req, res, next) {
    res.json({ success: "Express" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};
app.use(cors());
app.use(
  cors({
    origin: "https://attend-inc-api.vercel.app/",
  }),
);
initializeServer();
