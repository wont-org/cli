import React from 'react'
import ReactDom from 'react-dom'
import style from './index.less'

interface ButtonProps {
    label: string
}

const Tips: React.FC<ButtonProps> = ({ label }) => {
    return (
        <p>{ label }</p>
    ) 
}

ReactDom.render(
    <div className={style.container}>
        <Tips label="this is a mpa project, means that one pages/**/index.tsx gets one html."/>
    </div>,
    document.getElementById('root')
)