import type { Category } from "./Category";
import type { Gender } from "./Gender";

export interface User {
  id: number;
  admin: boolean;
  gender: Gender;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  birthdate: string | null;
  city: string | null;
  country: string | null;
  photo: string | null;
  category: Category;
  isAdmin: boolean;
}
