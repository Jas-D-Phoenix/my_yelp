import { useEffect, useReducer, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRestaurant } from '../../graphql/mutations';
import { listRestaurants } from '../../graphql/queries';
import { onCreateRestaurant } from '../../graphql/subscriptions';
import "../createNewRestaurant/CreateRestaurantStyle.scss"
const initialState = {
  restaurants: [],
  formData: {
    name: '',
    city: '',
    description: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, restaurants: action.payload };
    case 'SUBSCRIPTION':
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
};
 
const CreateNewRestaurant = () => {
  const [restaur, setRestaur] = useState("");
const [locate, setLocate] = useState("");
const [desc, setDesc] = useState("");

  const AddNewRestaurant = async (e) => {
    e.preventDefault();
    const { name, city, description } = state.formData;
    const restaurant = {
      name,
      city,
      description,
    };
    await API.graphql(graphqlOperation(createRestaurant, { input: restaurant }));
    setRestaur('');
    setLocate('');
    setDesc('');
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getRestaurantList();

    const subscription = API.graphql(graphqlOperation(onCreateRestaurant)).subscribe({
      next: (eventData) => {
        const payload = eventData.value.data.onCreateRestaurant;
        dispatch({ type: 'SUBSCRIPTION', payload });
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRestaurantList = async () => {
    const restaurants = await API.graphql(graphqlOperation(listRestaurants));
    dispatch({
      type: 'QUERY',
      payload: restaurants.data.listRestaurants.items,
    });
  };

  const handleChange = (e) =>{
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { [e.target.name]: e.target.value },
    });
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setRestaur(value);
        break;
      case 'city':
        setLocate(value);
        break;
      case 'description':
        setDesc(value);
        break;
      default:
        break;
    }}

  return (
    <section>
      <form  className="restaurant-form">
      <h1>Create Restaurant</h1>
        <label htmlFor="name">Restaurant Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name of restaurant"
          onChange={handleChange}
          value={restaur}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Location of restaurant"
          onChange={handleChange}
          value={locate}
          required
        />

        <label htmlFor="description">Description:</label>
          <textarea maxLength={500} 
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={desc}
          required
          placeholder="Restaurant Describtion" 
          ></textarea>
        <button onClick={AddNewRestaurant} type="submit" className="submit-btn">Create Restaurant</button>
      </form>

      {state.restaurants.length ? (
          <div className="table-container">
              <table className="restaurant-table">
                <thead>
                  <tr>
                    <th>S/NO</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {state.restaurants.map((restaurant, index) => (
                    <tr key={`restaurant-${index}`}>
                      <td>{index + 1}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.city}</td>
                      <td>{restaurant.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        ) : null}
    </section>
  );
};

export default CreateNewRestaurant;

