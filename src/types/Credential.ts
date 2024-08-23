export interface Credential {
  id: string;
  username: string | undefined;
  password: string | undefined;
  hasSso: boolean;
  note: string | undefined;
}
