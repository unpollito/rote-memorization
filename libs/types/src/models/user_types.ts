export interface User {
  email: string;
  id: string;
  isActive: boolean;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserValidationEmailData {
  key: string;
  sentAt: string;
}

export interface UserValidationEmailDataWithUserWithPassword
  extends UserValidationEmailData {
  user: UserWithPassword;
}
