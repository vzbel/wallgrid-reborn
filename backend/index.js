const express = require("express");
const Wallpaper = require("./models/wallpaper.js");
const morgan = require("morgan");

// constants
const PORT = process.env.port || 3001;
const MORGAN_FORMAT =
  ":method :url :status :res[content-length] - :response-time ms :body";

const app = express();

// serve static files for frontend
app.use(express.static("./dist"));

// parse json body, e.g. on POST or PUT reqs
app.use(express.json());
// log requests
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(MORGAN_FORMAT));

// create a wallpaper
app.post("/api/wallpapers", (req, res, next) => {
  const { url, desc } = req.body;

  const wallpaper = new Wallpaper({
    url,
    desc,
  });

  // save to db
  wallpaper
    .save()
    .then((savedDoc) => {
      return res.status(201).json(savedDoc);
    })
    .catch(next);
});

// get all wallpapers
app.get("/api/wallpapers", (req, res, next) => {
  Wallpaper.find({})
    .then((docs) => {
      return res.json(docs);
    })
    .catch(next);
});

// get one wallpaper by id
app.get("/api/wallpapers/:id", (req, res, next) => {
  Wallpaper.findById(req.params.id)
    .then((doc) => {
      // doesn't exist
      if (!doc) {
        return res.status(404).end();
      }
      return res.json(doc);
    })
    .catch(next);
});

// update one wallpaper by id
app.put("/api/wallpapers/:id", (req, res, next) => {
  const { url, desc } = req.body;

  // must provide at least one field to update
  if (!url && !desc) {
    const err = new Error("body is empty");
    err.name = "ValidationError";
    return next(err);
  }

  // find the doc first
  Wallpaper.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }

      doc.url = url || doc.url;
      doc.desc = desc || doc.desc;

      // save to db
      return doc
        .save()
        .then((savedDoc) => {
          return res.json(savedDoc);
        })
        .catch(next);
    })
    .catch(next);
});

// delete one wallpaper by id
app.delete("/api/wallpapers/:id", (req, res, next) => {
  Wallpaper.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(204).end();
    })
    .catch(next);
});

// custom error handling
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  switch (err.name) {
    // mongoose validation failed
    case "ValidationError":
      return res.status(400).send({ error: err.message });
    case "CastError":
      return res.status(400).send({ error: "malformed id" });
    default:
      return res.status(500).end();
  }
};
app.use(errorHandler);

// listen on port
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
