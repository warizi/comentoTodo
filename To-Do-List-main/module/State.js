class State {
    constructor(initState, changeStateFn) {
        this.changeStateFn = changeStateFn;
        this.state = initState;
    }

    getState() {
        return this.state;
    }
    setState(state) {
        if(this.state !== state) {
            this.state = state
            this.changeStateFn(this.state);
            return
        }
    }
}

export default State;
