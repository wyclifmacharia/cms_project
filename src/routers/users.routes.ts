import { Express } from "express";
import * as usercontroller from '../controllers/users.controller';
import { superAdminOnly ,userOnly,adminOnly} from "../middleware/bearAuths";

 const userRoutes = (app:Express)=>{
    app.get('/customer', adminOnly,usercontroller.getUsers);
    app.post('/addcustomer', usercontroller.createUser);
    app.post("/login",usercontroller.loginCustomer);
    app.delete("/customer/:id", usercontroller.deleteUser);

 }

 export default userRoutes;