import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { listRestaurants } from "../../graphql/queries";
import { deleteRestaurant } from "../../graphql/mutations";
import { useEffect, useState } from "react";
import "./RestListStyle.scss";

const RestaurantList = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (restaurant) => {
    try {
      const { data: restData } = await API.graphql(
        graphqlOperation(deleteRestaurant, { input: { id: restaurant.id } })
      );
      console.log(restData);
      setData((prevData) =>
        prevData.filter((item) => item.id !== restaurant.id)
      );
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    const allRestaurants = async () => {
      try {
        const restaurants = await API.graphql(
          graphqlOperation(listRestaurants)
        );
        const newData = restaurants.data.listRestaurants.items;
        setData(newData);
      } catch (e) {
        console.log("error");
      }
    };
    allRestaurants();
  }, []);

  console.log(data);
  return (
    <section className="restaurant-list">
      <Link to={"/account"} className="account-link">
        <button className="create-account-btn">Create account</button>
      </Link>
      <div className="restaurant-container">
        {data ? (
          data.map((restaurant) => (
            <div key={restaurant.id}  className="restaurant-created">
              <h3>{restaurant.name}</h3>
              <p><span className="restaurant-span">Location:</span> {restaurant.location}</p>
              <p><span className="restaurant-span">Description:</span> {restaurant.description}</p>

              <div>
                <button onClick={() => handleDelete(restaurant)}  className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>No new restaurant</div>
        )}
      </div>
    </section>
  );
};
export default RestaurantList;
