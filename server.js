const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;

const app = next({
  dev,
  hostname,
  port,
  config: { useFileSystemPublicRoutes: true },
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (
        pathname === "/sw.js" ||
        /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)
      ) {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (error) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(3000, () => {
      console.log(`> Ready on http://localhost:${3000}`);
    });
});
