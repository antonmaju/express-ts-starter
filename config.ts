import * as path from "path";
import * as nconf from "nconf";

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, "config.json") });

export = {
    port:  nconf.get("port")
};