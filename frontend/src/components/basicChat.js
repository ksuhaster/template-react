import {Component} from "react";
import React from "react";


class BasicChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      me: {},
      users: [],
      chat: {},
      messages: [],
    };
  }

  updateUsers() {
    fetch('http://localhost:8000/api/users/')
      .then(response => response.json())
      .then(users => {
        this.setState({users: users})
      })
      .catch(error => console.log(error))
    console.log('updateUsers', this.state.users);
    return true;
  }

  userListing() {
    let recordList = []
    console.log('userListing', this.state.users);
    if (this.state.users.length > 0) {
      this.state.users.map(user => {
        recordList.push(
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>
              {this.state.me.id ?
                <input type="button" value="Chat" onClick={(e) => this.openChat(user.id)}/>
              : ''}
            </td>
          </tr>)
      })
    }
    return (
      <table className="table table-striped table-hover">
        <thead>
        <tr>
          <th>username</th>
          <th>name</th>
          <th>connect</th>
        </tr>
        </thead>
        <tbody>
          {recordList}
        </tbody>
      </table>
    );
  }

  openChat = async (user_id) => {
    console.log('openChat user_id:', user_id);
    console.log('me', this.state.me);
    try {
      let body = JSON.stringify({
        other_id: user_id,
        me_id: this.state.me.id,
      });
      console.log('openChat body', body);
      let res = await fetch("http://localhost:8000/api/chats/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
      });
      console.log('openChat res', res);
      let resJson = await res.json();
      if (res.status === 200) {
        this.setState({
          chat: {
            id: resJson.id,
            user1: resJson.user1,
            user2: resJson.user2,
          },
        });
        console.log('openChat', this.state.chat);
        // TODO this.updateChat();
        // } else {
        // TODO process erorrs
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = JSON.stringify({
        username: this.state.username,
        name: this.state.name,
      });
      let res = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body,
      });
      let resJson = await res.json();
      if (res.status === 200) {
        this.setState({
          me: {
            id: resJson.id,
            username: resJson.username,
            name: resJson.name,
          },
        });
        console.log('handleSubmit me', this.state.me);
        this.updateUsers();
      // } else {
      // TODO if user already exists
      }
    } catch (err) {
      console.log(err);
    }
  };

  registerForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <input type="text" value={this.state.username} className="form-control" id="username"
                 placeholder="username"
                 onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div className="mb-3">
          <input type="text" value={this.state.name} className="form-control" id="name"
                 placeholder="name"
                 onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Submit"/>
        </div>
      </form>
    );
  }

  showMe() {
    return (
      <div style={{border: "lightgreen 5px solid" }}>
        <p>{this.state.me.username}</p>
        <p>{this.state.me.name}</p>
      </div>
    )
  }

  componentDidMount() {
    this.updateUsers();
  }

  render() {

    return <div>

      {this.state.me.name ? this.showMe() : this.registerForm()}
      
      <div>
        {this.userListing()}
      </div>
      
      
    </div>;
  }


}

export default BasicChat;
