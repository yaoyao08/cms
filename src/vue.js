/**
 * Vue2.x发布/订阅与观察者模式（包括数据劫持）
 */
// 发布/订阅模式 ：
export class Publisher {
  constructor() {
    this.cache = new Map();
  }
  on(key, fn) {
    if (Array.isArray(key)) {
      key.forEach((item) => {
        this.on(item, fn);
      });
    }
    if (this.cache.has(key)) {
      this.cache.get(key).push(fn);
    } else {
      this.cache.set(key, [fn]);
    }
  }
  emit(key) {
    if (this.cache.has(key)) {
      let args = Array.prototype.splice.call(arguments, 1);
      this.cache.get(key).forEach((fn) => {
        fn.apply(this, args);
      });
    }
  }
  removeAll(key) {
    this.cache.has(key) && this.cache.delete(key);
  }
  remove(key, fn) {
    if (!fn) this.removeAll(key);
    else {
      let handlers = this.cache.get(key);
      handlers.forEach((handler, index) => {
        if (handler === fn) {
          this.cache.get(key).splice(index, 1);
          if (this.cache.get(key).length < 1) this.cache.delete(key);
        }
      });
    }
  }
}
/**
 * 观察者模式
 * 参与成员Observer：数据劫持（与发布订阅的Observer类功能不同），Dep：依赖收集，Watcher：观察者
 */
/**
 * Dep实现的功能：
 * 唯一性
 * deps数组存放watchers
 * 通知watchers更新 —— notify()
 * 通知watcher收集dep —— depend()
 * 在dep中收集watcher —— depend(watcher)
 * 创建自身的target属性，用来保存当前watcher
 */

/**
 * 实现数据劫持
 */
export class Observer {
  constructor(data) {
    // Vue2中的数据劫持方式
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach((key) => {
        this.defineReactives(data, key, data[key]);
      });
    }
  }
  defineReactives(data, key, value) {
    const dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.depend(Dep.target);
        return value;
      },
    });
  }
  defineReactivesProxy(data) {
    const dep = new Dep();
    return new Proxy(data, {
      /**
       * @param {*} target 目标对象
       * @param {*} propkey 属性名
       * @param {*} reciver Proxy实例本身
       */
      get: function (target, propkey, reciver) {
        Dep.target && dep.depend(Dep.target);
        return target[propkey];
      },
    });
  }
}

/**
 * 发布订阅中心
 */
export class Dep {
  constructor() {
    this.deps = []; // 存放所有的watcher
  }
  // 订阅
  depend(watcher) {
    this.deps.push(watcher);
  }
  // 发布
  notify() {
    // 执行所有watcher的update方法
    this.deps.forEach((watcher) => watcher.update());
  }
}

/**
 * 观察者实例，在updateComponent方法中被创建，通过vm[key]
 * 触发数据劫持从而把当前Dep.target天骄到deps中
 */
export class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updater;
    Dep.target = this;
    // eslint-disable-next-line no-unused-expressions
    this.vm[this.key];
    Dep.target = null;
  }
  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}
