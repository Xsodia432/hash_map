class hashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0;
    this.entriesValue = 0;
    this.array = new Array(this.capacity);
  }
  hash(string, capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = (primeNumber * hashCode + string.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }
  resize(oldBuckets) {
    for (let items of oldBuckets) {
      if (items) {
        for (let [key, value] of items) {
          let bucket = this.array[this.hash(key, this.capacity)];
          if (bucket) bucket.push([key, value]);
          else this.array[this.hash(key, this.capacity)] = [[key, value]];
        }
      }
    }
  }

  set(key, value) {
    let storage = this.array;
    const hashCode = this.hash(key, this.capacity);
    if (this.array.length !== 0) {
      let bucket = this.array[hashCode];
      if (bucket) {
        for (let keys in bucket) {
          if (bucket[keys][0] === key) {
            bucket[keys] = [key, value];
            return;
          }
        }
        bucket.push([key, value]);
      } else this.array[hashCode] = [[key, value]];
    } else {
      this.array[hashCode] = [[key, value]];
    }
    this.entriesValue += 1;
    this.loadFactor = this.entriesValue / this.capacity;
    if (this.loadFactor > 0.75) {
      this.capacity *= 2;
      this.array = new Array(this.capacity);
      this.resize(storage);
    }
  }
  get(key) {
    if (this.array[hashCode]) {
      for (let [valueKey, value] of this.array[hashCode])
        if (key === valueKey) return value;
    }
    return null;
  }
  has(key) {
    if (this.array[hashCode]) {
      for (let valueKey of this.array[hashCode])
        if (key === valueKey[0]) return true;
    }
    return null;
  }
  length() {
    return this.entriesValue;
  }
  clear() {
    this.array = new Array();
    this.capacity = 16;
    this.entriesValue = 0;
  }
  remove(key) {
    let bucket = this.array[this.hash(key, this.capacity)];
    if (bucket) {
      for (let valueKey in bucket)
        if (key === bucket[valueKey][0]) {
          bucket.splice(valueKey, 1);
          this.entriesValue -= 1;
        }
      if (bucket.length === 0) {
        this.array[this.hash(key, this.capacity)] = undefined;
        return;
      }
    }
  }
  keys() {
    let keys = [];
    for (let items of this.array)
      if (items) for (let [key, value] of items) keys.push(key);
    return keys;
  }
  value() {
    let values = [];
    for (let items of this.array)
      if (items) for (let [key, value] of items) values.push(value);
    return values;
  }
  entries() {
    let keyValues = [];
    for (let items of this.array) {
      if (items) for (let [key, value] of items) keyValues.push([key, value]);
    }
    return keyValues;
  }
}

const test = new hashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.length());

console.log(test.length());

console.log(test.entries());
