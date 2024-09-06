import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../reducers/itemsSlice';
import { fetchPosts } from '../reducers/postsSlice';

const ItemList: React.FC = () => {
  const { items } = useSelector((state) => state.items);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch list of items from the backend API
    console.log('..FETCH ITEMS..');
    dispatch(fetchItems());
    console.log('..FETCH POSTS..');
    dispatch(fetchPosts());
  }, [dispatch]);

  console.log(items);
  console.log(posts);

  const handleEdit = (id: number) => {
    // Implement your edit functionality here
    console.log(`Edit item with ID ${id}`);
  };

  const handleDelete = (id: number) => {
    // Dispatch the delete item action
    dispatch(deleteItem(id));
  };

  return (
    <div className='Items'>
      <p>LIST OF ITEMS FROM BACKEND</p>
      <ul>
        {Array.isArray(items) &&
          items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description}
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ItemList;
