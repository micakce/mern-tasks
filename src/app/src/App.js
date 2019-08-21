import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tasks: []
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
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
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ title: '', description: '' })
        this.fetchTasks()
        // M.toast({html: 'Task Saved'})
      })
      .catch(err => console.log(err));

    e.preventDefault();
  }

  deleteTask(id) {
    if (window.confirm('Are you sure you want to delete it')) {
      fetch(`/api/tasks/${id}`, {

        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // M.toast({html: 'Task Deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => console.log(data));
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
                          value={this.state.title}
                          type="text"
                          placeholder="Task Title" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea
                            name='description'
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.description}
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
                <div className="col s7">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.tasks.map(task => {
                          return(
                            <tr key={task._id}>
                              <td>{task.title}</td>
                              <td>{task.description}</td>
                              <td>
                                <button className="btn light-blue darken-4"
                                  onClick={() => this.deleteTask(task._id)}>
                                  <i className="material-icons">delete</i>
                                </button>
                                <button className="btn light-blue darken-4"
                                  style={{margin:'4px'}}
                                  onClick={() => this.editTask(task._id)}>
                                  <i className="material-icons">edit</i>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default App;
