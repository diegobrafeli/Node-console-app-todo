require('colors');
const { 
    inquirerMenu, 
    pause, 
    readInput,
    listDeleteTask,
    confirm,
    showListCheckTask
} = require('./helpers/inquirer');
const { saveDB, readFile } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () =>{

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readFile();

    if(tasksDB){
        //Set tasks
        tasks.loadTaskFromArray(tasksDB)
    }

    do {
        //print the menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //create option
                const description = await readInput('Description:');
                tasks.createTask(description);
            break;

            case '2':
                tasks.listComplete();
            break;

            case '3':
                tasks.listDonePending(true);
            break;

            case '4':
                tasks.listDonePending(false);
            break;

            case '5':
                const ids = await showListCheckTask(tasks.listArray);
                tasks.ToggleCompleted(ids);
            break;

            case '6':
                const id = await listDeleteTask(tasks.listArray);
                if(id !== '0'){
                    const ok = await confirm('Are you sure?');

                    if(ok){
                        tasks.deleTask(id);
                        console.log('Deleted task');
                    }
                }
                
    
            break;
      
        }

        saveDB(tasks.listArray)

        opt !== '0' ? await pause() : console.clear();
        //console.log(x);
    }while(opt !== '0')

}

main();