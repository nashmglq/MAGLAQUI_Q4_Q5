import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { patchProduct } from "../actions/patchActions";
import { Form, Button } from "react-bootstrap";

function ProductEditForm({ productId, product }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
  });

  const { name, price, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(productId)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patchProduct(productId, formData));
    window.location.reload(); 
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default ProductEditForm;
