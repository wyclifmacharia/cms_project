import { Express } from "express";
import * as usercontroller from '../controllers/users.controller';


 const userRoutes = (app:Express)=>{
    app.get('/users', usercontroller.getUsers);
    app.post('/addUser', usercontroller.createUser);


 }

 export default userRoutes;