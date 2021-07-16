import React,{useState} from 'react';
import { AiOutlineSearch} from 'react-icons/ai/';

function Search({onSearch}) {
    const [title, setTitle] = useState("");

    const onSearchChange = (event) => {
        setTitle(event.target.value);
    }

    const onSumbit = event => {
        event.preventDefault();
        if(title === "") return
        onSearch(title);
        setTitle("");
    };

    return (
        <div className="search" >
           <form onSubmit={onSumbit}> 
            <input 
                autoFocus={true}
                type="text" 
                value={title}
                onChange={onSearchChange}
                placeholder="Search..." 
            /> 
            <button type="submit" className="searchButton"><AiOutlineSearch size="1.5em"/></button>
           </form>     
        </div>
    );
}

export default Search;