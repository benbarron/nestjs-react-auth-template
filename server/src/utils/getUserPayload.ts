import { Connection, getConnection } from 'typeorm';
import { User } from '../modules/user/user.entity';

export const getUserPayload = (user: User): Object => {
  const conn: Connection = getConnection();
  const metadata = conn.getMetadata(User);
  const columns = Object.keys(metadata.propertiesMap);
  const output = {};

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] != 'password') {
      output[columns[i]] = user[columns[i]];
    }
  }

  return output;
};
