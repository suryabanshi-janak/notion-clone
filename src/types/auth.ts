export enum AUTH_TYPE {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
