import React from 'react';
import { IUser } from '../dto/user.interface';
import './user-card.scss';

interface UserCardProps {
  user: IUser
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
  return (
    <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
    </div>
  );
};

export default UserCard;
