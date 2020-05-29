import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Container } from '@material-ui/core';
import Phones from './Phones.component';
import Emails from './Emails.component';

export default class Create extends Component{
    constructor(props){
        super(props);

        this.onSubmit  = this.onSubmit.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.state = {
            username : '',
            date : new Date(),
            phones: [{ index : Math.random()}],
            emails: [{ index : Math.random()}]
        }
       
    }
    
    addNewRowPhone = (e) => {
        this.setState((prevState) => ({
            phones: [...prevState.phones, { index: Math.random()}]
        }));
    }

    clickOnDeletePhone(record) {
        this.setState({
            phones: this.state.phones.filter(r => r !== record)
        });
    }
    
    onChangeDate(date){
        this.setState({
            date : date
        })
    }
    addNewRowEmail = (e) => {
        this.setState((prevState) => ({
            emails: [...prevState.emails, { index: Math.random()}]
        }));
    }

    clickOnDeleteEmail(record) {
        this.setState({
            emails: this.state.emails.filter(r => r !== record)
        });
    }

    onSubmit(e){
        e.preventDefault();
        const phoneArr = [];
        const emailArr = [];
        for(let i = 0; i<e.target.length; i++){
            if(e.target[i].name === "phone"){
                phoneArr.push(e.target[i].value);
            }
            if(e.target[i].name === "email"){
                emailArr.push(e.target[i].value);
            }
        }
        
        const contact = {
            username : this.state.username,
            phone : phoneArr,
            email : emailArr,
            dob : this.state.date
        }

        axios
          .post("http://localhost:5000/contacts/add", contact)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));

        alert("contact added");
        window.location = '/';
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
    }
    addPhone = (e) =>{
        this.setState((prevState) => ({
            phones :[...prevState.phones, <br/>]
        }));
    }
    addEmail = (e) =>{
        this.setState((prevState) => ({
            emails :[...prevState.emails, <br/>]
        }));
    }
    render(){
        let {phones} = this.state;
        let {emails} = this.state;
        return(
            <Container maxWidth="sm">
             <form onSubmit = {this.onSubmit}>
                 <div className = "form-group">
                     <table className="table">
                       <thead>
                            <tr>
                                <th className="required" >Username :</th>
                            </tr>
                        </thead>
                        <tbody>
                        <input type = "text" name = "username" required className = "form-control"
                                value =  {this.state.username}
                                onChange={this.onChangeUserName}
                        />
                        </tbody>
                     
                     </table>
                 </div>
                <div className = "form-group">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="required" >Phone Numbers :</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Phones add={this.addNewRowPhone} delete={this.clickOnDeletePhone.bind(this)} phones={phones} />
                        </tbody>
                        <tfoot>
                            <tr><td colSpan="4">
                                <button onClick={this.addNewRowPhone} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                            </td></tr>
                        </tfoot>
                    </table>
                    
               </div>
               <div className = "form-group">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="required" >Emails :</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Emails add={this.addNewRowEmail} delete={this.clickOnDeleteEmail.bind(this)} emails={emails} />
                        </tbody>
                        <tfoot>
                            <tr><td colSpan="4">
                                <button onClick={this.addNewRowEmail} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                            </td></tr>
                        </tfoot>
                    </table>
               </div>
               <div className = "form-group">
                   <label>
                       Date:
                       <div>
                           <DatePicker
                             selected = {this.state.date}
                             onChange = {this.onChangeDate} 
                              />
                       </div>
                   </label>
               </div>
               <div className = "form-group">
                   <input type = "submit" value = "Submit" className= "btn btn-primary"/>
               </div>
             </form>
             </Container>
        )
    }
}