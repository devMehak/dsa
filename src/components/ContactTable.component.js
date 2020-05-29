import React, {Component, useState} from 'react';
import {Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'
import { Button} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

function ContactRow(props){
    const [open, setOpen] = useState(false);
    return(
        // const contact  = this.props.contact;
        // const name = contact.username;
        // const phone = contact.phone;
        // const email = contact.email;
        // const dob = contact.dob.substring(0, 10);
        // const del = this.props.deleteContact;
            <div>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    className = "collapsible"
                >
                    {props.contact.username}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                    <div className = "context">
                    <span>{props.contact.dob === null ?<span> </span> : props.contact.dob.substring(0,10) }</span>
                    <br/>
                    <div className = "flex-container">
                    <div className = "phones">
                        {props.contact.phone.map(phoneNumber =>
                            <p>
                                {phoneNumber}
                            </p>
                            
                        )}
                    </div>
                    <div className = "email">
                        { props.contact.email === null ? <br/> : props.contact.email.map(email => 
                            <p>
                                {email}
                            </p>
                        )}
                    </div>
                    <div>
                        <Link to = {"/edit/" + props.contact._id}>Edit</Link> | <a href = "#" onClick={() => {props.deleteContact(props.contact._id)}}>delete</a>
                    </div>
                    </div>
                    
                </div>
                    </div>
                </Collapse>
                
            </div>
        
    )
}


 export default class ContactTable extends Component{
     render(){
         const filterText = this.props.filterText;
         const rows = [];
         this.props.contacts.forEach(contact => {
             let done  = false;
             if(contact.username.indexOf(filterText) !== -1){
                 done = true;
             }
             if(!done){
                 contact.phone.forEach(phoneNumber => {
                     if(phoneNumber.indexOf(filterText) !== -1){
                         done = true;
                     }
                 })
             }
             if(!done && contact.email !== null){
                 contact.email.forEach(emailAddress => {
                     if(emailAddress.indexOf(filterText) !== -1){
                         done = true;
                     }
                 })
             }
             if(done){
                 rows.push(
                     <ContactRow contact = {contact} key = {contact.username} deleteContact = {this.props.deleteContact} />
                 );
             }

             console.log(rows);
             
         });
         return(
            <table className = "table">
                <Paper elevation={3} />
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
     }
 }