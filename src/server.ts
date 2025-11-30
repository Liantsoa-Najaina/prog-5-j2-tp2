import {App} from "./app";

const PORT = process.env.APP_PORT || "3000";

const app = new App();
app.listen(parseInt(PORT));
