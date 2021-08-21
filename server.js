const http = require('http')
const axios = require('axios')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 8081

const proveedoresLink =
    'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
const clientesLink =
    'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'

async function fetch(link) {
    try {
        const response = await axios.get(link)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const server = http.createServer(async function (req, res) {
    res.statusCode = 200
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.end(
                '<a href="/api/proveedores">Proveedores</a><br><a href="/api/clientes">Clientes</a>'
            )
            break
        case '/api/proveedores':
            const proveedoresData = await fetch(proveedoresLink)
            var provHTML = fs.readFileSync('proveedores.html', 'utf-8')
            res.setHeader('Content-Type', 'text/html')
            provHTML = provHTML.replace(
                '?????',
                proveedoresData.reduce((previousValue, currentValue) => {
                    return (
                        previousValue +
                        '<tr><th scope="row">' +
                        currentValue.idproveedor +
                        '</th><td>' +
                        currentValue.nombrecompania +
                        '</td><td>' +
                        currentValue.nombrecontacto +
                        '</td></tr>'
                    )
                }, '')
            )
            res.end(provHTML)

            break
        case '/api/clientes':
            const clientesData = await fetch(clientesLink)
            var provHTML = fs.readFileSync('clientes.html', 'utf-8')
            res.setHeader('Content-Type', 'text/html')
            provHTML = provHTML.replace(
                '?????',
                clientesData.reduce((previousValue, currentValue) => {
                    return (
                        previousValue +
                        '<tr><th scope="row">' +
                        currentValue.idCliente +
                        '</th><td>' +
                        currentValue.NombreCompania +
                        '</td><td>' +
                        currentValue.NombreCompania +
                        '</td></tr>'
                    )
                }, '')
            )
            res.end(provHTML)
            break
        default:
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('404 Not Found')
    }
})

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`)
})
