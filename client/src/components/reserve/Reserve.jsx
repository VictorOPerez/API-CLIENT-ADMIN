import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { SearchConstext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  // const res = Promise(axios.get(`hotels/room/${hotelId}`));
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { dates } = useContext(SearchConstext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavilableDates.some((date) => {
      return alldates.includes(new Date(date).getTime());
    });
    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const navigate = useNavigate();

  const handleChick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            data: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select you rooms:</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumbers) => {
                  return (
                    <div className="room">
                      <label>{roomNumbers.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumbers._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumbers)}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button onClick={handleChick} className="rButton">
          Reserve Now
        </button>
      </div>

      {/* <div className="containerButton">
      
      </div> */}
    </div>
  );
};

export default Reserve;
