import classes from '../Cart/CartItem.module.css';
import Modal from '../UI/Modal';

const Invvice = (props) => {
    console.log(props.name);


    return (
        <div onClose={props.onCancel}>
            {/* <p>he from Invvice</p> */}
            <li className={classes['cart-item']}>
                <div>
                    <h2>{props.name}</h2>
                    <div className={classes.summary}>
                        <span className={classes.price}>{props.price}</span>
                        <span className={classes.amount}>x {props.amount}</span>
                        <div className={classes.actions}>
                            <button type='button' className={classes.submit} onClick={props.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </li>

        </div>
    )

}
export default Invvice;