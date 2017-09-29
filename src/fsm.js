class FSM {

    constructor(config) {
        if(!config) throw new Error();
        this.config = config;
        this.state = [this.config.initial];
        this.place = [];
    }

    getState() {
        return this.state[this.state.length-1];
    }

    changeState(state) {
        if (this.config.states[state]) {
            this.state.push(state);
            this.place = [];
        } else {
            throw new Error();
        }
    }

    trigger(event) {
        var state = this.getState();
        if (this.config.states[state].transitions[event]) {
            this.state.push(this.config.states[state].transitions[event]);
            this.place = [];
        } else {
            throw new Error();
        }
    }

    reset() {
        this.state = [this.config.initial];
    }

    getStates(event) {
        var states = [];
        for (var param in this.config.states) {
            if (!event) states.push(param);
            else {
                if (event in this.config.states[param].transitions)states.push(param);
            }
        }
        return states;
    }

    undo() {
        if (this.state.length !==1) {
            this.place.push(this.state.pop());
            return true;
        }   else  return false;
    }

    redo() {
        var remove = this.place.pop();
        if (remove) {
            this.state.push(remove);
            return true;
        }   else return false;
    }

    clearHistory() {
        this.state = [this.config.initial];
        this.place = [];
    }
}
module.exports = FSM;

