class Store {
  static set(name, value){
    localStorage[name] = value
  }

  static get (name){
    return localStorage[name]
  }

  static clear(name){
    localStorage.removeItem(name)
  }

  static isSet(name){
    return localStorage[name] !== undefined
  }

  static setObject(name, object){
    localStorage[name] = JSON.stringify(object)
  }

  static getObject(name){
    if(localStorage[name] !== undefined)
      return JSON.parse(localStorage[name])
    else
      return null
  }
}

export default Store
