import React from "react"
import {StaticQuery,graphql} from 'gatsby';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

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
  const {id,currency,price,name,image}=this.props;
  const display_price = new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(price);

  return(
    <form onSubmit={this.handleSubmit(id)}>

      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{display_price}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button type="submit" variant="primary">Buy it!</Button>
        </Card.Body>
      </Card>

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
              image
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        {data.allStripeSku.edges.map(({ node: sku }) => (
          <Product
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}
            image={sku.image}
          />
        ))}
      </div>
    )}
  />
)

