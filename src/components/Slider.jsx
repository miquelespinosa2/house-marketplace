import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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

  return listings && (
    <>

      <p className="exploreHeading">Recommended</p>
    <Carousel>
        {listings.map(({data, id}) => (
          <div key={id}>
            <img src={data.imgUrls[0]} alt="images" onClick={() => navigate(`/category/${data.type}/${id}`)} id='carrImage'/>
            <p className="swiperSlideText">{data.name}</p>
            <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}{''}
            {data.type === 'rent' && '/ month'}</p>
          </div>
        ))}
      </Carousel>
    </>
  )

}

export default Swiper
