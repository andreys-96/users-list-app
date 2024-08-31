import _, { toLower } from 'lodash';
import { IUser } from './dto/user.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './state/store';

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const filterUsers = (users: IUser[], filterString: string, prop: string): IUser[] => {
  if (!filterString) {
    return users;
  }

  const lowercasedFilter = filterString.toLowerCase();

  if(prop === 'all') {
    return _.filter(users, (user: IUser) => {
      return _.some(user, (value, key) => {
        if (_.isString(value)) {
          return value.toLowerCase().includes(lowercasedFilter);
        }
        if (_.isNumber(value)) {
          return value.toString().includes(lowercasedFilter);
        }
        return false;
      });
    });
  } else {
    return _.filter(users, (user: IUser) => {
      return _.some(user, (value, key) => {
        if (key === toLower(prop) && _.isString(value)) {
          return value.toLowerCase().includes(lowercasedFilter);
        }
        return false;
      });
    });
  }
};
