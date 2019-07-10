import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('http://192.168.0.15:3000/api/tasks')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  addTask(e) {
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div >
        {/* {NAVIGATION} */}
        <nav className="light-blue darken-4" >
          <div className="container">
            <a className="brand-logo" href="/">MERN Stack</a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={(e) => this.addTask(e)} >
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name='title'
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder="Task Title" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea
                            name='description'
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Task Description"
                            className="materialize-textarea"></textarea>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn light-blue darken-4">
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default App;
