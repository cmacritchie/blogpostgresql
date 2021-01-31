import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { postArticle, editArticle } from '../actions/blogActions'
import { useHistory } from "react-router-dom";


const ArticleForm = ({existingArticle, onSubmit }) => {
    const [article, setArticle] = useState(existingArticle)
    useEffect(() => {
        console.log("useffect?")
        setArticle(existingArticle)
    },[existingArticle])

    const submit = e => {
        e.preventDefault()
        onSubmit(article)
    }

    const filechange = e => {
        setArticle({ ...article, upload: e.target.files[0]})
    }

    return(
        <form id="article-form" className="article-form" onSubmit={submit}>
            <label htmlFor="article-title">Title</label><br />
            <input id="article-title" value={article.title} onChange={e=>setArticle({...article, title: e.target.value })}></input><br />
            <label htmlFor="article-content">Content</label><br/>
            <textarea id="article-content" 
                value={article.content} 
                onChange={e=>setArticle({...article, content:e.target.value})} 
                rows="10" cols="60"/><br />
            <input type="file" onChange={e =>filechange(e)} /><br />
            <button type="submit" form="article-form" value="Submit">Submit</button>
        </form>
    )
}

ArticleForm.defaultProps = {
    existingArticle: {
        title:'',
        content:'',
        imageUrl:null
    }
}

const ArticleWrapper = ({ match, }) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [fetchedArticle, setFetchedArticle] = useState({ title:'', content:''})
    
    useEffect(() => {
        const { params } = match

        async function fetchArticle(articleId) {
            const res = await axios.get(`/api/blogpost/${articleId}`)
            setFetchedArticle(res.data);
        }
        if(Object.keys(params).includes('articleid')) {
            fetchArticle(params.articleid)
        }
    },[])

    const submitHandler = (article) => {
        if(article.hasOwnProperty('id')) {
            console.log("patch article ")
            //need to fix this.
            dispatch(editArticle(article, history))
        }
        else {
            console.log("creat Article")
            dispatch(postArticle({...article }, history))
        }
    }

    return <ArticleForm key='1' existingArticle={fetchedArticle} onSubmit={submitHandler} />
}


export default ArticleWrapper