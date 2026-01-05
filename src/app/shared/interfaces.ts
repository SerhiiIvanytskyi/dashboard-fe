export interface UserData {
  email: string;
  uid: string;
  firstName: string;
  lastName: string;
  age: string;
  avatarUrl: string;
}

export interface Article {
  title: string;
  category: string;
  text: string;
  date: string;
  imageUrl?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  id?: string;
}
