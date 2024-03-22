import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../actions/crudActions'; 

function DeleteComponent({ productId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(productId)); 
  };

  return (
    <div className="text-center mt-1">
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteComponent;
