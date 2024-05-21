# Factory Method

<aside>
💡 **Factory Method Pattern:** Think of it as a way to make objects with flexibility. It’s like having a blueprint for creating things. You define an interface for creating objects, but the actual creation is left to subclasses. This means different subclasses can create objects of different types using the same method.

</aside>

# 1. Simple Factory

<aside>
💡 **Simple Factory** is not an official design pattern recognized by GoF (Gang of Four), but a popular approach to object instantiation. Simple Factory provides a static method to create concrete objects based on some input parameters.

</aside>

### **Structure**

- **Factory Class**: Contains a static method to create and return specific objects.
- **Product**: Object classes are created by Factory Class.

### Implement

```jsx
// Simple factory
class Car {
    run() {
        console.log("Car is running");
    }
}
class Bike {
    run() {
        console.log("Bike is running");
    }
}
class Factory {
    create(type) {
        let vehicle;
        if (type == "car") {
            vehicle = new Car();
        } else if (type == "bike") {
            vehicle = new Bike();
        } else {
            throw Error("Invalid type");
        }
        return vehicle;
    }
}

let vehicle;
let factory = new Factory();
try {
    vehicle = factory.create("car");
    vehicle.run(); // Car is running
    vehicle = factory.create("bike");
    vehicle.run(); // Bike is running
} catch (error) {
    console.log(error);
}
```

### Disadvantages

- Use static methods to create objects. Object creation logic is centralized in a single place.
- Difficult to extend because static method logic must be modified when new object types are added.
- Suitable for small applications or when the number of object types is small and does not change frequently.

# 2. Factory Method

<aside>
💡 **Factory Method** is an official GoF design pattern. It defines an object initialization method, but lets the subclasses decide which class should be instantiated. Factory Method allows a class to defer object initialization to its subclasses.

</aside>

### **Structure**

- **Product** : The interface or abstract class of the object created by the **Factory Method**.
- **ConcreteProduct** : Product concrete implementation classes.
- **Creator** : Abstract class or concrete class containing **Factory Method**.
- **ConcreteCreator** : Creator implementation subclasses override **Factory Method** to create concrete objects.

### Implement

```jsx
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
		// factory method
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
bike.run(); // Bike is running
```

### Advantages

- Use abstract or virtual methods overridden by subclasses to create objects. Each subclass can have its own way of creating objects.
- Easier to extend, just add new subclasses without changing existing code.
- Suitable for large, complex applications where there are many types of objects and high scalability requirements.