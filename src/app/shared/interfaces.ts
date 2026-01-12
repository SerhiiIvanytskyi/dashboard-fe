export interface UserData {
  email: string;
  uid: string;
  name: string;
  age: string;
  hasAvatar: boolean;
  avatarUrl: string;
}

export interface Article {
  title: string;
  category: string;
  text: string;
  date: string;
  imageData?: File;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  id?: string;
  imageFile?: File;
  hasImage?: boolean;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
}
