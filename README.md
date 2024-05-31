


Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior)
La ruta GET /:pid deberá traer sólo el producto con el id proporcionado







- La ruta raíz POST / deberá agregar un nuevo producto con los campos:

    title, description, code, price, status, stockk, category, thumbnails, status
    id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.)
    title:String,
    description:String
    code:String
    price:Number
    status:Boolean
    stock:Number
    category:String
    thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
    Status es true por defecto.
    Todos los campos son obligatorios, a excepción de thumbnails

- La ruta PUT /:pid deberá tomar un producto
    y actualizarlo por los campos enviados desde body.
    NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.


- La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
