declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Override<T, U> = Omit<T, keyof U> & U

declare function gtag(...args: Parameters<Gtag.Gtag>): ReturnType<Gtag.Gtag>;

declare module "react-imask" {
  import Imask from "imask";

  /**
   * The props accepted by react-imask, based
   * on the implementation of imask, with  some additions
   */
  export type IMaskInputProps = Partial<
    Pick<
      Imask.AnyMaskedOptions,
      | "mask"
      | "value"
      | "prepare"
      | "validate"
      | "commit"
      | "overwrite"
      | "placeholderChar"
      | "lazy"
      | "definitions"
      | "blocks"
      | "pattern"
      | "format"
      | "parse"
      | "autofix"
      | "radix"
      | "thousandsSeparator"
      | "mapToRadix"
      | "scale"
      | "signed"
      | "normalizeZeros"
      | "padFractionalZeros"
      | "min"
      | "max"
      | "dispatch"
    >
  > & {
    unmask?: boolean;
    onAccept?: <T>(...args: T[]) => void;
    onComplete?: <T>(...args: T[]) => void;
  };

  /**
   * A function that decorates a react component
   * with 'imask' props
   * @param Component Any React Component
   */
  export function IMaskMixin<T, D>(
    Component: React.ComponentType<{ inputRef: React.Ref<D> } & T>
  ): React.ComponentType<T & IMaskInputProps>;

  /**
   * A basic IMask React Input
   */
  export const IMaskInput: React.ComponentType<IMaskInputProps>;
}
