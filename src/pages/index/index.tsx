import React from 'react'
import ReactDom from 'react-dom'
import './index.less'

interface ButtonProps {
    label: string
}

const Button: React.FC<ButtonProps> = ({ label }) => {
    return (
        <button>
            { label }
        </button>
    ) 
}

ReactDom.render(
    <div className="container">
        <Button label="hot render"/>
    </div>,
    document.getElementById('root')
)