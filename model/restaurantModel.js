class Item {
    constructor(name, menu) {
        this.name = name;
        this.menu = menu;
    }

    getName() {
        return this.name;
    }

    getMenu() {
        return this.menu;
    }

    setName(name) {
        this.name = name;
    }

    setMenu(menu) {
        this.menu = menu;
    }
}

export default Item;
