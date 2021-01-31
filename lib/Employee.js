class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email
    }
    //gets the employee name
    getName(){
        return this.name;
    }
    //gets the employee Id
    getId(){
        return this.id;
    }
    //gets the employee email
    getEmail(){
        return this.email;
    }
    //gets the employees' role
    getRole(){
        return "Employee"; //overridden to return Employee
    }
}

module.exports = Employee;