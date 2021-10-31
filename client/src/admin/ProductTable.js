import React from 'react'
import { Link } from 'react-router-dom'

const ProductTable = ({products,handleDelete}) => {
    return (
        <div className="overflow-y-auto" style={{height:'500px'}}>
            <table className="table-auto shadow striped">
  <thead className="bg-pink-dark text-white font-semibold text-center">
    <tr >
      <th className="w-1/4 px-2 py-3">Image</th>
      <th className="w-1/4 px-2 py-3">Name</th>
      <th className="w-1/4 px-2 py-3">Price</th>
      <th className="w-1/4 px-2 py-3">Options</th>
    </tr>
  </thead>
  <tbody>
    { products && products.map((prod,idx)=>(
    <tr key={idx} className="hover:bg-gray-lightest">
    <td className='flex justify-center'>
    <img className="tableImage block" src={prod.urlPhoto} alt="product"/>
    </td>
      <td>{prod.name}</td>
      <td>{prod.price}</td>
      <td>
          <button onClick={()=>{handleDelete(prod._id)}}>
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
</svg></button>
<Link to={`/admin/product/update/${prod._id}`}>
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
</svg>
</Link>
      </td>
    </tr>
    ))
    }
  </tbody>
</table>
        </div>
    )
}

export default ProductTable
