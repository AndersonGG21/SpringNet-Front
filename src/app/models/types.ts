export interface Login {
  "email"?: string;
  "password"?: string
}

export interface Post {
  content?: string;
  image?: string;
  publicationDate? : string;
  user: {
    id?: number,
    username? : string,
  }
}
