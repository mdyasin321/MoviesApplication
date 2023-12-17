import React, { useRef, useState } from 'react';
import classes from './Login.module.css'

const Login=(props)=>{

                              //using normal handlers to store enterd values
    // const [enteredValues,setEnteredValues]= useState({
    //     email:'',
    //     password:""
    // })

    // const submitHandler=(event)=>{

    //     event.preventDefault();
    // }

    // const fieldEventHandlers=(identifier,event)=>{
    //     setEnteredValues((prevState)=>{
    //         return {
    //             ...prevState,
    //             [identifier]:event.target.value
    //         }
    //     })

    // }

    // console.log("email "+enteredValues.email);
    // console.log("password "+enteredValues.password);


    // return (
    //     <div>
    //     <form onSubmit={submitHandler}>
    //         <div className={classes.fields}>
    //             <div >
    //                 <label htmlFor='email'>Email</label>
    //                 <input type='text' id='email'  onChange={(event)=>{fieldEventHandlers("email",event)}}/>
    //             </div>
    //             <div>
    //                 <label htmlFor='password'>Password</label>
    //                 <input type='text' id='password'  onChange={(event)=>{fieldEventHandlers("password",event)}}/>
    //             </div>
    //             <div>
    //                 <button >Reset</button>
    //                 <button >Login</button>
    //             </div>
    //         </div>
    //     </form>
    //     <div>email = {enteredValues.email}</div>
    //     <div>password = {enteredValues.password}</div>
    //     </div>
    // )



                                    //OR




    // By using refs



  const email=useRef();
  const password=useRef();
     
    const submitHandler=(event)=>{

        event.preventDefault();

        props.updatingEnterdFields(email.current.value,password.current.value)
    }

    
   


    return (
        <div className={classes.container}>
            <div className={classes.background}></div>
         <form onSubmit={submitHandler} className={classes.form}>
         <h2 style={{  color: "white", textAlign: "center", fontWeight: "bold"}}>Login</h2>
            <div className={classes.fields}>
               
                <div className={classes.field}>
                    <label  className={classes.label} htmlFor='email'>Email</label>
                    <input className={classes.input} type='email' id='email' ref={email} required   />
                    
                </div>
                <div  className={classes.field}>
                    <label  className={classes.label} htmlFor='password'>Password</label>
                    <input className={classes.input}  type='password' id='password'  ref={password} required minLength={6} />
                </div>
                <div  className={classes.buttons} >
                    <button type='reset'  className={classes.button}>Reset</button>
                    <button className={classes.button}>Login</button>
                </div>
            </div>
        </form>
        </div>
    )

}

export default Login;