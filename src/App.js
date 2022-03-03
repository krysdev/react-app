import React, {useState, useEffect} from 'react';
// import stories from './list';


function useSemiPersistentState(key, initialState) {

  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
   
  useEffect(function(){
    localStorage.setItem(key, value)
  },[key, value])
  
  return [value, setValue]
}

function App() {
  const stories = [
    {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walker",
    num_comments: 3,
    points: 4,
    objectID: 0
    },
    {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
    }
  ]

  const [searchTerm, setSearchTerm] =  useSemiPersistentState('search', 'React')
  
  function handleSearch(event){
    setSearchTerm(event.target.value)
  }

  const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Header</h1>
      <InputFieldWIthLabel id="search" label="Search" value={searchTerm} onInputChange={handleSearch}/>
      <hr />
      <List list={searchedStories}/>
    </div>
  );
}

const InputFieldWIthLabel = ({id, label, type='text', value, onInputChange}) => {
  return(
    <>
      <label htmlFor={id}>{label}: </label>&nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange}/>
      <p>TEXT==&gt; <strong>{value}</strong></p>
    </>
  )
};

const List = ({list}) => {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.objectID} item={item}/>
      })}
    </ul>
  );
};

function Item({item}){
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  );
}

export default App;