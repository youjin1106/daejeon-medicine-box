type Icon = {
  title: string;
  address: string;
  telNumber: string;
};

const Marker = ({ title, address, telNumber }: Icon): string => {
  const icon = [
    '<div class="bg-white w-20 h-10">',
    '<div class="map_group _map_group crs">',
    '<div class="map_marker _marker num1 num1_big"> ',
    `<span>${title}</span>`,
    `<span>${address}</span>`,
    `<span>${telNumber}</span>`,
    "</div>",
    "</div>",
    "</div>",
  ].join("");
  return icon;
};

export default Marker;
