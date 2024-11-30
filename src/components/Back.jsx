import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const Back = () => {
    return (
        <button
            onClick={() => window.history.back()}
            className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-[var(--color-bpciblue)]
                        hover:bg-[var(--color-bpciblue)] hover:text-white

                        focus:outline-none mt-9
                        text-xs font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                        py-1 text-[var(--color-bpciblue)] px-3
                            rounded-lg">
            <IoArrowBack
                size={17}
            /> <p>Go Back</p>
        </button>
    )
}

export default Back