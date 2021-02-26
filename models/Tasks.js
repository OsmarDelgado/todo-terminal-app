// Import colors for use in code
require('colors');

// Import Task models 
const Task = require('./Task');

// Declaration Tasks class
class Tasks {
    // Key saved in this object
    _list = {};

    // Getter list_arr
    get list_arr() {
        // Array 
        const list = [];

        // Extract keys from _list and save in const task, push in list and return
        Object.keys( this._list ).forEach( key => {
            const task = this._list[ key ];

            // Push task in list
            list.push( task );
        } );

        // Return list
        return list;
    }

    // Constructor
    constructor() {
        this._list = {};
    };

    // Load tasks from DB 
    loadTasksFromArray( tasks = [] ) {
        // Get task with for each from tasks and save in task
        tasks.forEach( task => {
            this._list[ task.id ] = task;
        } );
    };

    // Create task with title and description from user input
    createTask( title = '', description = '' ) {
        // Create new instance for Task and create the task with title and description
        const task = new Task( title, description );

        // Save the task in _list
        this._list[ task.id ] = task;
    };

    // List all task from DB
    listAll() {
        // Get information from tasks for print in console
        this.list_arr.forEach( (task , i) => {
            const idx = `${i + 1}.`.green;
            
            // Get state of task for know if task is completed or pending
            const stateOfTask = ( task.completed ) ? 'Completed'.green : 'Pending'.red;

            // Print all tasks in console with their information
            console.log( `${ idx } ${ (task.title).cyan } :: ${ (task.description).gray } :: ${ stateOfTask }` );
        } );
    };
    
    // List completed task from DB
    listCompletedPendingTasks( completed = true ) {
        // Counter for enumerate tasks
        let count = 0;

        // Get information from tasks for print in console
        this.list_arr.forEach( task => {
            // Get state of task for know if task is completed or pending
            const stateOfTask = ( task.completed ) ? 'Completed'.green : 'Pending'.red;
            
            // Check if completed is true or false
            // If completed is true
            if( completed ) {
                // Check if task.completed exist and list all task completed
                if( task.completed ) {
                    count += 1;
                    console.log( `${ (count + '.').green }. ${ (task.title).cyan } :: ${ (task.description).gray } :: ${ task.completed.green }` );
                }
            } else {
                // Check if task.completed not exist and list all task pending
                if( !task.completed ) {
                    count += 1;
                    console.log( `${ (count + '.').green }. ${ (task.title).cyan } :: ${ (task.description).gray } :: ${ stateOfTask }` );
                }
            }
        } );
    };

    // List tasks for select what task will be deleted
    deleteTask( id = '' ) {
        // If the id is correct delete task
        if( this._list[ id ] ) {
            delete this._list[ id ];
        }
    };

    // Verify toggle tasks
    toggleCompleted( ids = [] ) {
        // Check all ids and if a task is selected and mark completed, put a completed date
        ids.forEach( id => {
            const task = this._list[ id ];
            if( !task.completed ) {
                task.completed = new Date().toISOString();
            }
        } );

        // If the deselected tasks were selected set completed date to null
        this.list_arr.forEach( task => {
            if( !ids.includes(task.id) ) {
                this._list[ task.id ].completed = null;
            }
        } );
    };
};

// Export modules
module.exports = Tasks;