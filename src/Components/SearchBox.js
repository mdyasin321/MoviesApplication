import React from 'react';
import classes from  './SearchBox.module.css'

const SearchBox=(props)=>{
    return (
        <div className={classes.searchBox}>
            <input type='text' placeholder='Type to Search' value={props.value} onChange={(event)=>{props.searchValueHandler(event.target.value)}}></input>
        </div>
    )
}

export default SearchBox;