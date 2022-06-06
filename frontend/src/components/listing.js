import React, { Component } from 'react';


class Listing extends Component {

  constructor(props) {
    super(props)
    this.state = {
        items: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/items/')
      .then(response => response.json())
      .then(items => {
        this.setState({
          items: items
        })
      })
      .catch(error => console.log(error))
  }

  renderListing() {
    let recordList = []
    this.state.items.map(item => {
      return recordList.push(
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.description}</td>
        </tr>)
    })
    return recordList;
  }

  render() {
    return (
      <table className={'table table-striped table-hover'}>
        <thead>
        <tr>
          <th>asd</th>
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