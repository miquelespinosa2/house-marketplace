import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Spinner from './Spinner'
import { divIcon } from 'leaflet'

function Swiper() {
  const [loading, setLoading] = useState(null)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {


      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'),
      limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if(loading) {
    return <Spinner />
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>

      <Slider {...settings}>
        {listings.map(({data, id}) => (
          <div key={id}>
            <img src={data.imgUrls[0]} alt="images" onClick={() => navigate(`/category/${data.type}/${id}`)} />
            <p className="swiperSlideText">{data.name}</p>
            <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}{''}
            {data.type === 'rent' && '/ month'}</p>
          </div>
        ))}
      </Slider>
    </>
  )

}

export default Swiper
