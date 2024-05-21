// // Simple factory
// class Car {
//     run() {
//         console.log("Car is running");
//     }
// }
// class Bike {
//     run() {
//         console.log("Bike is running");
//     }
// }
// class Motorbike {
//     run() {
//         console.log("Motorbike is running");
//     }
// }
// class Factory {
//     create(type) {
//         let vehicle;
//         if (type == "car") {
//             vehicle = new Car();
//         } else if (type == "bike") {
//             vehicle = new Bike();
//         } else if (type == "motorbike") {
//             vehicle = new Motorbike();
//         } else {
//             throw Error("Invalid type");
//         }
//         return vehicle;
//     }
// }

// let vehicle;
// let factory = new Factory();
// try {
//     vehicle = factory.create("car");
//     vehicle.run();
//     vehicle = factory.create("bike");
//     vehicle.run();
// } catch (error) {
//     console.log(error);
// }

// Factory Method
class Vehicle {
    run() {
        throw new Error(
            "Vehicle is abstract class, This method should be overridden!"
        );
    }
}
class Car extends Vehicle {
    run() {
        console.log("Car is running");
    }
}
class Bike extends Vehicle {
    run() {
        console.log("Bike is running");
    }
}
class VehicleCreator {
    create() {
        throw new Error(
            "VehicleCreator is abstract class, This method should be overridden!"
        );
    }
}
class CarCreator extends VehicleCreator {
    create() {
        return new Car();
    }
}
class BikeCreator extends VehicleCreator {
    create() {
        return new Bike();
    }
}

let bikeCreator = new BikeCreator();
let bike = bikeCreator.create();
bike.run();
