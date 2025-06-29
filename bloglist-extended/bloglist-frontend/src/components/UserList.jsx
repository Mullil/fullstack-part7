import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null
  const blogs = user.blogs
  const blogCount = blogs.length
  return (
    <tr>
      <Link to={`/users/${user.id}`}><td>{user.name}</td></Link>
      <td>{blogCount}</td>
    </tr>
  )
}

const UserList = () => {
  const users = useSelector(state => state.user.users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  )
}

export default UserList