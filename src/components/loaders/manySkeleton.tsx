import { Skeleton } from '@mui/material'

const ManySkeleton = () => {
  return (
    <>
    {/* {Array.from({ length: 2 }).map((_, indexOne) => (
      <div key={indexOne} className='flex justify-start'>
        {Array.from({ length: 3 }).map((_, indexTwo) => (
          <div key={indexTwo} className='p-3 block'>
            <Skeleton variant='rectangular' width={280} height={140}/>
            <Skeleton width="60%"/>
            <Skeleton animation="wave"/>
          </div>
        ))}
      </div>
    ))} */}
        {Array.from({ length: 8 }).map((_, indexTwo) => (
          <div key={indexTwo} className='p-3 block'>
            <Skeleton variant='rectangular' width={280} height={140}/>
            <Skeleton width="60%"/>
            <Skeleton animation="wave"/>
          </div>
        ))}
    </>
  )
}

export default ManySkeleton