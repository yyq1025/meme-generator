import React, { useState, useEffect } from 'react';
import { API_KEY } from '../constants/constant';
import { useSearchParams, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Edit from './Edit';
import Navbar from './Navbar';

export default function Result() {
    const [searchParams, setSearchParams] = useSearchParams();
    const text = searchParams.get("text");

    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [photo, setPhoto] = useState([]);
    const [isHovering, setIsHovering] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', src: '' });

    const fetchData = () => {
        const url = 'https://www.flickr.com/services/rest/?' + new URLSearchParams(
            {
                method: 'flickr.photos.search',
                api_key: API_KEY,
                text: text,
                sort: 'relevance',
                page: page,
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
                setPhoto([...photo, ...data.photos.photo]);
                setPage(p => p + 1);
            })
            .catch((error) => console.log(error));
    }

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

        const initData = () => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                })
                .then((data) => {
                    setTotal(data.photos.total);
                    setPhoto(data.photos.photo);
                    setPage(p => p + 1);
                })
                .catch((error) => console.log(error));
        }

        initData();
    }, [text])

    return (
        console.log(photo),
        <Box>
            <Navbar />
            <Container maxWidth="md" sx={{ paddingTop: '100px' }}>
                <Box display={'flex'} alignItems={'center'}>
                <IconButton color='inherit' onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' display={'inline'}>{total.toLocaleString()} Results for "{text}"</Typography></Box>
                    <InfiniteScroll
                        dataLength={photo.length}
                        scrollThreshold={1}
                        next={fetchData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }><ImageList cols={4}>
                            {photo.map((item) => (
                                <ImageListItem key={`${item.server}${item.id}${item.secret}`}
                                    onMouseOver={() => setIsHovering(item.id)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    // component="button"
                                    onClick={() => {
                                        setModalData({ title: item.title, src: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg` });
                                        setIsOpen(true);
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                // component={Link}
                                // to={{
                                //     pathname: "/edit",
                                //     search: createSearchParams({
                                //         title: item.title,
                                //         src: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
                                //     }).toString()
                                // }}
                                >
                                    <img
                                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    {isHovering === item.id && <ImageListItemBar title={item.title} />}
                                </ImageListItem>
                            ))}</ImageList>
                    </InfiniteScroll>
            </Container>
            <Edit
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={modalData.title}
                src={modalData.src} />
        </Box>
    )
}