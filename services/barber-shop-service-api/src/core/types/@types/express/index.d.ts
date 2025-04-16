import { string } from "zod";

export interface User{
    sub?: string,
    email?: string
    permission?: string
}


declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}