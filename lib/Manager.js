const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email); //inhrits properties from the Employee Class
        this.officeNumber = officeNumber;
        
    }
    // gets the role of the employee
    getRole(){
        return "Manager" //overridden to return Manager
    }
    //get's the managers office Number
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;