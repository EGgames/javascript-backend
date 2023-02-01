const fs = require('fs');
const fileName = "./products.json"

class ProductManager{
    constructor(fileName){
        this.fileName = fileName;
    }

    AddProduct(obj) {
        if (obj) {

            const products = this.GetAllProducts();

            let newID;

            if (products.length == 0) {
                newID = 1
            } else {
                const ultId = parseInt(products[products.length - 1].id)
                newID = ultId + 1
            }
            if (this.codeExist(obj.code)) {
                return "Ya hay otro elemento con este codigo"
            } else {
              products.push({ ...obj, id: nuevaId })
                try {
                    fs.writeFileSync(fileName, JSON.stringify(products), fileDataFormatDefault)
                    return console.log(`Se agrego el elemento: ${obj.title} con el ID:${newID}`)
                } catch (error) {
                    throw new Error(`Error al guardar elemento ${error}`)
                }
            }
        } else {
            console.log("Error desconocido")
        }
    }

    GetProductById(id) {
        if (id > 0) {
            try {

                const objects = this.getAllProducts()
                let oneProduct = objects.find(element => element.id === id)

                if (oneProduct) {
                    return oneProduct
                } else {
                    return "Producto no existe"
                }

            } catch (error) {
                throw new Error(`Error al buscar: ${error}`)
            }

        } else {
            return "El valor ingresado no es valido"
        }
    }
    
    DeleteProductById(id){
        if (id > 0) {
            try {
                let prod = this.GetProductById(id)
                let objects = this.GetAllProducts()
                if (objects.length > 0) {
                    if (prod.id) {
                      objects.splice(this.GetProductByUbication(objects, id), 1)
                        fs.writeFileSync(fileName, JSON.stringify(objects))
                        return `Item eliminado`
                    } else {
                        return "El item no existe"
                    }

                } else {
                    return "Lista esta Vacia"
                }

            } catch (error) {
                console.log("Error al eliminar", error)
            }

        } else {
            return "El valor es inválido"
        }

    }  

    codeExist(code) {
        let allProducts = this.GetAllProducts()
        let res = allProducts.find(product => product.code === code)
        if (res) {
            return true
        } else {
            return false
        }
    }
    
    GetProductByUbication(a, indx) {
        let index = a.findIndex(element => element.id === indx)
        return index
    }

    GetAllProducts() {
        let products = fs.readFileSync(fileName, fileDataFormatDefault)
        return JSON.parse(products)
    }

    UpdateProduct(obj, aidi) {
        const objects = this.GetAllProducts()
        let index = this.GetProductByUbication(objects, aidi)

        if (obj || index > 0) {
            for (let clave in obj) {
              objects[index][clave] = obj[clave]
            }
            try {
                fs.writeFileSync(fileName, JSON.stringify(objects), fileDataFormatDefault)
                return console.log(`Se actualizó el producto con el ID:${objects[index].id}`)
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
        } else {
            console.log(`No se ha encontrado el producto con id: ${aidi}`)
        }
    }

    DeleteAllProducts() {
        try {
            fs.writeFileSync(fileName, '[]')
            return console.log("Elementos eliminados exitosamente")
        } catch (error) {
            console.log("Error al eliminar todos los elementos", error)
        }
    }
}

let debug = new ProductManager("products_export.txt");
