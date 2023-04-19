const Band = require("./band");

class Bands{

    constructor(){

    }

    addBand(band = new Band()){
        this.Bands.push(band);
    }
}