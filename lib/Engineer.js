const Employee = require("./Employee");

class Engineer extends Employee{
    
    constructor(name, id, email, github){
        super(name, id, email); //inhrits properties from the Employee Class
        this.github = github;
    }
    //gets the github user name of the engineer
    getGithub(){
        return this.github;
    }
    //gets the role to the employee
    getRole(){
        return "Engineer" //overriden to return engineer
    }
}

module.exports = Engineer;