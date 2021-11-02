import { useAuth } from '../authContext';

const check = (rules, role, action, data) => {
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

export const CanBase = props =>
  check(props.rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

CanBase.defaultProps = {
  yes: () => null,
  no: () => null
};

export const useCan = props => {
  const auth = useAuth();

  return check(props.rules, auth.user.role, props.perform, props.data);
};
