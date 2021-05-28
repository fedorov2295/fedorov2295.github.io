import React from "react";
import classes from './ActionButtons.module.css'

const ActionButtons = (props) => {

    let buttonType = null;

    switch (props.elementType) {
        case ('delete'):
            buttonType = <button
                className={classes.delete}
                onClick={props.deleteItem}
            >Delete</button>;
            break;
        case ('edit'):
            buttonType =<button
                className={classes.edit}
                onClick={props.editItem}
            >Edit</button>;
            break;
        case ('save'):
            buttonType =<button
                className={classes.save}
                onClick={props.saveItem}
            >Save</button>;
            break;
        case ('add'):
            buttonType =<button
                className={classes.add}
                onClick={props.addItem}
            >Add Item</button>;
            break;
        default:
            <span
                
            >Delete</span>;

    }

    return (
        <React.Fragment>
            {buttonType}
        </React.Fragment>
    )
};

export default ActionButtons;