// Import inquirer and colors
const inquirer = require('inquirer');
require('colors');

// Function for create menu
const inquirerMenu = async () => {
    // Menu options
    const questions = [
        {
            type : 'list',
            name : 'option',
            message : 'What do you want to do?',
            choices : [ 
                {
                    value : '1',
                    name : `${ '1.'.green } Create task`
                },
                {
                    value : '2',
                    name : `${ '2.'.green } List task`
                },
                {
                    value : '3',
                    name : `${ '3.'.green } List completed task`
                },
                {
                    value : '4',
                    name : `${ '4.'.green } List pending task`
                },
                {
                    value : '5',
                    name : `${ '5.'.green } Complete task`
                },
                {
                    value : '6',
                    name : `${ '6.'.green } Delete task`
                },
                {
                    value : '0',
                    name : `${ '0.'.green } Exit`
                },
            ]
        }
    ];

    // Clear console after app execution
    console.clear();
    
    // Header menu
    console.log('======================='.green);
    console.log('   Select an option'.white);
    console.log('=======================\n'.green);

    // Create menu with inquirer and the questions for menu
    const { option } = await inquirer.prompt( questions );

    // Return value from menu
    return option;
};

// Function for pause menu
const pause = async () => {
    // Paused with enter
    const question = [ 
        {
            type : 'input',
            name : 'enter',
            message : `\nPress ${ 'ENTER'.green } to continue\n\n`
        }
    ];

    // Create pause in terminal
    await inquirer.prompt( question );
};

// Funtion for read user input
const readInput = async ( titleTask, message ) => {
    // Input title and description
    const question = [
        {
            type : 'input',
            name : 'title',
            message : titleTask,
            validate( value ) {
                if( value.length === 0 ) return 'Please, type a value';

                return true;
            }
        },

        {
            type : 'input',
            name : 'description',
            message,
            validate( value ) {
                if( value.length === 0 ) return 'Please, type a value';

                return true;
            }
        }
    ];

    // Destructuring title and description from user input
    const { title, description } = await inquirer.prompt( question );

    // Return title and description as object
    return { title, description };
};

// Function list for delete tasks
const listTasksDelete = async ( tasks = [] ) => {
    // Map for tasks to get the title and return to questions
    const choices = tasks.map( ( task, i ) => {
        // Set number for list
        const idx = `${ i + 1 }.`.green;

        return {
            value : task.id,
            name : `${ idx } ${ task.title }`
        }
    } );

    // Add to choices init the number 0 for cancel
    choices.unshift( {
        value : '0',
        name : '0'.green + ' Cancel'
    } );

    // Config the questions for inquirer for get a tasks list
    const questions = [
        {
            type : 'list',
            name : 'id',
            message : 'Borrar',
            choices
        }
    ];

    // Get ID value from questions and show the list in terminal
    const { id } = await inquirer.prompt( questions );

    return id;
};

// Function for confirm the choice in terminal
const confirmChoice = async ( message ) => {
    // Config the question for inquirer with confirm type
    const question = [
        {
            type : 'confirm',
            name : 'ok',
            message
        }
    ];

    // Get the ok value (true or false)
    const { ok } = await inquirer.prompt( question );

    return ok;
};

// Function checklist for delete tasks
const checklistTasks = async ( tasks = [] ) => {
    // Map for tasks to get the title and return to questions
    const choices = tasks.map( ( task, i ) => {
        // Set number for list
        const idx = `${ i + 1 }.`.green;

        return {
            value : task.id,
            name : `${ idx } ${ task.title }`,
            checked : ( task.completed ) ? true : false
        }
    } );

    // Config the questions for inquirer for get a tasks list
    const question = [
        {
            type : 'checkbox',
            name : 'ids',
            message : 'Select',
            choices
        }
    ];

    // Get ID value from questions and show the list in terminal
    const { ids } = await inquirer.prompt( question );

    return ids;
};

// Export modules
module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirmChoice,
    checklistTasks,
}