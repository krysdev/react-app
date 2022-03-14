
import React, {useState, useEffect, useRef} from 'react';
import initialStories from './list';   // default export name: list


function useSemiPersistentState(key, initialState) {

  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
   
  useEffect(function(){
    localStorage.setItem(key, value)
  },[key, value])
  
  return [value, setValue]
}

const App = ()=> {

  const [searchTerm, setSearchTerm] =  useSemiPersistentState('search', 'React')
  const [stories, setStories] = useState(initialStories)

  function handleRemoveStory(item) {
    const newStories = stories.filter((story) => item.objectID !== story.objectID)
    setStories(newStories)
  }

  function handleSearch(event){
    setSearchTerm(event.target.value)
  }

  const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Header</h1>
      <InputFieldWIthLabel id="search" value={searchTerm} onInputChange={handleSearch} isFocused>
        <TEST/>
        SEARCH:
      </InputFieldWIthLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
  );
}

const TEST = () =>'TeXXXXt---'

const InputFieldWIthLabel = ({id, value, type='text', onInputChange, isFocused, children}) => {

  const inputRef = useRef()
  
  useEffect(
    () => {
      if(isFocused && inputRef.current){
        inputRef.current.focus()
      }
    }, [isFocused]
  )

  return(
    <>
      <label htmlFor={id}>{children} </label>
      <input ref = {inputRef} id={id} type={type} value={value} onChange={onInputChange} />
      <p>TEXT==&gt; <strong>{value}</strong></p>
    </>
  )
};


const List = ({list, onRemoveItem}) => {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.objectID} item={item} onRemoveItemPassed={onRemoveItem}/>
      })}
    </ul>
  );
};


const Item = ({item, onRemoveItemPassed}) => {

  // const handleRemoveItem = () =>{
  //   onRemoveItemPassed(item)
  // }

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type='button' onClick={() => onRemoveItemPassed(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
}

export default App;