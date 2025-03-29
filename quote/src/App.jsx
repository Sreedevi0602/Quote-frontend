import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        details: [],
        user: "",
        quote: "",
    };

    componentDidMount() {
        this.fetchQuotes();
    }

    fetchQuotes = () => {
        axios
            .get("http://127.0.0.1:8000/api/quotes/")  // Updated API route
            .then((res) => {
                this.setState({ details: res.data });
            })
            .catch((err) => console.error("Error fetching data:", err));
    };
    

    renderSwitch = (param) => {
        const colors = ["primary", "secondary", "success", "danger", "warning", "info"];
        return colors[param % colors.length] || "yellow";
    };

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/wel/", {
                name: this.state.user,
                detail: this.state.quote,
            })
            .then(() => {
                this.setState({ user: "", quote: "" });
                this.fetchQuotes(); // Refresh quotes after adding a new one
            })
            .catch((err) => console.error("Error submitting quote:", err));
    };

    render() {
        return (
            <div className="container jumbotron">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"> Author </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name of the Poet/Author"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={this.state.user}
                            name="user"
                            onChange={this.handleInput}
                            required
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> Your Quote </span>
                        </div>
                        <textarea
                            className="form-control"
                            aria-label="With textarea"
                            placeholder="Tell us what you think of ....."
                            value={this.state.quote}
                            name="quote"
                            onChange={this.handleInput}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mb-5">Submit</button>
                </form>

                <hr style={{ color: "#000000", backgroundColor: "#000000", height: 0.5 }} />

                {this.state.details.length > 0 ? (
                    this.state.details.map((detail, id) => (
                        <div key={id} className="card shadow-lg mb-3">
                            <div className={`bg-${this.renderSwitch(id)} card-header`}>Quote {id + 1}</div>
                            <div className="card-body">
                                <blockquote className={`text-${this.renderSwitch(id)} blockquote mb-0`}>
                                    <h1>{detail.detail}</h1>
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">{detail.name}</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No quotes available.</p>
                )}
            </div>
        );
    }
}

export default App;
