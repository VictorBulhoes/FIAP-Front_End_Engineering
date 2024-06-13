import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";

function AllPosts() {
    const [categories, setCategories] = useState( [] );
    const [posts, setPosts] = useState( [] );

    const [selectedPage, setSelectedPage] = useState( 1 );
    const [numberOfPosts, setNumberOfPosts] = useState( 0 );
    const postsPerScreen = 2; // Pagination
    const numberOfPages = Math.ceil( numberOfPosts / postsPerScreen );
    const pageNumbers = [];

    for ( let i = 1; i <= numberOfPages; i++ ) 
    {
        pageNumbers.push( i );
    }

    const getCategories = async () => {
        try {
            const response = await contentfulClient.getEntries( {
                content_type: 'blogCategory',
            } );
    
            setCategories( response.items );
        } catch (error) {
            console.log( "Erro ao carregar categorias", error );
            setCategories( [] );
        }
    };

    const getPosts = async ( page = 1 ) => {
        try {
            const response = await contentfulClient.getEntries( {
                content_type: "blogPost",
                limit: postsPerScreen,
                skip: ( page - 1 ) * postsPerScreen,
                order: '-sys.createdAt'
            } );

            console.log( response.items );
            setPosts( response.items );
            setNumberOfPosts( response.total );
        } catch ( err ) {
            console.log( "Erro ao obter posts", err );
            setPosts( [] );
        }
    }

    useEffect( () => {
        getCategories();
        getPosts( selectedPage );
    }, [selectedPage] );

    const pagination = ( pageNumber ) => {
        setSelectedPage( pageNumber );
        getPosts( pageNumber );
    }

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="mb-3">
                            Todos os Posts
                        </h2>

                        {posts.map( ( item ) => (
                            <Card
                                key={ item.sys.id }
                                title={ item.fields.blogPostTitle }
                                text={ item.fields.blogPostDescription }
                                link={ '/post/' + item.fields.blogPostSlug }
                            />
                        ) )}

                        <nav>
                            <ul className="pagination">
                                {pageNumbers.map( number => (
                                    <li key={number} className="page-item">
                                        <a onClick={ () => pagination( number ) } className="page-link">
                                            { number }
                                        </a>
                                    </li>
                                ) )}
                            </ul>
                        </nav>

                        <Link to="/" className="btn btn-dark mt-4">
                            Voltar para a Home
                        </Link>
                    </main>

                    <aside className="col-md-4">
                        <h2>Categorias</h2>
                        <ul>
                            {categories.map( ( item ) => <li key={ item.sys.id }>{ item.fields.blogCategoryTitle }</li> )}
                        </ul>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}

export default AllPosts;
