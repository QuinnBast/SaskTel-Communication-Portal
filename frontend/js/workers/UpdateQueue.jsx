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


    addUpdate(update){

        //Determine if the endpoint already exists in the queue.
        for(var i = 0; i < this.queue.length; i++){
            if(this.queue[i].endpoint === update.endpoint){
                this.queue[i] = update;
                return;
            }
        }

        this.queue.push(update)
    }

    hasUpdates(){
        return this.queue.length > 0;
    }
}

export default new UpdateQueue();