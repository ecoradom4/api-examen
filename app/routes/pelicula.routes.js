module.exports = app => {
    const peliculas = require("../controllers/pelicula.controller.js");
    var router = require("express").Router();
    
    router.post("/", peliculas.create);
    router.get("/", peliculas.findAll);
    router.get("/nombre/:nombre", peliculas.findByName);
    router.get("/:id", peliculas.findOne);
    router.put("/:id", peliculas.update);
    router.delete("/:id", peliculas.delete);
    
    app.use("/api/movies", router);
};