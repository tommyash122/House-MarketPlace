// Import necessary components from React
import React from 'react';
import {Link} from "react-router-dom";

// Import necessary SVG icons
import {ReactComponent as DeleteIcon} from "../assets/svg/deleteIcon.svg";
import {ReactComponent as EditIcon} from "../assets/svg/editIcon.svg";

// Import necessary images
import bedIcon from "../assets/svg/bedIcon.svg"
import bathtubIcon from "../assets/svg/bathtubIcon.svg"

// ListingItem component that takes in a listing object, an id, an onEdit function, and an onDelete function
function ListingItem({listing, id, onEdit, onDelete}) {
    return (
        <li className="categoryListing">

            {/* Link to the individual listing page */}
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img
                    src={listing.imgUrls[0] === null ? [] : listing.imgUrls[0]}
                    alt={listing.name}
                    className='categoryListingImg'
                />
                <div className="categoryListingDetails">

                    {/* Display the listing's location */}
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>

                    {/* Display the listing's name */}
                    <p className="categoryListingName">
                        {listing.name}
                    </p>

                    {/* Display the listing's price */}
                    <p className="categoryListingPrice">
                        ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === 'rent' && ' / Month'}
                    </p>

                    {/* Display the number of bedrooms and bathrooms */}
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt='bed'/>
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                        </p>
                        <img src={bathtubIcon} alt='bath'/>
                        <p className="categoryListingInfoText">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathrooms'}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Render the delete icon if the onDelete function is passed in */}
            {onDelete && (
                <DeleteIcon
                    className='removeIcon'
                    fill='rgb(231,76,60)'
                    onClick={() => {
                        onDelete(listing.id, listing.name)
                    }}

                />
            )}

            {/* Render the edit icon if the onEdit function is passed in */}
            {onEdit && <EditIcon className='editIcon' onClick={ () => {
                onEdit(id)
            } }/>}
        </li>


    );
}

// Export the ListingItem component
export default ListingItem;
