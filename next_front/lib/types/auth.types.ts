export type UserType = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type AuthContextType = {
  user?: UserType;
  error:any;
  isLoading:boolean;
  isFetching:boolean;
  refetch: () => void;
}

export type LoginType  = {
  email: string;
  password: string;
}

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword:String;
}