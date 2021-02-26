// Import colors for use in code
require('colors');

// Destructuring from helpers inquierer
const { inquirerMenu, pause, readInput, listTasksDelete, confirmChoice, checklistTasks } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');

// Import Tasks models
const Tasks = require('./models/Tasks');

/**
 * Main function
 */
const main = async () => {
    // Initialize opt for options in menu
    let opt = '';

    // Declaration new instance
    const tasks = new Tasks();

    // Save all data in taskDB from DB
    const taskDB = readDB();

    // Load tasks if exists
    if( taskDB ) tasks.loadTasksFromArray( taskDB );

    // Do - While for create menu and evaluate opt if not 0
    do {
        // Print Menu
        opt = await inquirerMenu();
        
        switch( opt ) {
            // Option 1: Create new task
            case '1':
                // Destructuring title and description from user input
                const { title, description } = await readInput('Title:', 'Description:')

                // Create task with title and description
                tasks.createTask( title, description );
            break;

            // Option 2: List all tasks
            case '2':
                // List all tasks in pretty format
                tasks.listAll( taskDB );
            break;

            // Option 3: List all tasks completed
            case '3':
                // List tasks completed
                tasks.listCompletedPendingTasks( true );
            break;

            // Option 4: List all tasks pending
            case '4':
                // List tasks pending
                tasks.listCompletedPendingTasks( false );
            break;

            // Option 5: Complete a task
            case '5':
                // Get all ids for check or uncheck tasks
                const ids = await checklistTasks( tasks.list_arr );

                // Toggle selected tasks
                tasks.toggleCompleted( ids );
            break;

            // Option 6: Delete a task
            case '6':
                // Get the id from list_arr
                const id = await listTasksDelete( tasks.list_arr );

                // If id is not '0' ask to confirm for delete a task
                if( id !== '0' ) {
                    const confirm = await confirmChoice('Are you sure?');
    
                    // if confirm is true delete the task with ID
                    if( confirm ) {
                        tasks.deleteTask( id )
                        console.log('Task deleted!');
                    }
                }
            break;

            // Option 0: Exit from app
        }

        // Save all data in db
        saveDB( tasks.list_arr );

        await pause();

    } while( opt !== '0' );
    //pause();
};

// Call main function
main();