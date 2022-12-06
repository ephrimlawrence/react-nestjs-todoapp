'use strict';

const e = React.createElement;

class NewTodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { title: props.title || '', body: props.body || '', isUpdate: props.isUpdate || false, id: props.id, onItemUpdated: props.onItemUpdated, done: null };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.id == props.id && state.done != null) {
            return { title: state.title || '', body: state.body || '', isUpdate: state.isUpdate || false, id: state.id, onItemUpdated: state.onItemUpdated };

        }
        return { title: props.title || '', body: props.body || '', isUpdate: props.isUpdate || false, id: props.id, onItemUpdated: props.onItemUpdated };
    }

    async postData() {
        // TODO: throw error if input is empty
        console.log(this.state)
        const url = `/api/todos/${this.state.isUpdate ? this.state.id : ''}`
        const response = await fetch(url, {
            method: this.state.isUpdate ? 'PUT' : 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ body: this.state.body, title: this.state.title })
        });

        const json = await response.json();
        this.state.onItemUpdated(json)
    }

    submitButton() {
        if (!this.state.isUpdate) {
            return <button onClick={(e) => this.postData()} className="btn btn-primary d-block w-100 mt-3">Save</button>;
        }
        return <button onClick={(e) => this.setState({ title: '', body: '', isUpdate: false, id: '' })} className="btn btn-primary d-block w-100 mt-3">Done</button>;
    }

    render() {
        return <div className="card">
            <div className="card-body">

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={this.state.title} id="title" placeholder="eg. Grocery shopping" onChange={(e) => {
                        console.log(e.target.value)
                        this.setState({ title: e.target.value })

                        if (this.state.isUpdate == true) {
                            this.postData()
                        }
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea className="form-control" id="body" defaultValue={this.state.body} rows="3" onChange={(e) => {
                        this.setState({ body: e.target.value })

                        if (this.state.isUpdate == true) {
                            this.postData()
                        }
                    }}></textarea>
                </div>

                {this.submitButton()}
            </div>
        </div>
    }
}


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isUpdate: false,
            selectedItem: {
                body: '', title: '', id: ''
            }
        };
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
        return <div className="">
            <div className="row">
                <div className="col-md-4">
                    <NewTodoItem
                        test={this.state.selectedItem}
                        id={this.state.selectedItem.id}
                        body={this.state.selectedItem.body}
                        title={this.state.selectedItem.title}
                        isUpdate={this.state.isUpdate}
                        onItemUpdated={(item) => {
                            console.log("updated", item)
                            if (this.state.isUpdate) {
                                const index = this.state.todos.findIndex(i => i.id == item.id)
                                const temp = this.state.todos;
                                temp[index] = item
                                this.setState({ todos: temp });
                            } else {
                                this.setState({ todos: [...this.state.todos, item] })
                            }
                        }}
                    ></NewTodoItem>
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
                                                    <button className="btn btn-info btn-sm float-end" onClick={() => {
                                                        this.setState({ selectedItem: item });
                                                        this.setState({ isUpdate: true });
                                                    }}>Update</button>

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
