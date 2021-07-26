import React, {useState } from "react";
import Axios from "axios";
import { useHistory, useParams} from "react-router-dom"; 


const Register = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    nameUser : "",
    id : "",
    email : "",
    password : "",
    type : ""
  }); 
  const { nameUser, id, email, password, type} = user;
  const onInputChange = (e) => {
    setUser({...user,[e.target.name]: e.target.value})
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    if(user.type == "consumer"){
     try {
      await Axios.post("http://localhost:3003/consumers",user);
      history.push("/HomePageConsumer/"+id);
     } catch(err){
       console.log(err);
     }
    }
    if(user.type == "driver"){
      try{
        await Axios.post("http://localhost:3003/drivers",user);
        history.push("/HomePageDriver/"+id);
      }catch(err){
        console.log(err);
      } 
    }
    
  };
  return (
    <>
      <div className="container ">
        <div className="row">
        <p className="display-6 mt-3 mb-5 bg-success p-4"><b> Registration Page </b></p>
          <div className="col-md-6 mt-2 m-auto">
            <form onSubmit={ e => onSubmit(e)}>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                 <b> Name </b>
                </label>
                <div class="col-sm-10">
                  <input type="text" class="form-control"  name="nameUser" placeholder="Enter your name" value={nameUser} onChange={e=> onInputChange(e)}/>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                 <b> Phone </b>
                </label>
                <div class="col-sm-10">
                  <input type="text" class="form-control"  name = "id" value={id} placeholder="Enter your phone number" onChange={e=> onInputChange(e)}/>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                 <b> Email </b>
                </label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail3" name="email" value={email} placeholder="Enter your email" onChange={e=> onInputChange(e)}/>
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
                    name="password"
                    placeholder="Enter your password"
                    value= {password}
                    onChange={e=> onInputChange(e)}
                  />
                </div>
              </div>
              <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0"><b> Type </b></legend>
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
                    <label class="form-check-label" for="gridRadios1">
                     <b> Consumer </b>
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      name="type"
                      value="driver"
                      onChange={e=> onInputChange(e)}
                    />
                    <label class="form-check-label" for="gridRadios2">
                      <b> Driver </b>
                    </label>
                  </div>
                </div>
              </fieldset>

              <button type="submit" class="btn btn-warning w-100 btn-block mt-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
