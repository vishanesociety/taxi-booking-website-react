import React, { useState,Link } from "react";
import { useHistory, useParams} from "react-router-dom";
import Axios from "axios";

const Login = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        id : "",
        password : "",
        type : ""
      }); 

      const {id, password, type} = user;
      const onInputChange = (e) => {
        setUser({...user,[e.target.name]: e.target.value})
      }

      const onSubmit =  async (e) => {
         e.preventDefault();        
         
         if(user.type == "consumer"){
             const nameOut =  await Axios.get("http://localhost:3003/consumers/"+id);
             if(nameOut.data.password == password){
               history.push(`/homePageConsumer/${id}`);
             }else{
               alert("Check phone number and password");
             }
         }
         
         if(user.type == "driver"){
           console.log("under that")
          const nameOut =  await Axios.get("http://localhost:3003/drivers/"+id);
          if(nameOut.data.password == password){
            history.push(`/homePageDriver/${id}`);
          }else{
            alert("Check phone number and password");
          }
         }
      }
  return (
    <>
      <div className="container">
        <div className="row">
            <p className="display-6 mt-3 bg-success p-4"><b> Login Page </b></p>
            <div className="col-md-6 mt-5 m-auto">
            <form >
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                 <b> Phone</b>
                </label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputEmail3" placeholder="Enter your phone snumber " name = "id" value={id} onChange={e=> onInputChange(e)}/>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">
                  <b> Password </b>
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword3"
                    placeholder="Enter password"
                    name = "password"
                    value={ password } 
                    onChange={e=> onInputChange(e)}
                  />
                </div>
              </div>
              <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0 "><b> type </b></legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      name = "type"
                      value= "consumer"
                      onChange={e=> onInputChange(e)}
                    />
                    <label class="form-check-label ml-1" for="gridRadios1">
                     <b> Consumer </b>  
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      name = "type"
                      value= "driver"
                      onChange={e=> onInputChange(e)}
                    />
                    <label class="form-check-label" for="gridRadios2">
                     <b> Driver </b>
                    </label>
                  </div>
                  
                </div>
              </fieldset>
              
              <button type="submit" class="btn btn-warning  w-100 mt-3" onClick={e => onSubmit(e)}>
                Sign in
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
