import { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const url = process.env.REACT_APP_GITHUB_URL;
    console.log(url);
    const res = await fetch(`${url}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    setUsers(data);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      <ul>
        {users.map((item) => (
          <h3 key={item.id}>{item.login}</h3>
        ))}
      </ul>
    </div>
  );
}

export default UserResults;
