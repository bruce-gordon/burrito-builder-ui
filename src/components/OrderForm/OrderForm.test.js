import React from 'react';
import OrderForm from './OrderForm.js'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('OrderForm', () => {
  const mockTakeOrder = jest.fn();

  beforeEach(() => {
    render (
      <OrderForm
        takeOrder={ mockTakeOrder }
      />
    )
  })

  it('should render the inputs and buttons', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    const submit = screen.getByText('Submit Order');
    const beans = screen.getByText('beans')
    expect(nameInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(beans).toBeInTheDocument();
  })

  it('should update input value with user data', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    userEvent.type(nameInput, 'Jill');
    expect(nameInput.value).toEqual('Jill');
  })

  it('should not place an order without a name and ingredient', () => {
    const submit = screen.getByText('Submit Order');
    userEvent.click(submit);
    expect(mockTakeOrder).toHaveBeenCalledTimes(0);
    const error = screen.getByText('Please enter your name and select at least one ingredient before you click Submit Order');
    expect(error).toBeInTheDocument();
  })

  it('should place an order with the correct argument after the user enters a name and ingredient', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    const beans = screen.getByText('beans');
    const submit = screen.getByText('Submit Order');
    userEvent.click(beans);
    userEvent.type(nameInput, 'Hungry Boy');
    userEvent.click(submit);
    expect(mockTakeOrder).toHaveBeenCalledTimes(1);
    expect(mockTakeOrder).toHaveBeenCalledWith({ name: 'Hungry Boy', ingredients: ['beans']});
  })
})
