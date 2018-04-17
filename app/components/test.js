import * as React from 'react';

type Props = { /* ... */ };

type State = {
  count: number,
};

class MyComponent extends React.Component<Props, State> {
  state = {
    count: '123',
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }));
    }, 1000);
  }

  render() {
    return <div>Count: {this.state.count}</div>;
  }
}

<MyComponent />;