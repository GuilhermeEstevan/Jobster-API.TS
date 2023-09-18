import app from "./app";
import { connectDB } from "./DB/connect";

const port: number = Number(process.env.PORT) || 3000;

const start = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    return console.log(`invalid Mongo URI : ${uri}`);
  }

  try {
    await connectDB(uri);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
