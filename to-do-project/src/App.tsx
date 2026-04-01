import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';

interface ItoDo{
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
function App() {
  const [items, setItems] = useState<ItoDo[]>([]);
  const [inpValue, setInpValue] = useState('');

  async function getData() {
    const response = await axios.get('https://dummyjson.com/todos');
    setItems(response.data.todos)
  };

  async function createData() {
    const response = await axios.post('https://dummyjson.com/todos/add', {todo: inpValue,
    completed: false,
    userId: 5,});

    setItems([...items, response.data])
    console.log(response);
  };

  async function deleteItem(id: number) {
    const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
    console.log(response);
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    <input onChange={(e) => {
      setInpValue(e.target.value)
    }}></input>
    <button onClick={() => createData()}>Add task</button>
      <ul>
        {items.map((el) => <li>{el.todo} <button onClick={() => {
          deleteItem(el.id)
          setItems(items.filter((item) => item.id !== el.id))
        }}>Delete</button></li>)}
      </ul>
    </>
  )
}

export default App;


