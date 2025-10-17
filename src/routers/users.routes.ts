import { Express } from "express";
import * as usercontroller from '../controllers/users.controller';
import { superAdminOnly ,userOnly,adminOnly} from "../middleware/bearAuths";

 const userRoutes = (app:Express)=>{
    app.get('/customer', usercontroller.getUsers);
    app.post('/addcustomer', usercontroller.createUser);
    app.put('/updatecustomer/:Customer_ID', usercontroller.updateCustomer);
    app.post("/login",usercontroller.loginCustomer);
    app.delete('/customer/:Customer_ID', usercontroller.deleteCustomer);


 }

 export default userRoutes;