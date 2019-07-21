import React from 'react';
import { InputGroup, Input} from 'reactstrap';

const SearchMenu = (props) => {

    return (
        <div >
            <InputGroup>
                <Input value={props.inputValue} onChange={props.onInputChange} placeholder="ex: hound, pug, retriever" />
            </InputGroup>
        </div>
    )
}


export default SearchMenu; 