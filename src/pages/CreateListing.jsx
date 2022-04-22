import React from 'react'
import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {useRef} from 'react'


function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })


  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)


  useEffect(() => {
    if(isMounted) {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setFormData({...formData,userRef: user.uid})
        }
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])
  return (
    <div>Create</div>
  )
}

export default CreateListing
