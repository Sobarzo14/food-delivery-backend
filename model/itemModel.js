class Item {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getCalories() {
        return this.calories;
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    setCalories(calories) {
        this.calories = calories;
    }

}

export default Item;
