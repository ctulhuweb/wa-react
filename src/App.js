import React from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Link,
  useParams
} from 'react-router-dom';
import ParseItems from './ParseItems';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parseItems: []
    };
    this.getParseItems();
  }

  getParseItems = () => {
    fetch('http://localhost:3000/api/v1/parse_items', {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data.slice(0, 10));
      this.setState({
        parseItems: data.data.slice(0, 10),
      });
    })
    .catch((er => {
      console.log('error');
    }))
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/aggregators">Aggregators</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </nav>
        
          <Switch>
            <Route path="/about">
              <Home />
            </Route>
            <Route path="/aggregators">
              <Aggregators />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/">
              <div className="App">
                <div className="container h-100">
                  <ParseItems parseItems={this.state.parseItems} />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
      
      /*
      <div className="App">
        <div className="container h-100">
          <ParseItems parseItems={this.state.parseItems} />
        </div>
      </div>
      */
    );
  }
}


function Home() {
  return <h2>Home</h2>
}

function Aggregators() {
  return <h2>Aggregators</h2>
} 

function Topics() {
  let match = useRouteMatch();
  console.log(match);
  return (
    <div>
      <h2>
        Topics
      </h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
