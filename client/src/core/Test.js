import React from 'react'

export const NotFound = () => {
    return (
        <div className="flex justify-center place-items-center h-90">
        <h1>404 Not Found</h1>
        </div>
    )
}

export const NotProductsFound = () => {
    return (
        <div className="flex justify-center place-items-center h-90">
        <h1>No Products Found</h1>
        </div>
    )
}

const Test = ({match}) => {
    return (
        <div className="flex justify-center place-items-center h-screen">
        {match.params.category_name}

        </div>
    )
}

export default Test
