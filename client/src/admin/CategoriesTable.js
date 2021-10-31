import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesTable = ({categories,handleDelete}) => {
    return (
<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          { categories && categories.map((category,idx)=>(
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800">
                  {category.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold">
                  <Link to={`/admin/category/update/${category._id}`}
                  className='px-2 py-1 bg-red rounded-xl text-white'
                  >Edit</Link>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs">
               <button onClick={()=>{handleDelete(category._id)}}
               className='px-2 py-1 bg-red rounded-xl text-white hover:underline font-bold'
               > Delete </button>
              </td>
            </tr>
        ))
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    )
}

export default CategoriesTable
