export interface Login {
  "email"?: string;
  "password"?: string
}

export interface Post {
  id? : number
  content?: string;
  image?: string;
  publicationDate? : string;
  user: {
    id?: number,
    username? : string,
  }
}

export interface User {
  id? : number,
  username? : string,
  password? : string,
  email? : string,
  registrationDate? : string,
  description? : string,
}

export interface Like {
  user : {
    id?: number
  }
  post : {
    id?: number
  }
}
