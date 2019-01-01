/**
 * Broadsoft imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

class UpdateQueue {

    constructor() {
        this.queue = [];
        this.success = 0;
        this.failed = 0;
        this.total = 0;
        this.status = "waiting";

        this.addUpdate = this.addUpdate.bind(this);
        this.hasUpdates = this.hasUpdates.bind(this);
        this.deQueue = this.deQueue.bind(this);
        this.parseQueue = this.parseQueue.bind(this);
        this.addSuccess = this.addSuccess.bind(this);
        this.addFailure = this.addFailure.bind(this);
        this.checkComplete = this.checkComplete.bind(this);
    }

    addUpdate(update){
        //Determine if the endpoint already exists in the queue.
        for(let item of Array.from(this.queue)){
            // If the endpoint is already in the queue, overwrite the element in the queue with the new request.
            if(item.endpoint === update.endpoint){
                item = update;
                console.log("Updated item: " + update.endpoint);
                return;
            }
        }
        this.queue.push(update);

        console.log("Added to Queue: " + update.endpoint);
    };

    hasUpdates(){
        return this.queue.length > 0;
    }

    deQueue(){
        // pop's head and return it.
        return this.queue.shift();
    }

    parseQueue(){

        this.status = "processing";
        this.success = 0;
        this.failed = 0;
        this.total = this.queue.length;

        // If items are in the queue, process them and send requests to broadsoft.
        let i = 0;

        while(this.hasUpdates()){
            // Send broadsoft requests for each update.
            BroadSoft.sendRequest(this.deQueue());
            console.log("sending element " + (++i).toString());
        }
        console.log("Queue Empty. Processed " + i.toString() + " elements.");
    };

    addSuccess(){
        this.success = this.success + 1;
        this.checkComplete();
    };

    addFailure(){
        this.failed = this.failed + 1;
        this.checkComplete();
    };

    checkComplete(){
        if(this.total === this.success + this.failed){
            this.status = "completed";

            setTimeout(function(){this.status = "waiting"}, 10000);
        }
    }
}

export default new UpdateQueue();