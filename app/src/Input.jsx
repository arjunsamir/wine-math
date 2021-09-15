import React, { useState, useEffect } from 'react';
import './input.css';


const Input = ({type, label, value, unit}) => {

    const [inputValue, setInputValue] = useState(value.current);
    
    useEffect(() => value.current = inputValue, [inputValue, value]);

    return (
        <div className="input">
            <label>{label}</label>
            <input type={type || "number"} value={inputValue} onChange={e => setInputValue(e.target.value)} onClick={e => e.target.select()}/>
            <span>{unit}</span>
        </div>
    )

}

export default Input;