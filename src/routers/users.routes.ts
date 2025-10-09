import { Express } from "express";
import * as usercontroller from '../controllers/users.controller';


 const userRoutes = (app:Express)=>{
    app.get('/customer', usercontroller.getUsers);
    app.post('/addcustomer', usercontroller.createUser);


 }

 export default userRoutes;