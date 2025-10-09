//CONTAINS THE BUSINESS LOGIC 
import * as userRepository from '../repositories/users.repositories';
//getting customer allcustomer logic
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
export const createUser = async(Customer:any)=>{
    const result =await userRepository.addUser(Customer);
    return result;
} 

