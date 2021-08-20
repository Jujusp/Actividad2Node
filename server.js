const http = require('http')
const axios = require('axios')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 8081

const proveedores =
    'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
const clientes =
    'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'

async function getProveedores() {
    try {
        const response = await axios.get(proveedores)
        console.log(response)
        fs.writeFile(
            'proveedores.json',
            JSON.stringify(response.data),
            (err) => {
                console.log(err)
            }
        )
    } catch (error) {
        console.error(error)
    }
}

async function getClientes() {
    try {
        const response = await axios.get(clientes)
        console.log(response)
        fs.writeFile('clientes.json', JSON.stringify(response.data), (err) => {
            console.log(err)
        })
    } catch (error) {
        console.error(error)
    }
}

const server = http.createServer((req, res) => {
    getProveedores()
    getClientes()
    console.log(req.url)
    res.statusCode = 200
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/plain')
        res.end('Hola Mundo')
    } else if (req.url === '/proveedores') {
        fs.readFile('proveedores.json', 'utf-8', (err, data) => {
            if (err) throw err
            res.end(data)
        })
    } else if (req.url === '/clientes') {
        fs.readFile('clientes.json', 'utf-8', (err, data) => {
            if (err) throw err
            res.end(data)
        })
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 Not Found')
    }
})

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`)
})
