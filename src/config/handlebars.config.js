import handlebars from "express-handlebars"
import paths from "../utils/path.js"

const config = (app) => {
    //Configuración de handlebars
    app.engine("handlebars", handlebars.engine());
    app.set("views", paths.views);
    app.set("view engine", "handlebars")
}

export default {
    config,
};