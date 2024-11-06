import axios from "axios";
import type { User } from "../interfaces/User";

export async function getUserByEmail(email:string): Promise <User> {
    const response = await axios.get<User[]>(
        ` https://67237d95493fac3cf24b11e5.mockapi.io/User?email=${email}`,
    )
    return response.data[0];
}

