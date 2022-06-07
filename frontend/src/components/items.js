import {Component} from "react";
import React from "react";


class Items extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      message: "",
      items: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let body = JSON.stringify({
          title: this.state.title,
          description: this.state.description,
        });
        let res = await fetch("http://localhost:8000/api/items/", {
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
            title: "",
            description: "",
            message: "Item added successfully",
          });
          this.updateItems();
          this.render();
        } else {
          this.setState({
            message: "Item added successfully",
          });
        }
      } catch (err) {
        console.log(err);
      }
  };

  updateItems() {
    fetch('http://localhost:8000/api/items/')
      .then(response => response.json())
      .then(items => {
        this.setState({items: items})
      })
      .catch(error => console.log(error))
    return true;
  }

  deleteItem(id) {
    return () => {
      fetch(`http://localhost:8000/api/items/${id}`, {
        method: 'DELETE'
      })
      .catch(error => console.log(error))
      this.updateItems();
      this.render()
    }
  }

  componentDidMount() {
    this.updateItems();
  }

  renderRecords() {
    let recordList = []
    if (this.state.items.length > 0) {
      this.state.items.map(item => {
        recordList.push(
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td><input type="button" value="X" onClick={this.deleteItem(item.id)}/></td>
          </tr>)
      })
    }
    return recordList;
  }

  renderListing() {
    return (
      <table className={'table table-striped table-hover'}>
        <thead>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>delete</th>
        </tr>
        </thead>
        <tbody>
        {this.renderRecords()}
        </tbody>
      </table>
    )
  }

  render() {
    return <>
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={this.state.title} className="form-control" id="title"
                 onChange={(e) => this.setState({title: e.target.value})}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description"
                    onChange={(e) => this.setState({description: e.target.value})}
                    rows="3" value={this.state.description}></textarea>
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Submit"/>
        </div>

        {this.state.message ? <div className="alert alert-info my-3">{this.state.message}</div> : null}
      </form>

      {this.renderListing()}
    </>;
  }
}

export default Items;