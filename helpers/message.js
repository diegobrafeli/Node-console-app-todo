require('colors');

const showMenu = () =>{

    return new Promise((resolve)=>{
        console.clear();
        console.log('============================'.green);
        console.log('      Select an option'.green);
        console.log('============================\n'.green);
        
        console.log(`${'1.'.green} Create a task`);
        console.log(`${'2.'.green} List the tasks`);
        console.log(`${'3.'.green} List done tasks`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Complete task(s)`);
        console.log(`${'5.'.green} Delete a task`);
        console.log(`${'0.'.green} Exit\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Select an option: ', (opt)=>{
            readLine.close();
            resolve(opt);
        })
    })

    

}

const pause = () =>{

    return new Promise((resolve)=>{

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`\nPress ${'Enter'.green} to continue\n`, (opt)=>{
            readLine.close();
            resolve();
        })

    })
}

module.exports = {
    showMenu,
    pause
}