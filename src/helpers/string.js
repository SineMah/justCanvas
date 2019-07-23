'use strict';

var StringHelper = class String {

    getId(loops, seperator) {
        let idParts = [];

        if(typeof loops === 'undefined')
            loops = 5;

        if(typeof seperator === 'undefined')
            seperator = '-';

        for(let i = 0; i < loops; i++) {

            idParts[i] = this.s4();
        }

        return idParts.join(seperator);;
    }

    s4() {

        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
};

export default new StringHelper();