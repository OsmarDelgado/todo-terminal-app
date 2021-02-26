const { v4: uuidv4 } = require('uuid');

class Task{
    id = '';
    title = '';
    description = '';
    completed = null;

    constructor( title, description ) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.completed = null;
    };

};

module.exports = Task;