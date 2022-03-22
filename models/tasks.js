const Task = require('./task');
require ('colors');

class Tasks {

    _list = {}

    constructor(){
        this._list = {}
    }

    deleTask (id = ''){
        if( this._list[id] ){
            delete this._list[id];
        }
    }

    get listArray(){
        const list = [];

        Object.keys(this._list).forEach((key)=>{
            const task = this._list[key];
            list.push(task);
        })
        return list;
    }

    loadTaskFromArray(tasks = []) {
        tasks.forEach((task)=>{
            this._list[task.id] = task
        })
    }

    listComplete (){

        console.log();
        Object.keys(this._list).forEach((key, i)=>{

            const {description, doneWhen} = this._list[key];
            const index = ((i + 1) + '.').green;
            const statusTask = (!!doneWhen) 
                                    ? 'Done'.green 
                                    : 'Pending'.red
            
            console.log(`${index} ${description} :: ${statusTask}`);
        })

    }

    listDonePending (done = true){

        console.log();
        let i = 0;

        Object.keys(this._list).forEach((key)=>{

            const {description, doneWhen} = this._list[key];
            
            if(!done && !!doneWhen) return
            if(done && !!!doneWhen) return

            const statusTask = (!!doneWhen) 
                                    ? doneWhen.green 
                                    : 'Pending'.red
            i++                        
            const index = (i + '.').green;
            console.log(`${index} ${description} :: ${statusTask}`);
        })

    }

    createTask (description = '') {

        const task = new Task(description);
        this._list[task.id] = task;
    }

    ToggleCompleted (ids = []){
        ids.forEach((id) =>{
            const task = this._list[id]
            if( !task.doneWhen ) task.doneWhen = new Date().toISOString();
        })

        this.listArray.forEach((task) =>{
            
            if(!ids.includes(task.id)){
                this._list[task.id].doneWhen = null;
            }
        })
    }
}

module.exports = Tasks;