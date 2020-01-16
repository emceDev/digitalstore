import React from "react"
import {StaticQuery,graphql} from 'gatsby';
import Layout from '../components/layout'
class Product extends React.Component{

componentDidMount(){
  this.stripe = window.Stripe('pk_test_mub8sxpoqgONQmgynNjwH8h300dQ8VD5zv');
  
}
handleSubmit(sku){
  return event =>{
    event.preventDefault();

    this.stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your SKU
        {sku, quantity: 1}
      ],
      successUrl: 'http://localhost:8000/succes/',
      cancelUrl: 'http://localhost:8000/cancel/',
    }).then(function (result) {
      if (result.error){
        console.error(result.error.message)
      }
    });
  }
}
render(){
  const {id,currency,price,name}=this.props;

  const display_price = new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(price);

  return(
    <form onSubmit={this.handleSubmit(id)}>
      <h2>{name}</h2>
      <h3>{display_price}</h3><h3>{currency}</h3>
      <button type="submit">Buy</button>
    </form>
  )
}
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        allStripeSku {
          edges {
            node {
              id
              currency
              price
              attributes {
                name
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        {data.allStripeSku.edges.map(({ node: sku }) => (
          <Product
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}
          />
        ))}
      </Layout>
    )}
  />
)

