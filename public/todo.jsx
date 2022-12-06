'use strict';

const e = React.createElement;

class NewTodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', body: '' };
    }

    async postData() {
        // TODO: throw error if input is empty
        const response = await fetch('/api/todos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ body: this.state.body, title: this.state.title })
        });
        console.log(await response.json());
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return <div className="card">
            <div className="card-body">

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="eg. Grocery shopping" onChange={(e) => this.setState({ title: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea className="form-control" id="body" rows="3" onChange={(e) => this.setState({ body: e.target.value })}></textarea>
                </div>

                <button onClick={(e) => this.postData()} className="btn btn-primary d-block w-100 mt-3">Save</button>
            </div>
        </div>
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [], liked: false };
    }

    async fetchTodos() {
        // TODO: throw error if input is empty
        const response = await fetch('/api/todos', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        const json = await response.json();
        this.setState({ todos: json })
    }

    async deleteItem(id) {
        // TODO: throw error if input is empty
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        await this.fetchTodos()
    }

    componentDidMount() {
        this.fetchTodos();
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return <div className="">
            <div className="row">
                <div className="col-md-4">
                    <NewTodoItem></NewTodoItem>
                </div>
                <div className="col-md-8">
                    <div className="row row-cols-1 row-cols-md-1 g-4">
                        {this.state.todos.map((item, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.title}
                                        </div>

                                        <div className="card-body">
                                            <p className="card-text">{item.body}</p>

                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                        <div className="card-footer text-muted">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    updated at <br />
                                                    created at
                                                </div>
                                                <div className="col-md-2">
                                                    <button className="btn btn-danger btn-sm float-end" onClick={(e) => this.deleteItem(item.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
        </div>
    }
}

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(e(TodoApp));
