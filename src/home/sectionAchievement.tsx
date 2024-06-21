

export default function SectionAchievement() {
  return (
    <div className="w-full flex-row  p-5 text-white font-semibold text-2xl items-center justify-center h-52 bg-blue-400 ">
      <div className="relative  text-black text-2xl font-semibold p-4 flex flex-row justify-around gap-4 w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <div className="align-middle">icon</div>
          <div>Customers</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="align-middle">icon</div>
          <div>Cities</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="align-middle">icon</div>
          <div>Countries</div>
        </div>
      </div>
    </div>
  );
}
