//cutomers types 
export interface Customer{
    Customer_ID:number;
    First_Name :string;
    Last_Name :string
    Email :string ;
    Phone_Number :string;
    Address :string;
    Password :string
    Role :string; 

}

export interface addUsers{
    First_Name :string;
    Last_Name :string
    Email :string ;
    Phone_Number :string;
    Address :string;
    Password :string;
    Role :string; 
}

export interface updateUser{
    First_Name ?:string;
    Last_Name ?:string
    Email ?:string ;
    Phone_Number ?:string;
    Address ?:string;
    Password ?:string; 
    Role ?:string;
}
export interface loginCustomer{
    Email :string ;
    Password :string;  
    Role ?:string;
}

export interface deleteCustomer{
    Customer_ID:number;
}