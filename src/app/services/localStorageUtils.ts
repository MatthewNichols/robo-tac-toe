export default class localStorageUtils {

  static saveItem(key, item) {
    console.log(item);
    if (typeof item !== "string") {
      var currentValue = localStorageUtils.getItem(key);
      var saveValue = {...currentValue, ...item};
      item = JSON.stringify(saveValue);
    }

    localStorage.setItem(key, item);
  }

  static getItem(key, defaultValue = {}): any {
    let itemString = localStorage.getItem(key);

    if (itemString === null) {
      return defaultValue;
    }

    try {

      var parseedItem = JSON.parse(itemString);
      return {...defaultValue, ...parseedItem};
    } catch(err) {
      return itemString;
    }
  }

  static getItemAs<TReturn>(returnConstructor: new(data) => TReturn, key, defaultValue = {}): TReturn {
    const itemData = this.getItem(key, defaultValue);
    return new returnConstructor(itemData);
  }
}
