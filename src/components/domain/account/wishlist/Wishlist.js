import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {academyAxios} from "../../../../config/axios.config";
import WishlistCard from "./wishlistCard/WishlistCard";

function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const decoded = jwt_decode(localStorage.getItem(process.env.REACT_APP_STORAGE_ACCESS_TOKEN));

  useEffect(() => {
    academyAxios.get(`/users/${decoded.userId}/wishList`)
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          setWishlist(response.data);
        }
        setLoading(false);
      });
  }, [decoded.userId]);

  function handleRemoveWishlistCourse(courseId) {
    setWishlist(wishlist.filter(e => e._id !== courseId));
  }

  return (
    <div className="d-flex flex-wrap">
      {(!loading) ? (
        <>
          {wishlist.map((course, index) => (
            <WishlistCard
              className="mr-4 mb-4" userId={decoded.userId}
              key={index} courseData={course} remove={handleRemoveWishlistCourse}/>
          ))}
        </>
      ) : (
        <div className="m-auto">
          <div className="spinner-grow spinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
