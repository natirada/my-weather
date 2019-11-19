import React from 'react';
import Spinner from 'react-bootstrap/Spinner'


const spinner = () => {
    const style = {
        height: '10rem',
        width: '10rem'
    }
    return  (
                <Spinner style={style} animation="border" variant="primary" />
        )
};

export default spinner;