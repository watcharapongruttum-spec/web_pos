export interface ResLogin {
    token: string;
    user:  User;
}

export interface User {
    id:       number;
    username: string;
    name:     string;
}
