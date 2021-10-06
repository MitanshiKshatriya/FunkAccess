import React from 'react'
import {Link} from 'react-router-dom'
import DisplayCard from './DisplayCard'

const ProductsGallery = ({products}) => {
  if(products.length===0)
  {
    return <>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://i.imgur.com/wI1vH3t.png'/>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://imgur.com/oe85NTH.png'/>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://imgur.com/f6GuDuO.png'/>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://imgur.com/qCcZb7E.png'/>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://imgur.com/VPKtx98.png'/>
<DisplayCard name="Blue Denim Dress" price={100} imgLink='https://imgur.com/kpmXT2u.png'/>
    </>
  }
  else {
    return <>
      {products.map((prod,idx)=>(
        <DisplayCard key={idx} name={prod.name} price={prod.price} imgLink={prod.urlPhoto}/>
      ))}
    </>
  }
}

const DisplaySection = ({products}) => {
    return (
        <div>
            <div className="my-20">
      <div className="flex flex-row justify-between my-5">
        <h2 className="text-3xl">Earring's Collection</h2>
        <Link to="/"  href="#" className="flex flex-row text-lg hover:text-purple-700">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

<ProductsGallery products={products}/>

    </div>
    </div>
        </div>
    )
}

export default DisplaySection
