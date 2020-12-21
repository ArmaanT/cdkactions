/**
 * A generic string to string map.
 */
export interface StringMap { readonly [key: string]: string }


/**
 * Configuration for a shell environment.
 */
export interface RunProps {
  /**
   * The shell to use.
   */
  readonly shell?: 'bash' | 'pwsh' | 'python' | 'sh' | 'cmd' | 'powershell';

  /**
   * A custom working directory.
   */
  readonly workingDirectory?: string;
}


/**
 * A defaults configuration block.
 */
export interface DefaultsProps {
  /**
   * A RunProps block
   */
  readonly run?: RunProps;

  /**
   * The rest of the defaults block can be
   * any string key with values of any type.
   */
  readonly [key: string]: any;
}
