const Header = () => {
  return (
    <div className="flex flex-col">
      <h1 className="m-6 text-[40px] font-semibold text-center text-gray-700">
        <span className="text-blue-500">대전</span> 폐의약품 수거함 위치
      </h1>
      <p className="text-[18px] text-gray-700 text-center py-3 border-solid border-y-[1px] border-gray-300">
        대전에서 폐의약품을 수거하는 위치를 조회할 수 있습니다. <br />
        1. <span className="font-semibold">확인하고 싶은 구를 선택</span>
        해주세요.
        <br />
        2. <span className="font-semibold">마커를 클릭</span>하면 장소 이름과
        주소를 확인할 수 있어요.
      </p>
    </div>
  );
};

export default Header;
