class Product{
    constructor(title,description, price,thumbnail,idProduct,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.idProduct = idProduct
        this.stock = stock
    }
}

class ProductManager{
    constructor(){
        this.products = new Array()
    }
    getProduct = () =>{
        return this.products
    }
    addProduct = (title, description,price,thumbnail,idProduct,stock) => {
       if(this.products.some((element) => element.idProduct == idProduct)){
        console.error("CODIGO REPETIDO")
       }else{
        let newProduct = new Product(title,description,price,thumbnail,idProduct,stock)
        this.products.push(newProduct)
    }
}
    getProductById(id){
        const filter = this.products.find((element) => element.idProduct === id)
        return(filter || ("no se enontraron elementos"))
    }
}

let productManager = new ProductManager()
console.log(productManager)
console.log(productManager.getProduct())
productManager.addProduct("prueba de producto","soy una descripcion", 100, "noimg", Math.floor(Math.random() * 100), 12)
console.log(productManager.getProduct())