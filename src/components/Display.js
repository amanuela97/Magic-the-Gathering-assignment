import React,{useEffect} from 'react';

function Display({selected}) {

    useEffect(()=> {
    },[selected]);

    return (
        <div className="display">
            { selected?.chapter &&
                <h1>{selected.chapter}</h1>
            }
            <div>
               {selected?.rules?.map((rule, index) => {
                return <li key={index}>{rule}</li>
               })} 
            </div>
        </div>
    );
}

export default Display;