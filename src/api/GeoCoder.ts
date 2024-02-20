const GeoCoder = () => {
  naver.maps.Service.geocode(
    {
      query: "불정로 6",
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      const result = response.v2; // 검색 결과의 컨테이너
      const { x, y } = result.addresses[0]; // 검색 결과의 배열

      // do Something
      console.log(x, y);
      //좌표 전달
    }
  );
};

export default GeoCoder;
