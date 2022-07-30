const con = require("./config");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// POST API

app.post("/post", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      content: req.body.content,
    };
    const q1 = "INSERT INTO post SET ?";
    await con.query(q1, data, (err, result) => {
      if (err) {
        return res.send(err.sqlMessage);
      }

      res.send({ status: 200, Response: result });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/post", async (req, res) => {
  try {
    const q1 = "SELECT * FROM post";
    await con.query(q1, (err, result) => {
      if (err) {
        return res.send(err.sqlMessage);
      }

      res.send({ status: 200, Response: result });
    });
  } catch (err) {
    console.log(err);
  }
});

// COMMENT API

app.get("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const q1 =
      "SELECT * FROM comments WHERE blog = ( SELECT id FROM post WHERE id = ? ) ORDER BY parentid DESC ";
    await con.query(q1, id, (err, result) => {
      if (err) {
        return res.send(err.sqlMessage);
      }

      res.send({ status: 200, Response: result });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/comment/:id", async (req, res) => {
  try {
    if (req.body.comment == "" && req.body.name == "") {
      return res.send("Enter something before replying");
    }
    // const
    const data = {
      name: req.body.name,
      comment: req.body.comment,
      blog: req.params.id,
    };

    const q1 = `INSERT INTO comments SET ?`;

    await con.query(q1, data, (err, result) => {
      if (err) {
        return res.send(err.sqlMessage);
      }

      res.send({ status: 200, Response: result });
    });
  } catch (err) {
    console.log(err);
  }
});

// REPLY API

app.get("/reply/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // const q1 =
    //   `SELECT parentid ,name ,comment , replyid FROM comments WHERE replyid = '${id}'`;

    const q1 = ` select parentid, comment, name, replyid, commentdatetime, blog from comments where replyid IN (select parentid from comments) and blog= '${id};'`;
    await con.query(q1, id, (err, result) => {
      if (err) {
        return res.send(err.sqlMessage);
      }

      res.send({ status: 200, Response: result });
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/reply", async (req, res) => {
  try {
    if (!req.body.comment || !req.body.name) {
      return res.send("Enter something before replying");
    }

    const data = {
      name: req.body.name,
      comment: req.body.comment,
      blog: req.body.blog,
      replyid: req.body.replyid,
    };
    const q1 = `INSERT INTO comments SET ?`;

    await con.query(q1, data, (err, result) => {
      if (err) {
        return res.send({ error: err.sqlMessage });
      }

      res.send({ status: 200, Response: result });
    });
  } catch (err) {
    console.log({ error: err.message });
  }
});

// LISTENING THE PORT

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Example app listening on port ${port}!`);
  }
});
