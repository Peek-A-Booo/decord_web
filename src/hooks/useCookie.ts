import Cookies from 'js-cookie';

interface CookieAttributes {
  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date | undefined;

  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string | undefined;

  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string | undefined;

  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean | undefined;

  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;

  /**
   * An attribute which will be serialized, conformably to RFC 6265
   * section 5.2.
   */
  [property: string]: any;
}

export const useCookie = () => {
  return {
    get: (key: string, isParse = false) => {
      try {
        const value: any = Cookies.get(key);
        return isParse ? JSON.parse(value) : value;
      } catch (error) {
        throw new Error('get cookies error');
      }
    },
    set: (key: string, value: any, options?: CookieAttributes) => {
      if (value === null || value === undefined) {
        throw new Error(`can't set null or undefined for cookies `);
      }
      try {
        let calcValue = value;
        if (typeof value !== 'string' && typeof value !== 'number') {
          calcValue = JSON.stringify(value);
        }
        if (options) {
          Cookies.set(key, calcValue, options);
        } else {
          Cookies.set(key, calcValue);
        }
      } catch (error) {
        throw new Error('set cookies error');
      }
    },
    remove(key: string) {
      Cookies.remove(key);
    },
  };
};
