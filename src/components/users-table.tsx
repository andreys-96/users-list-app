
import React, { useEffect } from 'react';
import './users-table.scss';
import UserCard from './user-card';
import { useSelector, } from 'react-redux'
import { selectVisibleUsers } from '../state/users.slice';
import { IUser } from '../dto/user.interface';
import { fetchUsers, filterVisibleUsers } from '../state/users.slice';
import { useAppDispatch } from '../helpers';

const tableTitles = [
  'Name',
  'Username',
  'Email',
  'Phone'
]

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectVisibleUsers)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  return React.useMemo(() => (
    <div>
      <div className='header'>
        <h2>Users Table</h2>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            dispatch(filterVisibleUsers(e.target.value))
          }}
        />
      </div>
      <div className='users-table'>
        <div className='users-table__header'>
          {
            tableTitles.map((title) => {
              return (
                <div className='users-table__header__title'>{title}</div>
              )
            })
          }
        </div>
        {
          users.map((user: IUser) => {
            return (
              <UserCard user={user} key={user.id} />
            )
          })
        }
      </div>
    </div>
  ), [users]);
};

export default UsersTable;
