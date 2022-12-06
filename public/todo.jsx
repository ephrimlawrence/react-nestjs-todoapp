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

    //   postData('https://example.com/answer', { answer: 42 })
    //     .then((data) => {
    //       console.log(data); // JSON data parsed by `data.json()` call
    //     });

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

                <button onClick={(e) => this.postData()} className="btn btn-primary">Save</button>
            </div>
        </div>
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return <div className="d-flex justify-content-center">
            <NewTodoItem></NewTodoItem>

            <div className="row row-cols-1 row-cols-md-1 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            Title here
                        </div>

                        <div className="card-body">
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        <div className="card-footer text-muted">
                            <div className="row">
                                <div className="col-md-10">
                                    updated at <br />
                                    created at
                                </div>
                                <div className="col-md-2">
                                    <button>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // return <button className="btn btn-primary">Working</button>
        // return e(
        //     'button',
        //     { onClick: () => this.setState({ liked: true }) },
        //     'Like',
        // );
    }
}

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
root.render(e(TodoApp));
