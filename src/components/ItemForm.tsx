import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../reducers/itemsSlice';

const ItemForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    // 
    e.preventDefault();
    // Dispatch the add item action
    await dispatch(addItem({ id: 0, name, description }));
    // Clear the form after adding an item
    setName('');
    setDescription('');
  };

  return (
    <div className='Form'>
      <div>Add New Item</div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
