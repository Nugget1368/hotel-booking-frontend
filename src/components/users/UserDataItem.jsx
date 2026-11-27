import CardLong from "../CardLong"
import {useDispatch} from "react-redux"
import {deleteGuest} from "../../store/guestSlice.js";

const UserDataItem = (props) => {
  const { user } = props;
  const dispatch = useDispatch();

  const deleteUser = async () => {
    try {
      await dispatch(deleteGuest(user.guestId)).unwrap();
    } catch {
      alert("Could not delete user.");
    }
  }

  return (
    <CardLong as="li">
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="card__actions">
        <button className="btn btn--danger" onClick={deleteUser}>Delete</button>
      </div>
    </CardLong>
  )
}

export default UserDataItem
