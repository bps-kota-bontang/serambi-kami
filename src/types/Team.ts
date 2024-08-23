import { User } from "@/types/User";

export interface Team {
  id: string;
  name: string;
  users: {
    user: User;
    isAdmin: boolean;
  }[];
}
