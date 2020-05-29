import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar.component';
import ContactTable from './ContactTable.component';
import { Container } from '@material-ui/core';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Button } from '@material-ui/core';

export default class All extends Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: "",
            contacts : []
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount(){
        axios
          .get("http://localhost:5000/contacts")
          .then(res => {
              this.setState({contacts: res.data})
          })
          .catch(err => console.error(err));
    }

    
    handleFilterTextChange(filterText) {
        this.setState({
          filterText: filterText
        });
      };

    deleteContact(id){
        axios
          .delete("http://localhost:5000/contacts/" + id)
          .then(res => {console.log(res.data)})
          .catch(err => console.error(err));

        this.setState({
            contacts: this.state.contacts.filter(el => el._id !== id)
        })
    }
    render(){
        return(
            <Jumbotron>
            <Container fixed>
            <div>
                
                <SearchBar
                filterText={this.state.filterText}
                onFilterTextChange={this.handleFilterTextChange}
                />
                <h3> 
                    Contacts
                </h3>
                <ContactTable
                   contacts ={this.state.contacts}
                   filterText={this.state.filterText}
                   deleteContact = {this.deleteContact}
                />
                <Button variant="outlined" color="primary">
                <Link to = {"/create"}>create <i className="fa fa-plus-circle" aria-hidden="true"></i></Link>
                </Button>
               
                
            </div>
            </Container>
            </Jumbotron>
        )
    }
}