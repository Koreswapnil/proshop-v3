import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaCheck, FaTimes, FaTrash, FaEdit } from 'react-icons/fa';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/userApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success('User deleted');
      } catch (err) {
        toast.error(err?.data?.Message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>Users</Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn-sm btn-danger mx-2"
                    style={{ color: 'white' }}
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
