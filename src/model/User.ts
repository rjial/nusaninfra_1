export class User {
    email: String;
    password: String;

    constructor(email: String, password: String) {
        this.email = email;
        this.password = password;
    }
}

export class UserFull {
    email: String;
    password: String;
    name: String;

    constructor(email: String, password: String, name: String) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

export class UserRegister {
    email: String;
    password: String;
    passwordConf: String;
    name: String;

    constructor(email: String, password: String, passwordConf: String, name: String) {
        this.email = email;
        this.password = password;
        this.passwordConf = passwordConf;
        this.name = name;
    }
}