import mongoose from "mongoose";

export const initDBConnection = async(DB_HOST)=> {
    try {
        await mongoose.connect(DB_HOST);
        console.log("Database connect success");
    }
    catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

export const closeDBConnection = async()=> {
    try {
        await mongoose.connection.close();
    }
    catch(error) {
        console.log(error.message);
    }
}


