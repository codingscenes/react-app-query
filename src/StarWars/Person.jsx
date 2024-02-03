export function Person({ basicInfo }) {
  return (
    <div className='grid grid-cols-2 shadow-md w-96  items-center justify-items-center bg-slate-800 text-white my-5 rounded-md mx-auto'>
      <h2 className='text-xl'>{basicInfo.name}</h2>
      <div>
        <h3 className='text-lg'>Gender: {basicInfo.gender}</h3>
        <h3 className='text-lg'>Birthday: {basicInfo.birth_year}</h3>
        <h3 className='text-lg'>Mass: {basicInfo.mass}</h3>
      </div>
    </div>
  );
}
