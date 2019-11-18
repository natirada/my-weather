import React  from 'react';
import classes from './Like.css'

const like = (props) => {
    let className = [classes.Like, props.isLike ? classes.Liked: "" ];

    const onClickLike = () =>  {
        props.clickLike(!props.isLike);
    }
        return(
            <link onClick={onClickLike} className={className.join(" ")}></link>
        )
}


export default like;