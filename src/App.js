import React, {useState} from 'react';
// import stories from './list';

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

const [searchTerm, setSearchTerm] = useState('');

const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

function HandleSearch(event){
  setSearchTerm(event.target.value)  
}

return (
  <div>
      <h1>Header</h1>
      <Search onSearch={HandleSearch} searchTerm={searchTerm}/>
      <hr />
      <List list={searchedStories}/>
    </div>
  );
}

const Search = ({onSearch, searchTerm}) => {
return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={searchTerm} onChange={onSearch}/>
      <p>TEXT: <strong>{searchTerm}</strong></p>
    </div>
  )
};

const List = ({list}) => {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.objectID} passedItem={item}/>
      })}
    </ul>
  );
};

function Item({
  passedItem:{url, title, author, num_comments, points}
}){
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
}

export default App;
