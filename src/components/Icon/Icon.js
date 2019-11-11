import React from 'react';

const icon = (props) => {
    return(
        <img style={props.propStyle} src={`https://developer.accuweather.com/sites/default/files/${props.idIcon < 10 ? ('0'+ props.idIcon): props.idIcon}-s.png`} alt="Icon Weather"/>
    )
}

export default icon;