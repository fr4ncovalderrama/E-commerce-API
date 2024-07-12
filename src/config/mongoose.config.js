import { Types, connect } from "mongoose";

const connectDB = () =>{
    const URI= "mongodb+srv://franco:l4vMcvb20EUrXWrb@coderhouse-backend.hz4ycry.mongodb.net/?retryWrites=true&w=majority&appName=coderhouse-backend"

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "ecommerce",
    }

    connect(URI, options)
        .then(() => console.log("Conectado a Mongo DB"))
        .catch(() => console.log("Error al conectar a mongoDB"))
    
}

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default {
    connectDB,
    isValidID,
}