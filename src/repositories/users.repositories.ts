//Repositories handles database logic //ALSO CALLED THE MODELS 
import { getPool } from "../db/config";

export const getUsers = async() => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Customer ");
    return result.recordset;
}
// getting customer by id
//  export const getUserById = async(id: number) => {
//      const pool = await getPool();
//      const result = await pool.request().query(`SELECT * FROM Customer WHERE Id = ${id}`);
//      return result.recordset[0];
// }
//adding new Customer
export  const addUser = async(Customer: any)=>{

    const pool = await getPool();
     await pool.request()
    .input('First_Name', Customer.First_Name)
    .input('Last_Name',  Customer.Last_Name)
    .input('Email' ,Customer.Email)
    .input('Phone_Number', Customer.Phone_Number)
    .input('Address',Customer.Address)
    .query('INSERT INTO Customer (First_Name, Last_Name, Email, Phone_Number,Address) VALUES (@First_Name, @Last_Name, @Email,@Phone_Number, @Address)');
    
    return { message: 'User added successfully' }
    
}
