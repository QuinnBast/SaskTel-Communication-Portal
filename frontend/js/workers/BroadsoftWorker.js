
//import UpdateQueue from "UpdateQueue"

const broadsoftWorkerCode = () => {
    // Set a timer to execute updates every minute.
    setInterval(function(){

    console.log("Worker was executed.");

    // Get the queue
    //if(!UpdateQueue.hasUpdates()) return;

    //

}, 60000);

};

let code = broadsoftWorkerCode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;