
import React, { useCallback, useEffect, useMemo } from 'react';
import './users-table.scss';
import UserCard from './user-card';
import { useSelector, } from 'react-redux'
import { selectVisibleUsers } from '../state/users.slice';
import { IUser } from '../dto/user.interface';
import { fetchUsers, filterVisibleUsers } from '../state/users.slice';
import { useAppDispatch } from '../helpers';
import { debounce } from 'lodash';

const tableTitles = [
  'Name',
  'Username',
  'Email',
  'Phone'
]

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectVisibleUsers);
  const dispatchSearch = useMemo(() => {
    return debounce((searchTerm: string, prop: string) => {
      dispatch(filterVisibleUsers({ searchTerm, prop }));
    }, 300);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  return React.useMemo(() => (
    <div>
      <div className='header'>
        <h2>Users Table</h2>
        <input
          type="text"
          placeholder="Search... (All fields included)"
          onChange={(e) => {
            dispatchSearch(e.target.value, 'all')
          }}
        />
      </div>
      <div className='users-table'>
        <div className='users-table__header'>
          {
            tableTitles.map((title) => {
              return (
                <div className='users-table__header__title' key={title}>
                  {title}
                  <input
                    type="text"
                    placeholder={"Search " + title.toLowerCase() + "..."}
                    onChange={(e) => {
                      dispatchSearch(e.target.value, title)
                    }}
                  />
                </div>
              )
            })
          }
        </div>
        {
          users.length === 0 && <div className='users-table__no-users'>No users found</div>
        }
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
