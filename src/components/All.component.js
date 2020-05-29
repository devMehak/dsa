import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar.component';
import ContactTable from './ContactTable.component';


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
                <button>
                <Link to = {"/create"}>create</Link>
                </button>
               
                
            </div>
        )
    }
}