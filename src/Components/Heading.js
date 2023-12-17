import React from 'react';
import classes from './Heading.module.css'


const Heading=(props)=>{

    return (
        <div className={classes.heading}>
            <h2>{props.heading}</h2> 
        </div>
    )
}

export default Heading;