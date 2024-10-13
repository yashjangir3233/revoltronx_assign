import React from 'react'

const Headline = ({img,title,author,date,url}) => {
  return (
    <a href={url} target='_blank'>
        <div className="flex gap-5 bg-[#F4F4F4] p-6 rounded-xl cursor-pointer bg-no-repeat bg-cover mb-10 ">
        <div className="max-md:hidden">
            <img src={img} alt="" className='w-full min-w-48 max-w-60 h-40 object-cover rounded-xl shadow-2xl '/>
        </div>
        <div className="space-y-3">
            <div className="flex gap-3 items-end rounded-lg flex-wrap">
                <h3 className='text-[#FF8719] text-sm'>{author}</h3>
                <div className="rounded-full w-2 h-2 bg-[#c4c2c2] mb-1"></div>
                <div className="text-xs text-[#9D9D9D] font-bold">{date}</div>
            </div>
            <div className="text-sm md:text-base lg:text-lg lg:leading-5 md:leading-5 sm:leading-5 font-extrabold">{title}</div>
        </div>
    </div>
    </a>
  )
}

export default Headline