import { from } from 'apollo-boost';
import { useAuth } from '../authContext';
import { CanBase } from './useCan';

const Can = props => {
  const auth = useAuth();

  return CanBase({
    role: auth.user.role,
    ...props,
  });
};

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Can;
