
import express from 'express'
import sql from 'mssql';
import dotenv from 'dotenv';
import { getPool } from './db/config';
import userRoutes from './routers/users.routes';    

const app = express();

dotenv.config();
//middleware
app.use(express.json()); 

const port = process.env.PORT || 8081;

//register routes
userRoutes(app);

//Root route
app.get('/', (req, res) => {
    res.send("Hello, express API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})

//test database connection
getPool()
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.log("Database connection failed: ", err));

