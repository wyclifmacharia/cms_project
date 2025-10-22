//Controller are responsible for Handling the HTTP request and response
import { Request, Response } from "express";
import * as userService from "../services/users.services";
import { Customer } from "../types/users.type";

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
        res.status(500).json(error);
        console.log("Error creating user: ", error.message);

    }
  };

    //verify user email
    export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { Email, code } = req.body;

        if (!Email || !code) {
            return res.status(400).json({ message: 'Email and code are required' });
        }
        const result = await userService.verifyUser(Email, code);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'Invalid verification code') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
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

//updating customer
export const updateCustomer = async(req:Request,res:Response)=>{

  const customerId= parseInt(req.params.Customer_ID);
  //bad requesti the customer not a number
  if(isNaN(customerId)){
    return res.status(400).json({error:"Invalid customer ID"});
  }
  //else proceed to update
    try{
        const user = req.body;
        const result = await userService.updateCustomer(customerId,user);
        res.status(200).json(result);

    }catch(error:any ){
      if (error.message === 'Customer not found') {
        res.status(404).json({ Message: 'user not found ' });
    } else {
        res.status(500).json({ error: error.message });
    }
     
    
  }
};

//deleting customer 
export const deleteCustomer = async (req: Request, res: Response) => {
  //console.log("DELETE called with ID:", req.params.Customer_ID);
    const customerId = parseInt(req.params.Customer_ID);
    //bad request if the customer not a number
    if (isNaN(customerId)) {
        return res.status(400).json({ error: "Invalid customer ID" });
      }
    //else proceed to delete
    try {
        const result = await userService.deleteCustomer(customerId);
        res.status(200).json(result);

    } catch (error: any) {
        if (error.message === 'Customer not found') {
            res.status(404).json({ message: 'Customer not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
  };
