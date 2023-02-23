export interface Login {
  "email"?: string;
  "password"?: string
}

export interface Post {
  content: string;
  image: string;
  user: {
    id: number
  }
}
