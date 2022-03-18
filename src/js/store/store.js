class Store {

  constructor() {
    this.state = {};
    this.subscribers = {};
  }

  subscribe(state, subscriber) {
    if (!this.subscribers[state]) {
      this.subscribers[state] = [];
      this.observe(state);
    }
    this.subscribers = {
      ...this.subscribers,
      [state]: [...this.subscribers[state], subscriber],
    };
  }

  unsubscribe(state) {
    this.subscribers[state].pop();
  }

  observe(state) {
    let _value = this.state[state];
    Object.defineProperty(this.state, state, {
      get() {
        return _value;
      },
      set: function(value) {
        _value = value;
        this.subscribers[state].forEach(subscriber => {
          subscriber.setState({ [state]: this.state[state] })
        })
      }.bind(this)
    });
  }
}

export default Store;
