//CONTAINS THE BUSINESS LOGIC 
import * as userRepository from '../repositories/users.repositories';
import  bcrypt from "bcrypt";
import { addUser, Customer } from '../types/users.type';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
        

//listing all  customer 
export const getUsers = async ()=> await userRepository.getUsers()
//getting customer by id logic 
export const getUserById = async( Customer_ID:number )=>{
    const customer = await userRepository .getUserById(Customer_ID);

    if(!customer){

         throw new Error ("Customer not found");
    }

    return customer;


};

//creating customer logic 
export const createUser = async(Customer:addUser)=>{
    if (Customer.Password){
        Customer.Password = await bcrypt.hash(Customer.Password,10)
        console.log ("harshed passw", Customer.Password);



    }


    return await userRepository.addUser(Customer);
    
} 
//login cutomer logic
export const loginCustomer = async(Email:string, Password:string) =>{
    const customer = await userRepository.getCustomerByEmail(Email);
    if(!customer){
        throw new Error("user not found");
    }    
    //compare provided pass with hashed to allow customer progress
    const isMatch =  await bcrypt.compare(Password,customer.Password);
    if(!isMatch){

        throw new Error("Invalid credentials");
    }

    //create JWT payload 
    const payload ={
        sub: customer.Customer_ID,
        firtst_name: customer.First_Name,
        last_name: customer.Last_Name,
        role: customer.Role, 
    
        exp: Math.floor (Date.now ()/1000)+ (60*60),

    }
    //Generate the jwt token 
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);

    //Return token + Customer details (without password )
    return {
        message: 'Login successful',
        token,
        customer: {
            Cusomer_id: customer.Customer_ID,
            first_name: customer.First_Name,
            last_name: customer.Last_Name,
            email: customer.Email,
            phone_number: customer.Phone_Number,
            address: customer.Address,
            role: customer.Role
        }
    }


}

//deleting customer logic
export const deleteUser = async(Customer_ID:number) =>{

    const customer = await userRepository.getUserById(Customer_ID);
    if(!customer){
        throw new Error("Customer not found");
    }

    return await userRepository.deleteUserById(Customer_ID);
}

