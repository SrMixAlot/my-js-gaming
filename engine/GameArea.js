class GameArea {

    constructor(height, width) {
        this.canvas = document.createElement("canvas");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
    }

    start() {
        // insert canvas to doc
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(this.update, 20);
    }

    stop() {
        clearInterval(this.interval);
    }

    update() {
        this.clear;
        this.frameNo++;
    }

    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }


}
