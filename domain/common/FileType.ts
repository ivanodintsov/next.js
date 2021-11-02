import { Type, Transform } from 'class-transformer';

function FileType (name, opts?) {
  return function(target: any, key: string) {
    Type(() => Object, opts)(target, key);
    Transform(({ obj }) => {
        return obj[name];
    }, opts)(target, key);
  };
}

export default FileType;
