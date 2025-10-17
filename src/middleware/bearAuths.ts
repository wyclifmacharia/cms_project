import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';  
import dotenv from 'dotenv';

dotenv.config();

//middleware to checkm if the user is authenticated
// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if(!authHeader|| !authHeader.startsWith('Bearer ')){
//         return res.sendStatus(401); // Unauthorized
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
//         if (err) {
//              res.sendStatus(403).json({ message: 'Forbidden' }); // Forbidden
//              return;
//         }
//        const token = authHeader.split(' ')[1];
//        if (!token) {
//            return res.sendStatus(401); // Unauthorized
//            return;
//        }try {
//            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//            (req as any).Customer = decoded;
//            next();
//        } catch (error) {
//               return res.sendStatus(403); // Forbidden
        
//        }
//     });
// };

//AUTHORIZATION MIDDLEWARE TO CHECK USER BASED ON ROLES 

export const checkRole=(requiredRole:"admin"| "user"| "superadmin")=>{return (req:Request,res:Response,next:NextFunction):void=>{
    const authHeader = req.headers.authorization;
    //checking if authorization heade exist and gas a berere token 
    if(!authHeader|| !authHeader.startsWith('Bearer ')){    
         res.sendStatus(401).json({ message: "Unauthorized" });
         return; 
    }
    //exrtacting the token 
    const token = authHeader.split(' ')[1];
    try{
    //verify and decode  the jwt token

    const decoded= jwt.verify(token, process.env.JWT_SECRET as string);

    //attach the user info

    (req as any).Customer = decoded;

    //role validation-ensuring token has role property 
    if(typeof decoded  === 'object' && decoded !==null && "role" in decoded){

         if (requiredRole === "superadmin") {
                    // Allow both admin and user roles
                    if (decoded.role === "admin" || decoded.role === "user") {
                        next(); // Access granted
                        return;
                    }
                } else if (decoded.role === requiredRole) {
                    // Role matches exactly what's required
                    next(); // Access granted
                    return;
                }

                // Wrong role
                res.status(401).json({ message: "Unauthorized" });
                return;
            } else {
                // Token doesn't have proper role information
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        } catch (error) {
            res.status(403).json({ message: "Forbidden" });
            return; 
    
        }

    }


};

export  const adminOnly  = checkRole("admin");
export  const userOnly  = checkRole("user");    
export  const superAdminOnly  = checkRole("superadmin");
        


