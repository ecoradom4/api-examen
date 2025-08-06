const db = require("../models");
const Pelicula = db.peliculas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const pelicula = {
        nombre: req.body.nombre,
        sinopsis: req.body.sinopsis,
        actores: req.body.actores, 
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        lanzamiento: req.body.lanzamiento,
    };

    Pelicula.create(pelicula)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pelicula."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pelicula.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving peliculas."
            });
        });
};


exports.findByName = (req, res) => {
    const nombre = req.params.nombre;

    if (!nombre) {
        res.status(400).send({
            message: "Nombre parameter is required!"
        });
        return;
    }

    Pelicula.findAll({ 
        where: { 
            nombre: { 
                [Op.iLike]: nombre 
            } 
        } 
    })
    .then(data => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No se encontró la película con nombre=${nombre}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Pelicula with nombre=" + nombre
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pelicula.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pelicula with id=${id}. Maybe Pelicula was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pelicula with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Pelicula.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pelicula with id=${id}. La pelicula no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pelicula with id=" + id
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelicula.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pelicula with id=" + id
            });
        });
};