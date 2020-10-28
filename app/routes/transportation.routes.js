
// Router setup
module.exports = app => {
    const transportation = require("../controllers/transportation.controller");

    var router = require("express").Router();

    router.post("/", transportation.create);
    router.get("/", transportation.findAll);
    router.get("/enabled", transportation.findAllEnabled);
    router.get("/:name", transportation.findOne);
    router.put("/:name", transportation.update);
    router.delete("/:name", transportation.delete);
    router.delete("/", transportation.deleteAll);

    app.use('/api/transportation', router);
};