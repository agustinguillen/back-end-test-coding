import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { axios } from '../axios';
import { useEffect, useState } from 'react';

const Home = () =>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    }, []);

    const getProducts = async () =>{
        const response = await axios.get("/products").catch((err) => {
            console.error("Error:", err);
        });

        if (response && response.data) {
           setProducts(response.data)
        }
    } 

    return (
      <Container className="text-center mt-3">
        <h1>Home</h1>
        <Row>
          <Col xs lg className="d-flex flex-wrap justify-content-center">
            {products.map((product) => (
              <Card
                key={product.product_id}
                style={{
                  width: "15rem",
                  backgroundColor: "green",
                  margin: "1rem",
                }}
              >
                <Card.Img variant="top" src={product.product_image} style={{height: '15rem'}} />
                <Card.Body>
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>${product.product_price}</Card.Text>
                  <Card.Text><small>Categoría: {product.product_category}</small></Card.Text>
                  <Button variant="success">Comprar</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
}

export default Home;