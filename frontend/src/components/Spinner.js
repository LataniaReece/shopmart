import React from 'react'
import spinnerLogo from '../assets/spinner.gif'

const Spinner = () => (
    <>
        <img src={spinnerLogo}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="Loading..."
        />
    </>
)

export default Spinner
