import * as React from 'react';

export interface IAppProps {
}

export default class Home extends React.Component<IAppProps, any> {
  public render() {
    return (
      <div>
        这是副框架
          {this.props.children}
      </div>
    );
  }
}
