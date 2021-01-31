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
//validates user's answers to make it's not an empty string
// const answerValidation = (answer) =>{
//     if(answer ===''){
//         return ('please enter required infomation');
//     }
//     return true;
// }

//question used to ask the user
const questions = [
    {
        type:'input',
        name:'name',
        message:'Please enter an employee name',
        // validate:  answerValidation
    },
    {
        type:'input',
        name:'id',
        message:'Please enter an employee id',
        // validate:  answerValidation
    },
    {
        type:'input',
        name:'email',
        message:'Please enter the employees\' email',
        // validate:  answerValidation
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
        when: (answers) => answers.position === 'Manager',
        // validate:  answerValidation
    },
    {
        type:'input',
        name:'github',
        message:'Please enter the Engineers github username',
        when: (answers) => answers.position === 'Engineer',
        // validate:  answerValidation
    },
    {
        type:'input',
        name:'school',
        message:'Please enter the Interns school name',
        when: (answers) => answers.position === 'Intern',
        // validate:  answerValidation
    },
    {
        type:'confirm',
        name:'addEmployee',
        message:'Would you like to add another Employee?'
    }

];

//starts inquirer and gets all the responses from the user
async function ask (){
   const answers = await inquirer.prompt(questions)
    //check the position of the employee
    if(answers.position === 'Manager'){
        // instantiate a new Manger
        const manager = new Manager(
            answers.name,answers.id, answers.email, answers.officeNumber
        )
        employees.push(manager);
    }
    else if(answers.position === 'Engineer'){
        // instantiate a new Engineer
        const engineer = new Engineer(
            answers.name,answers.id, answers.email, answers.github
        )
        employees.push(engineer);
    }
    else if(answers.position === 'Intern'){
        // instantiate a new Intern
        const intern = new Intern(
            answers.name,answers.id, answers.email, answers.school
        )
        employees.push(intern);
    }
    //check if user wants to add a new employee
    if(answers.addEmployee === true){
        console.log(`\n--------------Nem Employee--------------\n`)
        ask()
    }else{
        endMessage();
        //write to team html file 
        fs.writeFile(outputPath,render(employees),err=>{
            err ? console.error(err) : "File written to team.html";
        });
    }
    
}
//welcome message
function welcomeMessage(){
    console.log(`Welcome to team builder
    ------------------------------`)
}
//end message
function endMessage(){
    console.log(`------------------------
    Thank you for using Team Generator`);
}

welcomeMessage();
//starts the ask function
ask();
