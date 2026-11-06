import {z} from "zod";

export const registerSchema = z.object({
    name:z.string().min(3,"The name should be at least 3 characters long"),
    email:z.email("Invalid email format"),
    password:z.string().min(6,"The password entered should contain at least 6 characters")
});
