import {Component} from "react";
import "../styles/usercard.css";

const UserCard = (props) => {

    return (
        <div className='usercard'>
            <h3>{props.user}</h3>
            <p>
                {props.username}
            </p>
            <p>
                {props.email}
            </p>
            <p>
                {props.phone}
            </p>
            
            <div className='buttons'>
                <button className='update-btn'>
                    Update
                </button>
                <button className='delete-btn'>
                    Delete
                </button>
            </div>

            
        </div>

    )

}

export default UserCard;