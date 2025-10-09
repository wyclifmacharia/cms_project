//CONTAINS THE BUSINESS LOGIC 
import * as userRepository from '../repositories/users.repositories';

export const getUsers = async ()=> await userRepository.getUsers()


export const createUser = async(Customer:any)=>{
    const result =await userRepository.addUser(Customer);
    return result;
} 

