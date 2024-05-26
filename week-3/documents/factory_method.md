# Factory Method

<aside>
💡 **Factory Method Pattern**: Think of it as a way to make objects with flexibility. It’s like having a blueprint for creating things. You define an interface for creating objects, but the actual creation is left to subclasses. This means different subclasses can create objects of different types using the same method.

</aside>

![https://www.oreilly.com/api/v2/epubs/9781449334840/files/httpatomoreillycomsourceoreillyimages1547813.png](https://www.oreilly.com/api/v2/epubs/9781449334840/files/httpatomoreillycomsourceoreillyimages1547813.png)

## **When to Use the Factory Pattern**

The Factory pattern can be especially useful when applied to the following situations:

- When our object or component setup involves a high level of complexity.
- When we need to easily generate different instances of objects depending on the environment we are in.
- When we are working with many small objects or components that share the same properties.
- When composing objects with instances of other objects that need only satisfy an API contract (a.k.a., duck typing) to work. This is useful for decoupling

# 1. Simple Factory

<aside>
💡 **Simple Factory** is not an official design pattern recognized by GoF (Gang of Four), but a popular approach to object instantiation. Simple Factory provides a static method to create concrete objects based on some input parameters.

</aside>

## 1.1 Using

<aside>
💡 The key objective of the **Simple Factory** is extensibility. **Simple Factory** are frequently used in applications that manage, maintain, or manipulate collections of objects that are different but at the same time have many characteristics (i.e. methods and properties) in common. An example would be a collection of documents with a mix of Xml documents, Pdf documents, and Rtf documents.

</aside>

## 1.2 Diagram

![https://www.dofactory.com/img/diagrams/javascript/javascript-factory-method.jpg](https://www.dofactory.com/img/diagrams/javascript/javascript-factory-method.jpg)

## 1.3 Participants

The objects participating in this pattern are:

- **Creator** -- In example code: **Factory**
    - the 'factory' object that creates new products
    - implements 'factoryMethod' which returns newly created products
- **AbstractProduct** -- not used in JavaScript
    - declares an interface for products
- **ConcreteProduct** -- In example code: **Car, Bike**
    - the product being created
    - all products support the same interface (properties and methods)

## 1.4 Implement

<aside>
💡 The AbstractProduct in the diagram is not implemented because Javascript does not support abstract classes or interfaces. However, we still need to ensure that all employee types have the same interface (properties and methods).

</aside>

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

## 1.5 Note

- Use static methods to create objects. Object creation logic is centralized in a single place.
- Difficult to extend because static method logic must be modified when new object types are added.
- Suitable for small applications or when the number of object types is small and does not change frequently.

# 2. Factory Method

<aside>
💡 **Factory Method** is an official GoF design pattern. It defines an object initialization method, but lets the subclasses decide which class should be instantiated. Factory Method allows a class to defer object initialization to its subclasses.

</aside>

## 2.1 Using

- Suppose we have two Abstract Factories whose task it is to create page controls, such as, buttons, textboxes, radio buttons, and listboxes. One is the Light Factory which creates controls that are white and the other the Dark Factory which creates controls that are black. Both Factories creates the same types of controls, but they differ in color, which is their common theme. This is an implementation of the Abstract Factory pattern.
- Over time the Abstract Factory and Factory Method patterns have merged into a more general pattern called Factory. A Factory is simply an object that creates other objects.
- You may be wondering why you would want to leave the responsibility of the construction of objects to others rather than simply calling a constructor function with the new keyword directly. The reason is that that constructor functions are limited in their control over the overall creation process and sometimes you will need to hand over control to a factory that has broader knowledge.
- This includes scenarios in which the creation process involves object caching, sharing or re-using of objects, complex logic, or applications that maintain object and type counts, and objects that interact with different resources or devices. If your application needs more control over the object creation process, consider using a Factory.

## 2.2 Diagram

![https://www.dofactory.com/img/diagrams/javascript/javascript-abstract-factory.jpg](https://www.dofactory.com/img/diagrams/javascript/javascript-abstract-factory.jpg)

## 2.3 Participants

The objects participating in this pattern are:

- **AbstractFactory** -- not used in JavaScript
    - declares an interface for creating products
- **ConcreteFactory** -- In example code: **CarFactory, BikeFactory**
    - a factory object that 'manufactures' new products
    - the create() method returns new products
- **Products** -- In example code: **Car, Bike**
    - the product instances being created by the factory
- **AbstractProduct** -- not used in JavaScript
    - declares an interface for the products that are being created

## 2.4 Implement

<aside>
💡 JavaScript does not support class-based inheritance therefore the abstract classes as depicted in the diagram are not used in the JavaScript example. Abstract classes and interfaces enforce consistent interfaces in derived classes. In JavaScript we must ensure this consistency ourselves by making sure that each 'Concrete' object has the same interface definition (i.e. properties and methods) as the others

</aside>

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

class VehicleFactory {
		// factory method
    create() {
        throw new Error(
            "VehicleCreator is abstract class, This method should be overridden!"
        );
    }
}
class CarFactory extends VehicleFactory {
    create() {
        return new Car();
    }
}
class BikeFactory extends VehicleFactory {
    create() {
        return new Bike();
    }
}

let bikeCreator = new BikeFactory();
let bike = bikeCreator.create();
bike.run(); // Bike is running
```

## 2.5 Note

- Use abstract or virtual methods overridden by subclasses to create objects. Each subclass can have its own way of creating objects.
- Easier to extend, just add new subclasses without changing existing code.
- Suitable for large, complex applications where there are many types of objects and high scalability requirements.