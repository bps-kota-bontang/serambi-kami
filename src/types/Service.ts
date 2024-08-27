import { Credential } from "@/types/Credential";
import { Team } from "@/types/Team";

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hasLogo: boolean;
  link: string;
  teams: {
    team: Team;
  }[];
  tags: string[];
  credential: Credential | undefined;
}
