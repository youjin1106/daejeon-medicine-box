const Header = () => {
  return (
    <div className="flex flex-col">
      <h1 className="m-6 text-[40px] font-semibold text-center text-gray-700">
        <span className="text-blue-500">대전</span> 폐의약품 수거함 위치
      </h1>
      <p className="text-[18px] text-gray-700 text-center py-3 border-solid border-y-[1px] border-gray-300">
        대전에서 폐의약품을 수거하는 위치를 조회할 수 있습니다.
      </p>
    </div>
  );
};

export default Header;
