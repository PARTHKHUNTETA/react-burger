import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button';
import clases from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Parth khunteta',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '502001',
                    country: 'India'
                },
                email: 'testsever@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (<form>
            <input className={clases.Input} type="text" name="name" placeholder="Your Name" />
            <input className={clases.Input} type="email" name="email" placeholder="Your Mail" />
            <input className={clases.Input} type="text" name="street" placeholder="Street" />
            <input className={clases.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
        </form>);
        if (this.state.loading === true) {
            form = <Spinner />
        }
        return (
            <div className={clases.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;