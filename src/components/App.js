import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
  state = {
    customers: [],
    loader: false,
    customer: {},
    url: "http://127.0.0.1:8000/api/customers",
  };

  getCustomers = async () => {
    this.setState({ loader: true });
    const customers = await axios.get(this.state.url);
    this.setState({ customers: customers.data, loader: false });
  };

  deleteCustomer = async (id) => {
    this.setState({ loader: true });

    await axios.delete(`${this.state.url}/${id}`).catch((e) => {
      alert(e.response.status === 404 ? "Customer not found" : "");
    });

    this.getCustomers();
  };

  createCustomer = async (data) => {
    this.setState({ loader: true });

    await axios
      .post(this.state.url, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      })
      .catch((e) => {
        alert(e.response.status === 500 ? "Email already exists" : "");
      });

    this.getCustomers();
  };

  editCustomer = async (data) => {
    this.setState({ customer: {} });

    this.setState({ loader: true });

    await axios
      .put(`${this.state.url}/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      })
      .catch((e) => {
        console.log(e.message);
      });

    this.getCustomers();
  };

  componentDidMount() {
    this.getCustomers();
  }

  onDelete = (id) => {
    this.deleteCustomer(id);
  };

  onEdit = (data) => {
    this.setState({ customer: data });
  };

  onFormSubmit = (data) => {
    if (data.isEdit) {
      this.editCustomer(data);
    } else {
      this.createCustomer(data);
    }
  };

  render() {
    return (
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/#" className="header item">
              React JS CRUD with Laravel API
            </a>
          </div>
        </div>

        <div className="ui main container">
          <MyForm
            onFormSubmit={this.onFormSubmit}
            customer={this.state.customer}
          />
          {this.state.loader ? <Loader /> : ""}
          <CustomerList
            customers={this.state.customers}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
          />
        </div>

        {/* Footer */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        
        <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#f1f1f1" }}>
          React JS CRUD with Laravel API - © 2024 JANUDA
        </footer>
      </div>
      
      
    );
  }
}

export default App;
