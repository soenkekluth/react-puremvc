import React, { Component, createElement } from 'react';
import assign from 'object-assign';
import storeShape from './utils/storeShape';

class PMVCComponent extends Component {

  mediator = null;

  static propTypes = {
    Mediator: React.PropTypes.any,
    mediatorName: React.PropTypes.string,
  };

  static contextTypes = {
    store: storeShape,
  };

  constructor(props, context) {
    console.log(props, context);
    super(props, context);
  }


  tryRegisterMediator() {
    if (this.mediator) {
      return;
    }

    const facade = this.context.store || this.props.store;
    if (!facade) {
      console.error('no facade');
      return;
    }

    this.mediator = facade.subscribe(this, this.props.Mediator, this.props.mediatorName);
  }

  sendEvent(name, body, type) {
    if (this.mediator && this.mediator.sendEvent) {
      this.mediator.sendEvent.apply(this.mediator, arguments);
    } else {
      const facade = this.context.store || this.props.store;
      if (facade) {
        facade.sendEvent(name, body, type);
      }
    }
  }


  componentWillMount() {
    this.tryRegisterMediator();
  }

  componentDidMount() {
    this.tryRegisterMediator();
  }


}

export default PMVCComponent;
