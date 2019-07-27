import React, { Component } from 'react';
import './App.scss';

import List from './List';


class App extends Component {
  state = {
    articles: null,
    fetchingError: false
  }

  componentDidMount() {
    fetch('https://www.reddit.com/best.json')
      .then(r => {
        if (r.status === 200) {
          r.json().then(json => this.setState({ articles: json.data.children }))
        } else {
          this.setState({ fetchingError: true })
        }
      }
    )
  }

  render() {
    if (this.state.articles) {
      return (
        <div className="App">
          <List articles={this.state.articles}/>
        </div>
      );
    } else if (this.state.fetchingError) {
      return <div>Something went wrong while fetching the articles.</div>
    } else {
      return <div>Fetching the articles...</div>
    }
  }
}

export default App;
