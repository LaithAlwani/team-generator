const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email,school){
        super(name, id, email); //inhrits properties from the Employee Class
        this.school = school;
    }
    // gets the role of the employee
    getRole(){
        return "Intern" //overreidden to reutrn Intern
    }
    //gets name of the school
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;