
class Dog{
    constructor(){
        this.name = "foo"
    }
    static bread(breadName){
        return `Bread of dog is : ${breadName}`
    }
    
    getInfo(){
        return `complete info about dog! name : ${this.name}`
    }
}

const obj = new Dog()
console.log( Dog.bread("lebra") )