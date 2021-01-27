const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

//question used to ask the user
const questions = [
    {
        type:'input',
        name:'name',
        message:'Please enter an employee name'
    },
    {
        type:'input',
        name:'id',
        message:'Please enter an employee id'
    },
    {
        type:'input',
        name:'email',
        message:'Please enter the employees\' email'
    },
    {
        type:'list',
        name:'position',
        message:'Please choose Employees position',
        choices:['Manager', 'Engineer', 'Intern']
    },
    {
        type:'input',
        name:'officeNumber',
        message:'Please enter the Managers office number',
        when: (answers) => answers.position === 'Manager'
    },
    {
        type:'input',
        name:'github',
        message:'Please enter the Engineers github username',
        when: (answers) => answers.position === 'Engineer'
    },
    {
        type:'input',
        name:'school',
        message:'Please enter the Interns school name',
        when: (answers) => answers.position === 'Intern'
    },
    {
        type:'confirm',
        name:'addEmployee',
        message:'Would you like to add another Employee?'
    }

];

//starts inquirer and gets all the responses from the user
function ask (){
    inquirer.prompt(questions)
    .then(answers=>{
        if(answers.position === 'Manager'){
            const manager = new Manager(
                answers.name,answers.id, answers.email, answers.officeNumber
            )
            employees.push(manager);
        }
        if(answers.position === 'Engineer'){
            const engineer = new Engineer(
                answers.name,answers.id, answers.email, answers.github
            )
            employees.push(engineer);
        }
        if(answers.position === 'Intern'){
            const intern = new Intern(
                answers.name,answers.id, answers.email, answers.school
            )
            employees.push(intern);
        }
        if(answers.addEmployee === true){
            ask()
        }else{
            render(employees)
        }
    })
}
//starts the ask function
ask();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```