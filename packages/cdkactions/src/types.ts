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

/**
 * Permissions to apply to all scopes
 */
export type PermissionAccessAll = 'read-all' | 'write-all';

/**
 * Permissions to apply to individual scopes
 */
export type PermissionAccess = 'read' | 'write' | 'none';

/**
 * All available permission scopes
 */
export type PermissionScope = 'actions' | 'checks' | 'contents' | 'deployments' | 'id-token' | 'issues' | 'discussions' | 'packages' | 'pages' | 'pull-requests' | 'repository-projects' | 'security-events' | 'statuses';

/**
 * Configuration for permissions
 */
export type PermissionsProps = PermissionAccessAll | Partial<Record<PermissionScope, PermissionAccess>>;

