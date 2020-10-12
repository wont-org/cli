import React from 'react'
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

export default Button