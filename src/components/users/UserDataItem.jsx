import CardLong from "../CardLong"
import Api from "../../application/api"
const UserDataItem = (props) => {
  const { user, userList, setUserList, onUserDeleted } = props;

  const deleteUser = async () => {
    let result = await Api.deleteUserAsync(user.guestId);
    if (result.success) {
      let newList = userList.filter((u) => u.guestId !== user.guestId);
      setUserList(newList);
      onUserDeleted(); // Call the callback function to notify the parent component
    }
    else {
      alert("Could not delete user.");
    }
  }

  return (
    <CardLong as="li">
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="btn-container">
        <button className="btn danger" onClick={deleteUser}>Delete</button>
      </div>
    </CardLong>
  )
}

export default UserDataItem
