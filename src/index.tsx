import '../polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '_app/App'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)