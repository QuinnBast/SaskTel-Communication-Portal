class UpdateQueue {

    constructor() {
        this.queue = [];

        /*

        Each item in the queue is:

        {
            endpoint: ""
            data: ""
            method: ""
            callback: function(){}
        }

         */

    }

    getKeyArray(object){

        let keyList = [];

        for(let key of Object.keys(object)){
            keyList.push(key);
            // access the key
            if(typeof object[key] === 'object'){
                keyList.push(this.getKeyArray(object[key]))
            }
        }
        return keyList
    }


    addUpdate(update){

        // Stringify any data and replace slashes
        if(update.data) {
            update.data = JSON.stringify(update.data, this.getKeyArray(update.data)).replace("'", '"');
        }

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
    }

    hasUpdates(){
        return this.queue.length > 0;
    }

    deQueue(){
        // pop's head and return it.
        return this.queue.shift();
    }


}

export default new UpdateQueue();