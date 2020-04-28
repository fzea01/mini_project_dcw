import React, { useEffect} from 'react';
import PostCard from './PostCard';
import './PostList.css';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
// const  port = 8000

const PostList = props => {
    const posts = useSelector(state => state.post);
    // const session = useSelector(state => state.session);
    const dispatch = useDispatch(); 

    // const getPosts = async () => {
    //     const result = await axios.get(`http://localhost:${port}/api/posts`)
    //     console.log('data', result.data);
    //     dispatch({ type: 'GET_POSTS', posts: result.data })
    // }
    // console.log('session',session);

    useEffect(() => {
        const getPosts = async () => {
            // const result = await axios.get(`http://localhost:${port}/api/posts`) 
            await axios.get(`${process.env.REACT_APP_API_URL}/posts`)
            .then( (response) => {
                if(response.data.message){
                    console.log('No data, Wait server query data');
                }else{
                    // console.log('data',result.data);
                    dispatch({ type: 'GET_POSTS', posts: response.data });
                }
            })
            .catch( (error) => {
                console.log(error);
            });

            // if(result.data.message){
            //     console.log('No data, Wait server query data');
            // }else{
            //     // console.log('data',result.data);
            //     dispatch({ type: 'GET_POSTS', posts: result.data }) 
            // }
        }
        getPosts();
        // eslint-disable-next-line
      }, [props]);

    if (!posts || !posts.length) {
        return (<h2>Oop!,  Wait a minute for server query data</h2>);
    };

    return (
        
            <div className='cd-container'>
                <div className='section-grid'>
                {
                    posts.map((post, index) => (
                            <PostCard  {...post} key={index} />
                    ))
                }
                </div>
             </div>
        

    )
}

export default PostList;