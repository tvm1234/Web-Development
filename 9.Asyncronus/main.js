// Synchronus Functions

/*
const task1 = () =>{
    console.log("Task 1 done")
}

const heavyTask = () =>{
    console.log("Heavy task started")
    const start = Date.now()
    console.log(new Date())
    while (Date.now() - start < 3000) {
        // 3s will be elapsed...
    }
    
    console.log("Heavy task end")
    console.log(new Date())
}

const task2 = () =>{
    console.log("Task 2 done")
}

task1()
heavyTask()
task2()
*/


// Asynchronus Functions
const task3 = () =>{
    console.log("Task 1 done")
}

const heavyAsyncTask = () => {
    console.log("Heavy async task start")

    console.log("set timeout called", new Date())
    setTimeout(function () {
        console.log("Async task done")
        console.log("inside the set timeout function is called", new Date())
    }, 5000)
}

const task4 = () =>{
    console.log("Task 2 done")
}

task3()
heavyAsyncTask()
task4()