// Export by nH Project. 
const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const got = require("got");
console.log("a");

app.use(express.static('public'));

app.get("/", function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get("/", (request, response) => {
	response.sendStatus(200);
});

app.listen(process.env.PORT);

app.get('/data', function(req, res){
  res.send('nHproj');
});

/*
request.get({ url: "https://cdn.discordapp.com/attachments/368604315465678848/522410032143400991/latest.png", encoding: null }, function (err, res, body) {
  console.log(body.toString("base64"))
});

request.get('https://cdn.discordapp.com/attachments/368604315465678848/522410032143400991/latest.png', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        console.log(data)
    }
});
*/

async function a () {
  let a = await got("https://nhentai.net/g/211124/")
    let a$ = cheerio.load(a.body); 
    let paginas = a$(".gallerythumb").length
    let limitador = paginas + 1
    try {
    for (let i = 1; i < limitador; i++) {
      let b = await got("https://nhentai.net/g/211124/"+i)
        let b$ = cheerio.load(b.body); 
        console.log(b$(".fit-horizontal").attr("src"))
    } 
    }catch(e) {
      console.log(e) 
    }
}

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post("/", async function (req, res) {
  if(!req.body.hentai.startsWith("https://nhentai.net/g/")) return res.send("Invalid gallery")
  let solicitud = req.query.hentai
  var JSZip = require("jszip");
  var zip = new JSZip();
  let a = await got(solicitud);
  let a$ = cheerio.load(a.body); 
  let paginas = a$(".gallerythumb").length;
  let limitador = paginas + 1;
  for (let i = 1; i < limitador; i++) {
    let b = await got(solicitud+i);
    let b$ = cheerio.load(b.body);
    let imagen = b$(".fit-horizontal").attr("src");
    let c = await request.get({ url: imagen, encoding: null }, function (err, r, body) {
      if (!err && r.statusCode == 200) {
        var data = body.toString('base64');
        zip.file(i + ".jpg", data, {base64: true});
        if (i === paginas) {
          zip
            .generateNodeStream({type:'nodebuffer',streamFiles:true})
            .pipe(fs.createWriteStream('out.zip'))
            .on('finish', function () {
              res.download("out.zip", "out.zip", function(err){
  if (err) {
    console.log(err)
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
});
              console.log("out.zip written.");
            });
        }
      }
    });
  }
})


app.get('/download', async function(req, res){
  let solicitud = req.query.hentai
  var JSZip = require("jszip");
  var zip = new JSZip();
  let a = await got(solicitud);
  let a$ = cheerio.load(a.body); 
  let paginas = a$(".gallerythumb").length;
  let limitador = paginas + 1;
  for (let i = 1; i < limitador; i++) {
    let b = await got(solicitud+i);
    let b$ = cheerio.load(b.body);
    let imagen = b$(".fit-horizontal").attr("src");
    let title = a$("h1").text() + ".zip"
    let c = await request.get({ url: imagen, encoding: null }, function (err, r, body) {
      if (!err && r.statusCode == 200) {
        var data = body.toString('base64');
        zip.file(i + ".jpg", data, {base64: true});
        if (i === paginas) {
          zip
            .generateNodeStream({type:'nodebuffer',streamFiles:true})
            .pipe(fs.createWriteStream(title))
            .on('finish', function () {
              res.download(title);
              console.log(title);
            });
        }
      }
    });
  }
})
/** Discord Bot download with webhook
/*
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 *
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 *
app.use(bodyParser.json());

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

app.post("/", function (req, res) {
    /*if(!req.body.user.startsWith("https://discordapp.com/api/webhooks/")) return res.send("Invalid webhook")
    webHooks.add(makeid(), req.body.user).then(function(){
      delete require.cache[require.resolve("./hooks.json")]
      res.send("Webhook sended")
    }).catch(function(err){
    console.log(err)
    process.exit()
})*
});
*/