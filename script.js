class Wagon {
    constructor(capacity) {
        this.capacity = capacity;
        this.passenger = [];
    }
    
    getAvailableSeatCount = () => {
        return Number(this.capacity) - Number(this.passenger.length);
    }
    
    join = (currentPassenger) => {
        if(this.passenger.length < this.capacity) {
            this.passenger.push(currentPassenger);
        }
    }
    
    shouldQuarantine = () => {
        for(let i = 0; i < this.passenger.length; i++) {
            if(this.passenger[i].isHealthy === false) {
                return true;
            }
        }
        return false;
    }
    
    totalFood = () => {
        let howManyFood = 0;
        
        for(let i = 0; i < this.passenger.length; i++) {
            howManyFood += this.passenger[i].food;
        }
        
        return howManyFood;
    }
}

class Traveler extends Wagon {
    constructor(capacity, name) {
        super(capacity)
        this.name = name;
        this.food = 1;
        this._isHealthy = true;
    }

    hunt = () => {
        this.food += 2;
    }

    eat = () => {
        if(this.food > 0) {
            this.food -= 1;
        } else {
            this.isHealthy = false;
        }
    }
}
// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);