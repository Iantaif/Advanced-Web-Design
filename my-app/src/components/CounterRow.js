import React from 'react';
const CounterRow = ({key,id}) => {
    //const id = props.id;
    //let {key , id } = id;

    const [count, setCount] = React.useState(0);
    

    const handleClick = () => {
        setCount(count + 1);
    }
    if (id === 4) {
        return <div className='row'>This row is dissable</div>
    } else {

        return (
            
            <div className="row">
                <button id={`countButton${id}`} className="green-button" onClick={handleClick}>
                    Button {id}
                </button>
                <div id={`counter${id}`} className="counter">
                    {count}
                </div>
            </div>
        );

    }

}




export default CounterRow;