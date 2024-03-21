import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = mongoose.connect(process.env.DB_CONNECTION);
        console.log("success", (await connect).connection.host);
    }
    catch (err) {
        console.log("cannot connect to mongoose");
        console.log(err);
        process.exit(1);
    }
}