let coinTossPromise =  new Promise(function(resolve,reject){
    setTimeout (() => {
        const isHeads = Math.random() > 0.5
        if (isHeads){
            resolve("Heads")
        }
        else {
            reject("Tails")
        }
    },1000)
})


coinTossPromise
.then((result) =>{
    console.log(result);
})
.catch((error) =>{
    console.log(result);
})
.finally(() =>{
    console.log("coin toss complete");
})

// coinTossPromise
//   .then((result) => {
//     console.log(result); // "Heads" if resolved
//   })
//   .catch((error) => {
//     console.error(error); // Error message if rejected
//   })
//   .finally(() => {
//     console.log("Coin toss completed."); // Always executed
//   });