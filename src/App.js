
import React, {useState, useEffect, useRef, useReducer} from 'react';
import initialStories from './list';   // default export name: list


function useSemiPersistentState(key, initialState) {

  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
   
  useEffect(function(){
    localStorage.setItem(key, value)
  }, [key, value])
  
  return [value, setValue]
}

const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { storiesdata: initialStories } }),
      300
    )
)

const storiesReducer = (state, action) => { 
  console.log(action);
  switch (action.type){
    case 'SET_STORIES':
      return action.payload
    case 'REMOVE_STORIES':
      return state.filter((story) => action.payload.objectID !== story.objectID)
    default:
      throw new Error()
  }
}


const App = ()=> {

  const [searchTerm, setSearchTerm] =  useSemiPersistentState('search', 'React')
//const [stories, setStories] = useState([]) //OLD
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  
  const [stories, dispatchStories] = useReducer(storiesReducer, [])
/* [CURRENT_STATE, STATE_UPDATER_FUNC] = useReducer(REDUCER_FUNCTION, INTIAL_STATE)  --> the state_updater_function is the dispatch_function */


  useEffect(() => {
    setIsLoading(true)

    getAsyncStories()
    .then(result => {
    //setStories(result.data.stories) //OLD
      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.storiesdata
      })
      setIsLoading(false)
    })
    .catch(() => setIsError(true))
  
  }, [])
  

  function handleRemoveStory(item) {
  //const newStories = stories.filter((story) => item.objectID !== story.objectID)
  //setStories(newStories) //OLD
    dispatchStories({
      type: 'REMOVE_STORIES',
      payload: item
  //  payload: newStories
    })
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
      {isError && <p>We have an error</p>}
      {isLoading
       ? <><TEST/><p>The content is loading...</p></>
       : <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
      }
    </div>
  );
}

const TEST = () =>'TeSSt---'

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
        <button type='button' onClick={() => onRemoveItemPassed(item)}>     {/*   onClick={handleRemoveItem}   */}
          Dismiss
        </button>
      </span>
    </li>
  );
}

export default App;