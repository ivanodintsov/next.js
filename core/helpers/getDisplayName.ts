export const getDisplayName = (WrappedComponent: React.NamedExoticComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
