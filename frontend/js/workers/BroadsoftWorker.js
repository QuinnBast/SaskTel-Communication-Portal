
import UpdateQueue from "UpdateQueue"
import BroadSoft from "../broadsoft/BroadSoft"

const broadsoftWorkerCode = () => {
    // Set a timer to execute updates every minute.
    setInterval(function(){

        console.log("Worker was executed.");

        // Are items in the queue?
        if(!UpdateQueue.hasUpdates()) return;

        // If items are in the queue, process them and send requests to broadsoft.
        for(let i = 0; i < UpdateQueue.queue.length; i++){
            // Send broadsoft requests for each update.
            BroadSoft.sendRequest(
                {
                    endpoint: UpdateQueue.queue[i].endpoint,
                    data: UpdateQueue.queue[i].data,
                    method: UpdateQueue.queue[i].method,
                    callback: UpdateQueue.queue[i].callback
                }
            );

            // Remove the item from the queue.
            UpdateQueue.queue.splice(i, 1);
        }

    }, 60000);

};

let code = broadsoftWorkerCode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;