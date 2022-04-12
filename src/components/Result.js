import React, { useState, useEffect } from 'react';
import { API_KEY } from '../constants/constant';
import { useSearchParams, Link, createSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Result() {
    const [searchParams, setSearchParams] = useSearchParams();
    const text = searchParams.get("text");

    const [photos, setPhotos] = useState({});
    const [isHovering, setIsHovering] = useState(null);

    useEffect(() => {
        const url = 'https://www.flickr.com/services/rest/?' + new URLSearchParams(
            {
                method: 'flickr.photos.search',
                api_key: API_KEY,
                text: text,
                sort: 'relevance',
                format: 'json',
                nojsoncallback: 1
            });
        console.log(url);
        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                setPhotos(data.photos);
            })
            .catch((error) => console.log(error));
    }, [])

    return (
        <Container>
            <div>Search Results for "{text}"</div>
            {photos.photo &&
                <ImageList cols={5}>
                    {photos.photo.map((item) => (
                            <ImageListItem key={item.id}
                                onMouseOver={() => setIsHovering(item.id)}
                                onMouseLeave={() => setIsHovering(null)}
                                component={Link}
                                to={{
                                    pathname: "/edit",
                                    search: createSearchParams({
                                        title: item.title,
                                        src: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
                                    }).toString()
                                }}
                            >
                                <img
                                    src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                {isHovering === item.id && <ImageListItemBar title={item.title} />}
                             </ImageListItem>
                    ))}
                </ImageList>}
        </Container>
    )
}