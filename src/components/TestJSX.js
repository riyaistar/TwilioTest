import React from 'react'

export const TestJSX = () => {
    // return (
    //     <div>This is a test JSX</div>
    // )
    return React.createElement(
        'div',
        {
            id: 'parent',
            className: 'parent_styling'
        },
        React.createElement('h1',
            null,
            'This is a test JSX'));
}

