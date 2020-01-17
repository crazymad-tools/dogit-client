import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";
import { resolve, join } from "path";
import { mimes } from "./mimes";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../App";
import { StaticRouter } from "react-router";

(() => {
  const basepath = resolve(__dirname);
  let server = createServer(
    (request: IncomingMessage, response: ServerResponse) => {
      try {
        let { url } = request;
        let pathname: string = url || "";
        if (!url || url === "" || url === "/" || url.match(/^[^\.]+$/)) {

          pathname = "index.html";
          let data = readFileSync(pathname, "utf-8");
          response.writeHead(200, { "Content-Type": mimes["html"] });
          response.write(
            data.replace(
              '<div id="root"></div>',
              `<div id="root">${ReactDOMServer.renderToString(
                <StaticRouter context={{}} location={request.url} >
                  <App />
                </StaticRouter>
              )}</div>`
            )
          );
          response.end();
        } else {
          let filename = pathname.substring(1, pathname.length);

          let ext = filename.match(/(?<=\.)[^\.]+$/);
          let contentType =
            ext && ext.length > 0 && mimes[ext[0]]
              ? mimes[ext[0]]
              : "text/plain";
          // console.log(filename, ext, contentType);

          const data = readFileSync(filename);

          response.writeHead(200, { "Content-Type": contentType });
          response.write(data);
          response.end();
        }
      } catch (e) {
        console.log(e);
        response.writeHead(500);
        response.end();
      }
    }
  );
  let port = 8092;
  server.listen(port);
  server.on("listening", () => {
    console.log(`Server listening on ${port}`);
  });
  server.on("error", () => {
    server.listen(++port);
  });
})();
