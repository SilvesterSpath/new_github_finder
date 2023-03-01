import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GithubContext from '../context/github/GithubContext';
import Spinner from '../components/layout/Spinner';

function User() {
  const { user, loading, getUser } = useContext(GithubContext);
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
  }, []);

  console.log(user);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <FaCodepen />
      <Link to={`https://github.com/${user.login}`}>Github Profile</Link>
      <h2>{user.login}</h2>
    </div>
  );
}

export default User;
