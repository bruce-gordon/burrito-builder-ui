import React, { Component } from 'react';
import './OrderForm.css';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.checkInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name]})
    this.setState({ error: '' })
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
    this.setState({ error: '' })
  }

  capitalizeName = () => {
    const splitName = this.state.name.toLowerCase().split(' ');
    const custName = splitName.map(word => word.charAt(0).toUpperCase() + word.substring(1))
    return custName.join(' ')
  }

  checkInputs = () => {
    if (this.state.name && this.state.ingredients.length) {
      this.props.takeOrder({
        name: this.capitalizeName(),
        ingredients: this.state.ingredients
      })
      this.clearInputs();
    } else {
      this.setState({ error: 'Please enter your name and select at least one ingredient before you click Submit Order' })
    }
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />
        { ingredientButtons }
        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.error &&
          <div className='error-div'>
            <p className='error' > {this.state.error} </p>
          </div>
        }
        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
