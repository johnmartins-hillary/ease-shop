import React from 'react'
import { FaSpinner } from "react-icons/fa"

function LoadingBox() {
    return (
        <div className='loading'>
            <FaSpinner />Loading...
        </div>
    )
}

export default LoadingBox
