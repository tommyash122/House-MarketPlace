import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from "../components/Spinner";

// Load the required Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    // Set up state for loading status and listing data
    const [loading, setLoading] = useState(true)
    const [listings, setListing] = useState(null)

    // Get the navigate function from react-router-dom
    const navigate = useNavigate()

    // Use an effect to fetch the most recent 5 listings from Firestore
    useEffect(() => {
        const fetchListings = async () => {
            // Get a reference to the listings collection
            const listingsRef = collection(db, 'listings')
            // Query the listings collection to get the most recent 5 listings, ordered by timestamp
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            // Get the query snapshot
            const querySnap = await getDocs(q)

            let listings = []

            // Iterate over the documents in the query snapshot and add them to the listings array
            querySnap.forEach((doc) => {
                return (
                    listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                )
            })

            // Update the listings state and set loading to false
            setListing(listings)
            setLoading(false)
        }
        fetchListings()
    }, [])

    // If the data is still loading, render a Spinner component
    if (loading) {
        return <Spinner />
    }

    // If there are no listings, render an empty fragment
    if (listings.length === 0) {
        return <></>
    }

    // Render the Swiper component with each listing as a slide
    return (
        <>
            {/* Render a heading for the slider */}
            <p className="exploreHeading">Recommended</p>

            {/* Render the Swiper component */}
            <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                {listings.map(({ data, id }) => (
                    <SwiperSlide
                        key={id}
                        onClick={() => navigate(
                            `/category/${data.type}/${id}`
                        )}
                    >
                        {/* Render the slide content */}
                        <div
                            style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover'
                            }}
                            className="swiperSlideDiv"
                        >
                            <p className="swiperSlideText">{data.name}</p>
                            <p className="swiperSlidePrice">
                                ${data.discountedPrice ?? data.regularPrice}
                                {' '}
                                {data.type === 'rent' && '/ month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default Slider;
