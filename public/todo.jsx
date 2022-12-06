'use strict';

const e = React.createElement;

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
