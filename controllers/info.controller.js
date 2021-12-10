const numCPUs = require('os').cpus().length;
const { isPrime } = require('../utils/utils');

const infoListar = async (req, res) => {
    try {
        let info = [
            {
                nombre: 'Argumentos de entrada',
                detalle: process.argv
            },
            {
                nombre: 'Path de ejecución',
                detalle: process.cwd()
            },
            {
                nombre: 'Nombre de la plataforma (OS)',
                detalle: process.platform
            },
            {
                nombre: 'Process ID',
                detalle: process.pid
            },
            {
                nombre: 'Version de node.js',
                detalle: process.version
            },
            {
                nombre: 'Carpeta corriente',
                detalle: process.pid
            },
            {
                nombre: 'Uso de memoria',
                detalle: process.memoryUsage().heapTotal
            },
            {
                nombre: 'Procesadores',
                detalle: numCPUs
            },
        ];
        
        res.render('info', { listaInfo: JSON.parse(JSON.stringify(info, null, 4)) });
    }
    catch(e) {
        throw `No se pudieron renderizar los datos: ${e}`;
    }
}

const testArtillery = async (req, res) => {
    try {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    }
    catch(e) {
        throw `No se pudieron renderizar los datos: ${e}`;
    }
}

module.exports = {
    infoListar,
    testArtillery
}