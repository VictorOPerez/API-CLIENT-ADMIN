import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyLIst = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
  const images = [
    "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/04/13/16498369774107.jpg",
    "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_360,q_auto,w_360/itemimages/81/88/8188526.jpeg",
    "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/900/450/75/dam/wdpro-assets/dlr/places-to-stay/disneyland-hotel/resort-overview/disneyland-hotel-06.jpg?1663198428556",
    "https://www.kayak.com.mx/rimg/kimg/e9/39/35c9ad5f83c125f5.jpg?width=1366&height=768&crop=true",
  ];
  return (
    <div className="plist">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => {
              return (
                <div className="pListItem" key={i}>
                  <img src={img} alt="" className="pListImg" />
                  <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>
                      {data[i]?.count} {data[i]?.type}
                    </h2>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default PropertyLIst;
