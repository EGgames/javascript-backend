import express from "express";
import {ProductManager} from "./src/models/index.js";
const app = express();
const PORT = 8080;

const productManager = new ProductManager("./src/models/products.txt");

app.use(express.json())
app.use(express.urlencoded({extended: true})) // Permite la busqueda de url compleja

// Se generan las rutas 

// Ruta para obtener todos los productos incluyendo un query con el parametro limite
app.get('/products',async (req,res)=>{
    
    const productos = await productManager.getProducts()
    let {limite} = req.query;
    if(limite) {
        console.log(productos.slice(0,limite))
    }   else {
        console.log(productos)  // Solo se muestra el console.log a esta consulta. No se renderiza
    }
})

// Ruta para obtener el producto con un ID especifico

app.get('/products/:id', async (req,res)=>{
    const productos = await productManager.getProductByID(req.params.id)
    console.log(productos)
    res.send(JSON.stringify(productos))
})

app.get('/contacto', (req,res) =>{
    res.send('Pagina de contacto')
})

app.get('/', (req,res)=> {
res.send("Pagina de inicio")
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
})