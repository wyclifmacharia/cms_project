//Controller are responsible for Handling the HTTP request and response
import { getPool } from "../db/config";
import {Request, Response} from "express"
import * as userService from "../services/users.services";

// get all users 
export const getUsers = async(req: Request, res: Response) => {
    try{

        const customers = await userService.getUsers();

        res.status(200).json(customers)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }



}


export const createUser = async (req: Request, res:Response) =>{

    try{
        const user = req.body;
        const result = await userService.createUser(user)
        res.status(201).json(result)

    }catch(error:any){
        res.status(500).json({error:"Internal server error"});



    }



}
