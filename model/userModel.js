class User {
    constructor(name, user, password) {
        this.name = name;
        this.user = user;
        this.password = password;
    }

    getName() {
        return this.name;
    }

    getUser() {
        return this.user;
    }

    getPassword() {
        return this.password;
    }

    setName(name) {
        this.name = name;
    }

    setUser(user) {
        this.user = user;
    }

    setPassword(password) {
        this.password = password;
    }
}

export default User;