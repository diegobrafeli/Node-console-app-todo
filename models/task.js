const { v4 : uuidv4 } = require( 'uuid')

class Task {
    id = '';
    description = '';
    doneWhen = null;

    constructor(description){

        this.id = uuidv4();
        this.description = description;
        this.doneWhen = null;
        
    }
}

module.exports = Task;