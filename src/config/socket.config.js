import { Server } from "socket.io"
import { productManager } from "../server.js"


const config = async ( serverHTTP ) => {
    const socketServer = new Server( serverHTTP );

    const emitProducts = async () => {
        try {
            const products = await productManager.getProducts();
            await socketServer.emit('products', products);    
        } catch (error) {
            console.log(error)
        }
        
    };
    
    socketServer.on("connection", ( socket ) => {
        console.log("Cliente conectado");
        emitProducts();

        socket.on('deleteProduct', async (product) => {
            await productManager.deleteProducts(product);
            emitProducts();
        });

        socket.on('addProduct', async (productData) =>{
            await productManager.addProducts(productData);
            emitProducts();
        })

    })
};
export default { config }