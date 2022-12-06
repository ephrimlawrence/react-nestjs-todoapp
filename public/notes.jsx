'use strict';

const e = React.createElement;

function NoteItem(props) {
    const [title, setTitle] = React.useState(props.title || '');
    const [body, setBody] = React.useState(props.body || '');
    const [isUpdate, setIsUpdate] = React.useState(props.isUpdate || false);
    const [id, setId] = React.useState(props.id || '');
    const [resetForm, setResetForm] = React.useState(false);

    React.useEffect(() => {
        console.log(title)
        console.log(body)
        if (isUpdate == true) {
            postData()
        }
    }, [title, body]);

    React.useEffect(() => {
        if (resetForm == true) {
            setTitle('')
            setBody('')
            setId('')
            setIsUpdate(false)
            setResetForm(false)
        }
    }, [resetForm]);

    React.useEffect(() => {
        console.log('changed')
        if (id != props.id) {
            setTitle(props.title)
            setBody(props.body)
            setId(props.id)
            setIsUpdate(props.isUpdate);
        }
    }, [props]);

    const postData = async () => {
        if (title.length < 3) {
            alert("Note title must be at least 3 characters")
            return;
        }

        if (body.length < 3) {
            alert("Note body must be at least 3 characters")
            return;
        }

        const url = `/api/notes/${isUpdate ? id : ''}`
        const response = await fetch(url, {
            method: isUpdate ? 'PUT' : 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ body: body, title: title })
        });

        const json = await response.json();
        props.onItemUpdated(json)

        return json;
    }

    const submitButton = () => {
        if (!isUpdate) {
            return <button onClick={(e) => postData().then(resp => setResetForm(true))} className="btn btn-primary d-block w-100 mt-3">Save</button>;
        }
        return <button onClick={(e) => setResetForm(true)} className="btn btn-primary d-block w-100 mt-3">Done</button>;
    }

    return <div className="card">
        <div className="card-body">

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" value={title} id="title" placeholder="eg. Grocery shopping" onChange={(e) => {
                    setTitle(e.target.value)
                }} />
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Body</label>
                <textarea className="form-control" id="body" value={body} rows="3" onChange={(e) => {
                    setBody(e.target.value);

                    if (isUpdate == true) {
                        postData()
                    }
                }}></textarea>
            </div>

            {submitButton()}
        </div>
    </div>
}


class TodoApp extends React.Component {
    dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            isUpdate: false,
            selectedItem: {
                body: '', title: '', id: ''
            }
        };
    }

    async fetchNotes() {
        // TODO: throw error if input is empty
        const response = await fetch('/api/notes', {
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
        this.setState({ notes: json })
    }

    async deleteItem(id) {
        // TODO: throw error if input is empty
        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        await this.fetchNotes()
    }

    componentDidMount() {
        this.fetchNotes();
    }

    render() {
        return <div className="">
            <div className="row">
                <div className="col-md-4">
                    <NoteItem
                        test={this.state.selectedItem}
                        id={this.state.selectedItem.id}
                        body={this.state.selectedItem.body}
                        title={this.state.selectedItem.title}
                        isUpdate={this.state.isUpdate}
                        onItemUpdated={(item) => {
                            if (this.state.isUpdate) {
                                const index = this.state.notes.findIndex(i => i.id == item.id)
                                const temp = this.state.notes;
                                temp[index] = item
                                this.setState({ notes: temp });
                            } else {
                                this.setState({ notes: [...this.state.notes, item] })
                            }
                        }}
                    ></NoteItem>
                </div>

                <div className="col-md-8">
                    <div className="row row-cols-1 row-cols-md-1 g-4">
                        {this.state.notes.map((item, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <div className="card-header">
                                            {index + 1}. {item.title}
                                        </div>

                                        <div className="card-body">
                                            <p className="card-text">{item.body}</p>
                                        </div>
                                        <div className="card-footer text-muted">
                                            <div className="row">
                                                <div className="col-md-10 d-block">
                                                    updated @ {new Date(item.updatedAt).toLocaleDateString("en-US", this.dateFormatOptions)} <br />

                                                    created @ {new Date(item.createdAt).toLocaleDateString("en-US", this.dateFormatOptions)}
                                                </div>
                                                <div className="col-md-2 text-center">
                                                    <button className="btn btn-primary btn-sm me-3" onClick={() => {
                                                        this.setState({ selectedItem: item });
                                                        this.setState({ isUpdate: true });
                                                    }} title="Update todo item">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg>
                                                    </button>

                                                    <button className="btn btn-danger btn-sm" onClick={(e) => this.deleteItem(item.id)} title="Delete todo item">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
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
