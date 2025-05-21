import type { Category } from "./Category";
import type { Gender } from "./Gender";

export interface User {
  id: number;
  gender: Gender;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string | null;
  birthdate: string | null;
  city: string | null;
  country: string | null;
  photo: string | null;
  category: Category | null;
  isAdmin: boolean;
}
