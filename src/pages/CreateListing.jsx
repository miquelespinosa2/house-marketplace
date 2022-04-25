import React from 'react'
import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {useRef} from 'react'


function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
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

  const {type, name, bedrooms, bathrooms, parking, furnished,
  address, offer, regularPrice, discountedPrice, images,
  latitude, longitude
  } = formData


  const auth = getAuth()
  const navigate = useNavigate()

  // mounting for the memory leaks
  const isMounted = useRef(true)

  // useEffect hook for the mounting (memory leak error)
  useEffect(() => {
    if(isMounted) {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setFormData({...formData, userRef: user.uid})
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onMutate = (e) => {

  }


  // when the webpage is loading (fetching), play the spinner gif
  if(loading) {
    return <Spinner />
  }

  return (
    <div className='profile'>
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className='formLabel'>Sell / Rent</label>
          <div className="formButtons">
            <button type='button' className={type === 'sale' ?
            'formButtonActive' : 'formButton'}
            id='type'
            value='sale'
            onClick={onMutate}
            >
              Sell
            </button>
            <button type='button' className={type === 'rent' ?
            'formButtonActive' : 'formButton'}
            id='type'
            value='rent'
            onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <label className="formLabel">Name
          <input type="text"
          className='formInputName'
          id='name'
          value={name}
          onChange={onMutate}
          maxLength='32'
          minLength='10'
          required
          />
          </label>

        <div className="formRooms flex">
          <div>
            <label className="formLabel">Bedrooms</label>
            <input
            type="number"
            className='formInputSmall'
            id='bedrooms'
            value={bedrooms}
            onChange={onMutate}
            min='1'
            max='50'
            required />
          </div>
          <div>
            <label className="formLabel">Bathrooms</label>
            <input
            type="number"
            className='formInputSmall'
            id='bathrooms'
            value={bathrooms}
            onChange={onMutate}
            min='1'
            max='50'
            required />
          </div>
        </div>


        <label className="formLabel">Parking spot</label>
        <div className="formButtons">
          <button
          className={parking ? 'formButtonActive' : 'formButton'}
          type='button'
          id='parking'
          value={true}
          onClick={onMutate}
          min='1'
          max='50'

          >
            Yes
          </button>
          <button
          className={!parking && parking !== null ?'formButtonActive' : 'formButton'}
          type='button'
          id='parking'
          value={false}
          onClick={onMutate}
          min='1'
          max='50'

          >
            No
          </button>
        </div>
        <label className="formLabel">Address</label>
        <textarea
          className='formInputAddress'
          id="address"
          type='text'
          value={address}
          onChange={onMutate}
          required
        />

        {!geolocationEnabled && (
          <div className='formLatLng flex'>
            <div>
              <label className="formLabel">Latitude</label>
              <input type="number"
              className='formInputSmall'
              id='latitude'
              value={latitude}
              onChange={onMutate}
              required />
            </div>
            <div>
              <label className="formLabel">Longitude</label>
              <input type="number"
              className='formInputSmall'
              id='longitude'
              value={longitude}
              onChange={onMutate}
              required />
            </div>
          </div>
        )}

        <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

        <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  )
}

export default CreateListing
