import React, {Component} from "react";

class UsersList extends Component {
  render() {
    const {users} = this.props;

    return (
      <ul>
        {users.map((user, index) => (
          <li
            className='list'
            key={index}
            onClick={e => this.props.userDetail(user)}>
            <img src={user.avatar_url} alt='' />
            <span>{user.login}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;
