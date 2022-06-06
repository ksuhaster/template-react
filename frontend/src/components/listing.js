import React, { Component } from 'react';


class Listing extends Component {

  constructor(props) {
    super(props)
    this.state = {
        items: []
    }
  }

  updateItems() {
    fetch('http://localhost:8000/api/items/')
      .then(response => response.json())
      .then(items => {
        this.setState({
          items: items
        })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.updateItems();
  }

  deleteItem(id) {
    return () => {
      fetch(`http://localhost:8000/api/items/${id}`, {
        method: 'DELETE'
      })
        .then(this.updateItems())
        .then(this.render())
        .catch(error => console.log(error))
    }
  }

  renderListing() {
    let recordList = []
    this.state.items.map(item => {
      return recordList.push(
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td><input type="button" value="X" onClick={this.deleteItem(item.id)} /></td>
        </tr>)
    })
    return recordList;
  }

  render() {
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
          {this.renderListing()}
        </tbody>
      </table>
    )
  }
}

export default Listing;