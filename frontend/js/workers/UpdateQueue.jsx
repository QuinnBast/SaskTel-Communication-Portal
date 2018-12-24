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
        for(var i = 0; i < this.queue.length; i++){

            // If the endpoint is already in the queue, overwrite the element in the queue with the new request.
            if(this.queue[i].endpoint === update.endpoint){
                this.queue[i] = update;
                console.log("Updated queue for: " + update.endpoint);
                return;
            }
        }

        this.queue.push(update);

        console.log("Added to Queue: " + update.endpoint);
    }

    hasUpdates(){
        return this.queue.length > 0;
    }
}

export default new UpdateQueue();