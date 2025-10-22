//CONTAINS THE BUSINESS LOGIC 
import * as userRepository from '../repositories/users.repositories';
import  bcrypt from "bcrypt";
import type { addUsers, Customer, updateUser } from '../types/users.type';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendMail } from '../mailer/mailer';
import { emailTemplate } from '../mailer/emaiTemplate'; 
dotenv.config(); // Load environment variables
        
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
export const createUser = async(Customer:addUsers)=>{
    //hashing the password before storing in db
    if (Customer.Password){
        Customer.Password = await bcrypt.hash(Customer.Password,10)
        // console.log ("harshed passw", Customer.Password);


    }
    // Storing the user in the database

    const result = await userRepository.addUser(Customer);
    //send welcome email to the cutomer using the template 

    await sendMail(
        Customer.Email,
        'Welcome to CMS by wyclif',
        emailTemplate.welcome(Customer.First_Name)
    );
    
    return result;
    
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
export const deleteCustomer = async (Customer_ID: number) => {
    await ensureUserExists(Customer_ID);
    return await userRepository.deleteCustomer(Customer_ID);
}
//updating customer logic
export const updateCustomer = async (Customer_ID: number, Customer: updateUser) => {
    if (Customer.Password){
        Customer.Password = await bcrypt.hash(Customer.Password,10)
        console.log ("harshed passw", Customer.Password);
    }
    await ensureUserExists(Customer_ID);
    return await userRepository.updateCustomer(Customer_ID, Customer);
};

//Reusable function to check if user exists-helper
const ensureUserExists = async (Customer_ID: number) => {
    const user = await userRepository.getUserById(Customer_ID);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export function verifyUser(Email: any, code: any) {
  throw new Error("Function not implemented.");
}

