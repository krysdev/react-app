// import React, {useState, useEffect} from 'react';
// // import stories from './list';

// function App() {
//   const stories = [
//     {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walker",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//     },
//     {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//     }
// ]

// const [searchTerm, setSearchTerm] = useState(
//   localStorage.getItem('search') || 'React'
// );

// useEffect(function(){
//   localStorage.setItem('search', searchTerm)
// },[searchTerm]
// )

// const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))

// function HandleSearch(event){
//   setSearchTerm(event.target.value)
// }

// return (
//   <div>
//       <h1>Header</h1>
//       <Search onSearch={HandleSearch} searchTerm={searchTerm}/>
//       <hr />
//       <List list={searchedStories}/>
//     </div>
//   );
// }

// const Search = ({onSearch, searchTerm}) => {
// return(
//     <div>
//       <label htmlFor="search">Search: </label>
//       <input id="search" type="text" value={searchTerm} onChange={onSearch}/>
//       <p>TEXT: <strong>{searchTerm}</strong></p>
//     </div>
//   )
// };

// const List = ({list}) => {
//   return (
//     <ul>
//       {list.map((item) => {
//         return <Item key={item.objectID} item={item}/>
//       })}
//     </ul>
//   );
// };

// function Item({item}){
//   return (
//     <li>
//       <span>
//         <a href={item.url}>{item.title}</a>
//       </span>
//       <span>{item.author}</span>
//       <span>{item.num_comments}</span>
//       <span>{item.points}</span>
//     </li>
//   );
// }

// export default App;


import React, {useState, useEffect, useRef} from 'react';

function App() {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
      setToggle(!toggle);
    };
  
    return <Toggler toggle={toggle} onToggle={handleToggle} />;
};

const Toggler = ({ toggle, onToggle }) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      console.log('I run only if toggle changes.');
    } else {
      didMount.current = true;
    }
  }, [toggle]);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
    </div>
  );
}

export default App