
import React, {useState, useEffect, useRef, useReducer, useCallback} from 'react'
import axios from 'axios'
// import initialStories from './list'   // default export name: list


function useSemiPersistentState(key, initialState) {

  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState)  //   || replaced by ?? (nullish coalescing operator - p.70)
   
  useEffect(function(){
    localStorage.setItem(key, value)
  }, [key, value])
  
  return [value, setValue]
}

// const getAsyncStories = () =>
//   new Promise(resolve =>
//     setTimeout(
//       () => resolve({ data: { stories_fetched: initialStories } }),
//       300
//     )
// )

/* REJECTION TESTING: */
// const getAsyncStories = () =>
// new Promise((resolve, reject) => setTimeout(reject, 2000));

const storiesReducer = (state, action) => {
  switch (action.type){
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter((story) => action.payload.objectID !== story.objectID)
      }
    default:
      throw new Error()
  }
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const App = ()=> {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')
  const [stories, dispatchStories] = useReducer(storiesReducer, {data: [], isLoading: false, isError: false})  //   const searchedStories = stories.DATA.filter 
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);


  const handleFetchStories = useCallback(async () => {

    dispatchStories({
      type: 'STORIES_FETCH_INIT',
    })

    try {
      const result = await axios.get(url)
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      })
    }
    catch {
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    }
  }, [url])


  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])


  function handleRemoveStory(item) {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    })
  }

  function handleSearchInput(event){
    setSearchTerm(event.target.value)
  }

  // const searchedStories = stories.data.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleSearchSubmit(event) {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault()
  }

  return (
    <div>
      <h1>Header</h1>
      
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />

      <hr />
      {stories.isError && <p>We have an error</p>}
      {stories.isLoading
       ? <>The content is loading...</>
       : <List list={stories.data} onRemoveItem={handleRemoveStory}/>
      }
    </div>
  )
}

const SearchForm = ({searchTerm, onSearchSubmit, onSearchInput}) => (
  <form onSubmit={onSearchSubmit}>
    <InputFieldWIthLabel id="search" value={searchTerm} onInputChange={onSearchInput} isFocused>   {/* isFocused=true */}
      <TEST/>
      SEARCH:
    </InputFieldWIthLabel>
    <button type='submit' disabled={!searchTerm}>
      Submit
    </button>
  </form>
)


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
        <button type='button' onClick={() => onRemoveItemPassed(item)} >     {/*   onClick={handleRemoveItem}   */}
          Dismiss
        </button>
      </span>
    </li>
  );
}

export default App;