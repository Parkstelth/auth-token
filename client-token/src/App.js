import React, { Component } from "react";

import Login from "./components/Login";
import Mypage from "./components/Mypage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
  }

  
  loginHandler(data) {
    this.setState({
      isLogin: true,
      accessToken: data
    });
  }

  issueAccessToken(token) {
    this.setState({
      accessToken: token
    });
  }

  render() {
    const { isLogin,accessToken } = this.state;
    return (
      <div className='App'>
        {
         isLogin ? <Mypage accessToken={accessToken} issueAccessToken={this.issueAccessToken}></Mypage> : <Login loginHandler={this.loginHandler}></Login>
        }
        
       
      </div>
    );
  }
}

export default App;
