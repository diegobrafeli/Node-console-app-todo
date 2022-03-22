const inquirer = require('inquirer');
const Task = require('../models/task');
require('colors');



const inquirerMenu = async ()=>{

    const questions = [
        {
            type: 'list',
            name: 'option',
            message: 'What do you whant to do?',
            choices:[
                {
                    value: '1',
                    name: `${'1.'.green} Create a task`
                },
                {
                    value: '2',
                    name: `${'2.'.green} List the tasks`
                },
                {
                    value: '3',
                    name: `${'3.'.green} List done tasks`
                },
                {
                    value: '4',
                    name: `${'4.'.green} List pending tasks`
                },
                {
                    value: '5',
                    name: `${'5.'.green} Complete task(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.green} Delete a task`
                },
                {
                    value: '0',
                    name: `${'0.'.green} Exit\n`
                }
            ]
        }
    ];

    console.clear();
    console.log('============================'.green);
    console.log('      Select an option'.white);
    console.log('============================\n'.green);

    const {option} = await inquirer.prompt(questions);
    return option;
}


const pause = async () =>{

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'Enter'.green} to continue`
    }]
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const {description} = await inquirer.prompt(question);
    return description;
}

const listDeleteTask = async (tasks = []) =>{

    const choices = tasks.map((task, i) =>{

        const index = `${i + 1}.`.green
        return { 
            value: task.id,
            name: `${index} ${task.description}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'delete',
        choices
    }]

    const {id} = await inquirer.prompt(questions);
    return id;

}

const confirm = async (message) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showListCheckTask = async (tasks = []) =>{

    const choices = tasks.map((task, i) =>{

        const index = `${i + 1}.`.green
        return { 
            value: task.id,
            name: `${index} ${task.description}`,
            checked: (task.doneWhen) ? true : false
        }
    })

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select',
        choices
    }]

    const {ids} = await inquirer.prompt(question);
    return ids;

}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listDeleteTask,
    confirm,
    showListCheckTask
}