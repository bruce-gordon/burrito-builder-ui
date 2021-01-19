import React from 'react';
import App from './App.js'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getOrders, postOrder } from '../../apiCalls';
jest.mock('../../apiCalls');

describe('App', () => {

  beforeEach(() => {
    getOrders.mockResolvedValueOnce({
      orders: [
        {
            id: 1,
            name: "Brian",
            ingredients: [
                "beans",
                "carnitas",
                "queso fresco",
                "jalapeno"
            ]
        },
        {
            id: 2,
            name: "Sammy",
            ingredients: [
                "steak",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
            ]
        },
        {
            name: "Lucinda",
            ingredients: [
                "carnitas",
                "lettuce",
                "pico de gallo",
                "guacamole",
                "sour cream"
            ],
            id: 5
        }
      ]
    })

    postOrder.mockResolvedValueOnce(
      {
          id: 4,
          name: "Leslie",
          ingredients: [
              "beans"
          ]
      }
    )

    render (
      <App />
    )
  })

  it('should render a title and form', () => {
    const title = screen.getByText('Burrito Builder');
    const nameInput = screen.getByPlaceholderText('Name');
    const submit = screen.getByText('Submit Order');
    const beans = screen.getByRole('button', {name: /beans/i})
    expect(nameInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(beans).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })

  it('should render order data from api', () => {
    const cust1 = screen.getByText('Lucinda')
    const cust2 = screen.getByText('Sammy')
    const cust3 = screen.getByText('Brian')
    expect(cust1).toBeInTheDocument()
    expect(cust2).toBeInTheDocument()
    expect(cust3).toBeInTheDocument()
  })
  //
  // it('should render new orders', async () => {
  //   const nameInput = screen.getByPlaceholderText('Name');
  //   const beans = screen.getByRole('button', {name: /beans/i});
  //   const submit = screen.getByText('Submit Order');
  //   userEvent.type(nameInput, 'Leslie');
  //   userEvent.click(beans);
  //   userEvent.click(submit);
  //   const newUser = await screen.getByText('Leslie');
  //   expect(newUser).toBeInTheDocument();
  // })
})
