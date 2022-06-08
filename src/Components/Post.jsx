import React, { useEffect, useState } from 'react'
import { Card } from './Card';

export const Post = () => {
    const [query,setQuery]=useState("");
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    const[posts,setPost]=useState([]);

   useEffect(()=>{
    fetchPost();
   },[]);


 const fetchPost= async()=>{
   try{
       let resonse=await fetch("https://jsonplaceholder.typicode.com/posts");
       let data= await resonse.json();
       console.log(data);
       setPost(data);
       setLoading(false);
       setError(false);

   }
   catch(e){
       setLoading(false);
       setError(true);
       console.log(e.message);

   }

 };
 const handlesearch=()=>{
     console.log(query)
     let sPost=posts.filter((post)=>post.title.includes(query));
     setPost(sPost);
    
 };

 const handleQ=(e)=>{
     setQuery(e.target.value);
 };
  if(loading && !error){
      return <h1>Loading...</h1>;

  }
  else if(!loading && error){
      return <h1>wrong</h1>

  }


  return (
    <div>
        <div className='inputbox'>
            <input placeholder='search posts' type="text" value={query} onChange={handleQ}/>
            <button onClick={handlesearch}>Search</button>
        </div>
        <div>
            
                {posts.map((post)=>(
                <Card key={post.id} {...post}/>
                ))}
            
        </div>
    </div>
  )
}
