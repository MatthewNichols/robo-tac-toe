export default class localStorageUtils {

  static saveItem(key, item) {
    if (typeof item !== "string") {
      item = JSON.stringify(item);
    }

    localStorage.setItem(key, item);
  }

  static getItem(key, defaultValue = {}): any {
    let itemString = localStorage.getItem(key);

    if (itemString === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(itemString);
    } catch(err) {
      return itemString;
    }
  }

  static getItemAs<TReturn>(returnConstructor: new(data) => TReturn, key, defaultValue = {}): TReturn {
    const itemData = this.getItem(key, defaultValue);
    return new returnConstructor(itemData);
  }
}
