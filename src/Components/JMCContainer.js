import React, {Component} from 'react';

class JMCContainer extends Component {
  render() {
    return (
        <section {...this.props} className="slider_section">
          <div className="banner_main">
            {/*<img src="images/bg_main.jpg" alt="#"/>*/}
            <div className="container">
              <div className="row justify-content-center">
                {/*<div className={this.props.size ? this.props.size : "col-md-12"}>
                   {this.props.children}
                </div>*/}
                {this.props.children}
              </div>
            </div>
          </div>
        </section>
    );
  }
}

export default JMCContainer;