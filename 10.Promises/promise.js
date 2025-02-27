let coinTossPromise = new Promise(function (resolve, reject){
    setTimeout (() => {
        const isHeads = Math.random () > 0.5
        if(isHeads){
            resolve("Heads")
        }
        else{
            reject("Tails- coin toss resulted in tails, considered as")
        }
    },1000)
})


coinTossPromise
  .then((result) => {
    console.log(result); // "Heads" if resolved
  })
  .catch((error) => {
    console.error(error); // Error message if rejected
  })
  .finally(() => {
    console.log("Coin toss completed."); // Always executed
  });