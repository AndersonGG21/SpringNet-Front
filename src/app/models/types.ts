export interface Login {
  "email"?: string;
  "password"?: string
}

export interface Post {
  id? : number
  content?: string;
  image?: string;
  publicationDate? : string;
  user? : User;
}

export interface SavedPost  {
  id : number;
  user : User;
  post: Post;
}

export interface User {
  id? : number,
  username? : string,
  email? : string,
  description? : string,
  profileImg? : string
}

export interface UserWithPassword extends User {
  password : string
}

export interface Like {
  user : {
    id?: number
  }
  post : {
    id?: number
  }
}

export interface Comment {
  comment?: string,
  date?: string,
  post: Post,
  user? : User,
}

export interface Follow {
  follower : {
    id : number
  },
  following : {
    id : number
  }
}

export interface Story {
  media : string;
  user : {
    id : number,
    username? : string,
    profileImg? : string
  };
}

export interface ChatMessage {
  content : string;
  sender : string;
  type : string;
}
