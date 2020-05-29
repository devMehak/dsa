import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


export default class Create extends Component{
    constructor(props){
        super(props);

        this.onSubmit  = this.onSubmit.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.state = {
            username : '',
            date : new Date(),
            phones: [],
            emails: []
        }
       
    }
    
    componentDidMount(){
        const val = (<input type = "text" name = "phone" 
                         required
                         className = "form-control"
                     />);
        let p = this.state.phones;
        p.push(val);
        this.setState({phones: p});      
        console.log(this.state.phones);
    }
    
    onChangeDate(date){
        this.setState({
            date : date
        })
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
        let phones = this.state.phones;
        let emails = this.state.emails;
        return(
            <Container maxWidth="sm">
             <form onSubmit = {this.onSubmit}>
                 <div className = "form-group">
                     <label>Username :
                     <input type = "text" name = "username" required className = "form-control"
                      value =  {this.state.username}
                      onChange={this.onChangeUserName}
                     /></label>
                 </div>
                <div className = "form-group">
                    <label>Phone: 
                    
                    {
                        phones.map((val, idx) => {
                            let tagId = 'p-${idx}'
                            return(
                                <div key = {idx}>
                                    <input
                                       type  = "text"
                                       name = "phone"
                                       id = {tagId}
                                       className = "form-control"
                                       required
                                     />
                                </div>
                            )
                        })
                    }
                    <Button size="small" variant="outlined" color="secondary" value = "addPhone" onClick = {this.addPhone} >
                     addPhone
                    </Button>
                    
                    </label>
               </div>
               <div className = "form-group">
                    <label>Email: 
                    {
                        emails.map((val, idx) => {
                            let tagId = 'p-${idx}'
                            return(
                                <div key = {idx}>
                                    <input
                                       type  = "text"
                                       name = "email"
                                       id = {tagId}
                                       className = "form-control"
                                       required
                                     />
                                </div>
                            )
                        })
                    }
                    <Button size="small" variant="outlined" color="secondary" value = "addEmail" onClick = {this.addEmail} >
                     addEmail
                    </Button>
                    </label>
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