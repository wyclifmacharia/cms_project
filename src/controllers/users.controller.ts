//Controller are responsible for Handling the HTTP request and response
import { Request, Response } from "express";
import * as userService from "../services/users.services";

// Get all customers or a single customer by ID
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { Customer_ID } = req.query;

    if (Customer_ID) {
      const customer = await userService.getUserById(Number(Customer_ID));

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      return res.status(200).json(customer);
    }

    // If no ID provided → get all
    const customers = await userService.getUsers();
    return res.status(200).json(customers);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//add customer 
export const createUser = async (req: Request, res:Response) =>{

    try{
        const user = req.body;
        const result = await userService.createUser(user)
        res.status(201).json(result)

    }catch(error:any){
        res.status(500).json({error:"Internal server error"});



    }

}
//login customer 

export const loginCustomer = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body;

        const result = await userService.loginCustomer(Email, Password);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === 'Invalid credentials') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

//deleting customer 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { Customer_ID } = req.params;
        const customerIdNum = Number(Customer_ID);
    }catch(error:any ){
      res.status(500).json({error:"Internal server error"});

    }
  }
