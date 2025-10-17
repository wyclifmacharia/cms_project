//Repositories handles database logic //ALSO CALLED THE MODELS 
import { promises } from "dns";
import { getPool } from "../db/config";
import { addUsers,  Customer, updateUser } from "../types/users.type";
import { response } from "express";

export const getUsers = async() => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Customer ");
    return result.recordset;
}
// getting customer by id
 export const getUserById = async(Customer_ID: number) => {
     const pool = await getPool();
     const result = await pool
     .request()
     .query(`SELECT * FROM Customer WHERE Customer_ID = ${Customer_ID}`);
     return result.recordset[0];
}
//adding new Customer
export  const addUser = async(Customer: addUsers)=>{

    const pool = await getPool();
     await pool.request()
    .input('First_Name', Customer.First_Name)
    .input('Last_Name',  Customer.Last_Name)
    .input('Email' ,Customer.Email)
    .input('Phone_Number', Customer.Phone_Number)
    .input('Address',Customer.Address)
    .input('Password',Customer.Password)
    .input('Role',Customer.Role)
    .query('INSERT INTO Customer (First_Name, Last_Name, Email, Phone_Number,Address,Password,Role) VALUES (@First_Name, @Last_Name, @Email,@Phone_Number, @Address,@Password,@Role)');

    return { message: 'User added successfully' };
    
}
//Authentication!! checking if the user exixts before adding 
 export const getCustomerByEmail = async(Email:string):Promise<Customer | null> =>{
    const pool= await getPool();
    const result = await pool.request()
    .input('Email',Email)
    .query('SELECT * FROM Customer WHERE Email = @Email');
    return result.recordset[0] || null; 
 }
//updating customer
    export const updateCustomer = async(Customer_ID:number, Customer:updateUser) =>{
        const pool = await getPool();
        await pool.request()
        .input('Customer_ID', Customer_ID)
        .input('First_Name', Customer.First_Name)
        .input('Last_Name',  Customer.Last_Name)
        .input('Email' ,Customer.Email)
        .input('Phone_Number', Customer.Phone_Number)
        .input('Address',Customer.Address)
        .input('Password',Customer.Password)
        .input('Role',Customer.Role)
        .query(`UPDATE Customer SET First_Name = @First_Name, Last_Name = @Last_Name, Email = @Email, Phone_Number = @Phone_Number, Address = @Address, Password = @Password, Role = @Role WHERE Customer_ID = @Customer_ID`);
        return { message: 'User updated successfully' };

    }
//deleting customer 

export const deleteCustomer = async (Customer_ID: number) => {
  const pool = await getPool();
  
  await pool.request().input('Customer_ID', Customer_ID)
    .query(`
      DELETE FROM Payment
      WHERE Booking_ID IN (SELECT Booking_ID FROM Booking WHERE Customer_ID = @Customer_ID);

      DELETE FROM Booking WHERE Customer_ID = @Customer_ID;
      DELETE FROM Reservation WHERE Customer_ID = @Customer_ID;
      DELETE FROM Customer WHERE Customer_ID = @Customer_ID;
    `);

  return { message: 'Customer and related records deleted successfully' };
};




