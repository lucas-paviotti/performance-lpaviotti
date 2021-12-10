const { Router } = require('express');
const { infoListar, testArtillery } = require('../controllers/info.controller');

const infoRouter = Router();

infoRouter.get('/', infoListar);
infoRouter.get('/artillery', testArtillery);

module.exports = {
    infoRouter
}