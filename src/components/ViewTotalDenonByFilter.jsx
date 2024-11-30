import React from 'react'

const ViewTotalDenonByFilter = ({ data, title }) => {
    return (
        <div className="h-[200px] min-w-96 max-[450px]:w-[85vw] max-[300px]:py-2 w-96 bg-[var(--color-bpciblue)] text-white p-7 rounded-md shadow-sm hover:shadow-lg transition-all hover:scale-[1.1] hover:-translate-y-[1.5rem]">
            <p className='text-[1.1rem]'>{title}</p>
            <h2 className='text-[5rem] font-PoppinsBold ml-auto text-right'>{data}</h2>
        </div>
    )
}

export default ViewTotalDenonByFilter