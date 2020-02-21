import React from 'react'

// function FirstComponent() {
//     return <h1>This is the first component</h1>
// }

export const FirstComponent = props => {

    console.log(props)
    return <h1>This is the first component {props.name} on {props.id}</h1>
}


// export default FirstComponent;
