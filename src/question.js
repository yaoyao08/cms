/* eslint-disable no-loop-func */
/* eslint-disable no-const-assign */
/**
 * jsonp实现
 * @param {String} url
 * @param {Object} params
 * @param {String} callback
 */
export const jsonp = (url, params, callback) => {
  const getUrl = () => {
    let src = "";
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        src += `${key}=${params[key]}&`;
      }
    }
    return url + "?" + src + `callback=${callback}`;
  };
  return new Promise((resolve, reject) => {
    const jsp = document.createElement("script");
    jsp.setAttribute("src", getUrl());
    window[callback] = (data) => {
      resolve(data);
      document.removeChild(jsp);
    };
  });
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
export class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
/**
 *  先序遍历
 * @param {TreeNode} root
 */
export const preOrder = (root, temp = []) => {
  if (root != null) {
    temp.push(root.val);
    preOrder(root.left, temp);
    preOrder(root.right, temp);
  }
  return temp;
};

/**
 * 中序遍历
 * @param {TreeNode} root
 */
export const inOrder = (root, temp = []) => {
  if (root != null) {
    inOrder(root.left, temp);
    temp.push(root.val);
    inOrder(root.right, temp);
  }
};

/**
 * 后序遍历
 * @param {TreeNode} root
 */
export const postOrder = (root, temp) => {
  if (root != null) {
    postOrder(root.left, temp);
    postOrder(root.right, temp);
    temp.push(root.val);
  }
};

/**
 * 层次遍历
 * @param {TreeNode} root
 */
export function levelOrder(root) {
  const ret = [];
  if (!root) {
    return ret;
  }

  const q = [];
  q.push(root); //初始队列
  while (q.length !== 0) {
    const currentLevelSize = q.length; //当前层节点的数量
    ret.push([]); //新的层推入数组
    for (let i = 1; i <= currentLevelSize; ++i) {
      //循环当前层的节点
      const node = q.shift();
      ret[ret.length - 1].push(node.val); //推入当前层的数组
      node.left && q.push(node.left); //检查左节点，存在左节点就继续加入队列
      node.right && q.push(node.right); //检查左右节点，存在右节点就继续加入队列
    }
  }

  return ret;
}

/**
 * 二叉树中和为某一值的路径
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，
 * 找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 * @param {TreeNode} root
 * @param {Number} sum
 */
export const pathSum = (root, sum) => {
  if (!root) return [];
  const res = [];

  const dfs = (root, sum, path) => {
    if (!root) return;
    // 到了叶子节点并且当前节点的值跟剩余sum相等，则推入结果集中
    if (root.val === sum && !root.left && !root.right) {
      res.push(path);
    }
    // 路径中加入当前节点的值
    path.push(root.val);
    dfs(root.left, sum - root.val, path.slice());
    dfs(root.right, sum - root.val, path.slice());
  };

  dfs(root, sum, []);
  return res;
};

/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * 请你 合并 nums2到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * 注意： 最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，
 * 其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 * @param {Array} arr1
 * @param {Array} arr2
 */
export const concatArra = (arr1, arr2) => {
  if (arr2.length < 1) return arr1;
  if (arr1.length < 1) return arr2;
  let i = 0,
    j = 0,
    m = arr1.length,
    n = arr2.length;

  while (i < m && j < n) {
    if (arr1[i] >= arr2[j]) {
      if (i > 0) {
        arr1.splice(i, 0, arr2[j]);
      } else arr1 = [arr2[j], ...arr1];
      i++;
      j++;
    } else {
      i++;
    }
  }
  return arr1.concat(arr2.slice(j));
};

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 利用栈的先进后出
 * @param {String} str
 */
export const matchBracket = (str) => {
  const l = str.length;
  if (l % 2 !== 0) return false;
  let temp = [],
    map = new Map([{ "}": "{" }, { "]": "[" }, { ")": "(" }]);
  for (let i = 0; i < str.length; i++) {
    if (!map.get(str[i])) {
      temp.push(str[i]);
    } else if (map.get(str[i]) === temp[temp.length - 1]) {
      temp.pop();
    }
  }
  return !(temp.length > 0);
};
/**
 * 题：
 * 实现一个类，其实例可以链式调用，它有一个 sleep 方法，可以 sleep 一段时间后再后续调用
 */
export class PlayBoy {
  constructor(name) {
    this.name = name;
    this.timeout = 0;
  }
  sayHi() {
    setTimeout(() => {
      console.log(`大家好我是${this.name}`);
    }, this.timeout);
    return this;
  }
  sleep(timeout) {
    this.timeout += timeout;
    setTimeout(() => {
      console.log(`${timeout / 1000}s之后`);
      this.timeout -= timeout;
    }, this.timeout);
    return this;
  }
  play(game) {
    setTimeout(() => {
      console.log(`我在玩${game}`);
    }, this.timeout);
    return this;
  }
}

// 方法二，维护一个任务队列, 缺陷： 只能紧跟new PlayBoy（）后做链式调用，分开后做调用会无法触发next
export class PlayBoy2 {
  constructor(name) {
    this.name = name;
    this.queue = [];
    setTimeout(() => {
      // 进入异步任务队列 也是开启 自定义任务队列 queue 的入口
      this.next(); // next是类PlayBoy 原型上的方法，用来从queue 任务队列中取出函数执行
    }, 0);
    return this;
  }
  sayHi() {
    const fn = () => {
      console.log(`大家好我是${this.name}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }
  sleep(timeout) {
    const fn = () => {
      setTimeout(() => {
        console.log(`${timeout / 1000}s之后`);
        this.next();
      }, timeout);
    };
    this.queue.push(fn);
    return this;
  }
  play(game) {
    const fn = () => {
      console.log(`我在玩${game}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }
  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
}
/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 */
export function sum(num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add !== 0) {
    const x = i >= 0 ? num1.charAt(i) - "0" : 0;
    const y = j >= 0 ? num2.charAt(j) - "0" : 0;
    const result = x + y + add;
    ans.unshift(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.join("");
}
/**
 * 数据流中的中位数
 * 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
 * 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
 * 快慢指针
 */
export function middleNum(nums) {
  if (nums.length === 0) return null;
  let i = 0,
    j = 0;
  for (j; j < nums.length; j = j + 2) {
    i++;
  }
  console.log(i);
  return nums.length % 2 === 0 ? (nums[i] + nums[i - 1]) / 2 : nums[i];
}

/**
 * 二分查找
 * @param {Array<number>} nums
 * @param {number} target
 */
export function binarySearch(nums, target) {
  if (target > nums[nums.length - 1] || target < nums[0]) return false;
  let left = 0,
    right = nums.length - 1,
    mid,
    idx = -1;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      idx = mid;
      break;
    }
  }
  return idx > 0 ? idx : false;
}

/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 * @param {Array<Array<number>} matrix
 * @param {number} target
 */
export function findIdx(matrix, target) {
  let level = 0,
    temp;
  for (let i = 0; i < matrix.length; i++) {
    if (
      target < matrix[0][0] ||
      target > matrix[matrix.length - 1][matrix[matrix.length - 1].length - 1]
    )
      return false;
    if (target <= matrix[i][matrix[i].length - 1] && target >= matrix[i][0]) {
      level = i;
      temp = matrix[i];
      console.log(temp);
      break;
    }
  }
  return `this target index is at (${level},${binarySearch(temp, target)})`;
}
/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @param {Array<number>} nums
 * @returns {number}
 */
export function maxSubArray(nums) {
  let pre = 0,
    maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
}

/**
 * 岛屿数量
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * 深度优先搜索，从起始点开始，对于为1的点统计并把他的横向、纵向包括其迭代的横向纵向元素置零，相当于
 * 对一片岛屿只保留一个1座位代表
 * @param {Array<Array<number>>} grid
 * @returns
 */
export const numIslands = (grid) => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        count++;
        turnZero(i, j, grid);
      }
    }
  }
  return count;
};
function turnZero(i, j, grid) {
  if (
    i < 0 ||
    i >= grid.length - 1 ||
    j < 0 ||
    j >= grid[0].length - 1 ||
    grid[i][j] === "0"
  )
    return;
  grid[i][j] = "0";
  turnZero(i, j + 1, grid);
  turnZero(i, j - 1, grid);
  turnZero(i + 1, j, grid);
  turnZero(i - 1, j, grid);
}

/**
 * 扫描整个二维网格。如果一个位置为 11，则将其加入队列，开始进行广度优先搜索。
 * 在广度优先搜索的过程中，每个搜索到的 11 都会被重新标记为 00。直到队列为空，搜索结束。
 * @param {*} grid
 * @returns
 */
export const numIslands2 = (grid) => {
  let count = 0;
  let queue = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        count++;
        grid[i][j] = "0"; // 做标记，避免重复遍历
        queue.push([i, j]);
        turn2Zero(queue, grid);
      }
    }
  }
  return count;
};
function turn2Zero(queue, grid) {
  // 定义当前元素的四周位置
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  while (queue.length) {
    const cur = queue.shift();
    // 将队列中为1元素的四周位置全部存入对列，用来判断
    for (const dir of dirs) {
      const x = cur[0] + dir[0];
      const y = cur[1] + dir[1];
      if (
        x < 0 ||
        x >= grid.length - 1 ||
        y < 0 ||
        y >= grid[0].length - 1 ||
        grid[x][y] !== "1"
      ) {
        continue;
      }
      grid[x][y] = "0";
      queue.push([x, y]);
    }
  }
}
/**
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 * 回文字符串 是正着读和倒过来读一样的字符串。
 * 子字符串 是字符串中的由连续字符组成的一个序列。
 * @param {String} s
 */
export function countSubstrings(s) {
  const n = s.length;
  let count = 0;
  for (let i = 0; i < 2 * n - 1; ++i) {
    let l = i / 2,
      r = i / 2 + (i % 2);
    while (l >= 0 && r < n && s.charAt(l) === s.charAt(r)) {
      --l;
      ++r;
      ++count;
    }
  }
  return count;
}

/**
 * 珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。
 * 珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。
 * 如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。珂珂喜欢慢慢吃，
 * 但仍然想在警卫回来前吃掉所有的香蕉。返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。
 * @param {Array<number} piles
 * @param {number} H
 * @returns {number} K
 */
export function minK(piles, H) {
  /** 问题在与当最小值不在数组中时无法输出正确值，如果最小值从0开始遍历会超时 */
  let min = Math.min(...piles),
    max = Math.max(...piles),
    K = max;

  for (let i = max; i >= min; i--) {
    let count = 0;
    piles.forEach((item) => {
      count += Math.ceil(item / i);
    });
    if (count <= H) {
      K = Math.min(H, i);
    }
  }
  return K;
}
/**
 * 二分法改进：最小值从0开始，最大值仍为数组最大值，做二分查找。
 * 找到能满足Math.ceil(item/i)的和满足<H的最小值
 * @param {Array<number} piles
 * @param {number} H
 * @returns {number} K
 */
export function minK_(piles, H) {
  let max = Math.max(...piles),
    min = 0,
    mid = 0,
    K = max,
    count = 0;
  while (min <= max) {
    count = 0;
    mid = Math.floor((min + max) / 2);
    piles.forEach((item) => {
      count += Math.ceil(item / mid);
    });
    if (count <= H) {
      max = mid - 1;
      K = mid;
    } else {
      min = mid + 1;
    }
  }
  return K;
}

/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 假设最后一步为b，则b可能取值为1或者2，所以总的可能为
 * 公式： f(n)=f(n-1)+f(n-2)
 */
/**
 * 方法一：递归
 * @param {number} n
 */
export function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
/**
 * 方法二：动态规划
 * @param {number} n
 */
export function climbStairs_(n) {
  let fn_1 = 0,
    fn_2 = 0,
    fn = 1;
  for (let i = 0; i <= n; i++) {
    fn_1 = fn_2;
    fn_2 = fn;
    fn = fn_1 + fn_2;
  }
}
/**
 * 有 N 件物品和一个容量是 V 的背包。每件物品有且只有一件。
 * 第 i 件物品的体积是 v[i] ，价值是 w[i] 。
 * 求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
 * f(i,V) = max{f(i-1,V), f(i-1,V-v[i]) + w[i]}
 * @param {number} N 物品数量
 * @param {number} V 背包容量
 * @param {Array<number>} v 物品体积
 * @param {Array<number>} w 物品价值
 */
export function knapsack(weights, values, W) {
  let n = weights.length - 1;
  let f = [[]];
  for (let j = 0; j <= W; j++) {
    if (j < weights[0]) {
      //如果容量不能放下物品0的重量，那么价值为0
      f[0][j] = 0;
    } else {
      //否则等于物体0的价值
      f[0][j] = values[0];
    }
  }
  for (let j = 0; j <= W; j++) {
    for (let i = 1; i <= n; i++) {
      if (!f[i]) {
        //创建新一行
        f[i] = [];
      }
      if (j < weights[i]) {
        //等于之前的最优值
        f[i][j] = f[i - 1][j];
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);
      }
    }
  }
  return f[n][W];
}
/**
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。
 * 你可以 按任意顺序 返回答案。
 * @param {Array<number>} nums
 * 方法一只记载了全排列的个数
 */
export function permute(nums) {
  let n = nums.length;
  if (n === 1) return 1;
  return computePremute(n);
}

/**
 * @param {number} n
 */
function computePremute(n) {
  if (n === 1) return 1;
  else return n * computePremute(n - 1);
}

//
export function permute_(nums) {
  let len = nums.length,
    result = [],
    visited = new Array(len).fill(false);

  const dfs = (nums, len, depth, path, visited) => {
    // 遍历到叶子结点了，可以返回了
    if (depth === len) {
      result.push([...path]);
    }

    for (let i = 0; i < len; i++) {
      // 如果没遍历过
      if (!visited[i]) {
        // 压入 path 数组，然后是否遍历过的数组此下标处变为 true
        path.push(nums[i]);
        visited[i] = true;
        // 继续 dfs，直到最后一层
        dfs(nums, len, depth + 1, path, visited);
        // 进行回溯，还原，以便下一次使用
        visited[i] = false;
        path.pop();
      }
    }
  };
  dfs(nums, len, 0, [], visited);
  return result;
}
/**
 * 拼接字符串函数
 * @param {String} str
 * @param {number} n
 */
export function repeat(str, n) {
  if (n === 1) return str;
  if (n <= 0) return "";
  let temp = str;
  for (let i = 0; i < n; i++) {
    str += temp;
  }
  return str;
}
/**
 * 利用数组
 */
export function repeat_(str, n) {
  return Array.prototype.join.call({ length: n + 1 }, str);
}
/**
 * 使用Promise实现：限制异步操作的并发个数，并尽可能快的完成全部有8个图片资源的url，已经存储在数组urls中。
 * urls类似于['https://image1.png', 'https://image2.png', ....]
 * 而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，
 * 该Promise在图片下载完成的时候resolve，下载失败则reject。
 * 但有一个要求，任何时刻同时下载的链接数量不可以超过3个。
 */
export function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then((fastestIndex) => {
          // 获取到已经完成的下标
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => {
      // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
export function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error("Could not load image at" + url));
    };
    img.src = url;
  });
}

/**
 * 封装一个 javascript 的类型判断函数
 * @param {*} data
 */
export function getType(data) {
  let type = Object.prototype.toString.call(data);
  type = type.split(" ")[1].split("");
  type.pop();
  return type.join("");
}
/**
 * Z 字形变换
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * @param {string} str
 * @param {number} rows
 * @returns
 */
export function convert(str, rows) {
  let out = Array.from(Array(rows), () => new Array(str.length));
  let pre = 0,
    cur = 0,
    i = 0;
  while (i < str.length) {
    if (cur === 0) {
      out.forEach((item) => {
        item[0] = str[i++];
      });
    } else if (cur - pre === rows - 1) {
      out.forEach((item) => {
        item[cur] = str[i++];
      });
      pre = cur;
    } else {
      out[rows - cur + pre - 1][cur] = str[i++];
    }
    cur++;
  }
  return out;
}
/**
 * 实现一个对象的 flatten 方法，同样可以做深拷贝的方法
 * @param {Object} obj
 */
export function flatten(obj, hash = new Set(), result = {}) {
  if (!isObj(obj)) return obj;
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      let type = isObj(element);
      if (!type && !hash.has(element)) {
        hash.set(element);
        result[key] = element;
        console.log(result);
      } else if (!type && hash.has(element)) {
        result[key] = hash.get(element);
      } else if (type) {
        flatten(element, hash, result);
      }
    }
  }
  return result;
}

function isObj(obj) {
  let type = Reflect.toString.call(obj).split(" ")[1].split("");
  type.pop();
  type = type.join("");
  return type === "Object" ? true : false;
}

/**
 * 无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} str
 */
export function maxSubStr(str) {
  let len = str.length;
  if (len < 2) return str;
  let temp = "",
    sub = "",
    index = -1;
  for (let i = 0; i < len; i++) {
    if (!sub.includes(str[i])) {
      sub += str[i];
    } else {
      temp = temp.length > sub.length ? temp : sub;
      index = sub.indexOf(str[i]);
      sub = sub.length > index ? sub.substring(index + 1) : "";
    }
  }
  temp = temp.length > sub.length ? temp : sub;
  return temp;
}
/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * @param {Array<number>} nums
 * @param {number} target
 */
export function twoSum(nums, target) {
  if (nums.length < 2) return null;
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    let index = nums.indexOf(target - nums[i]);
    if (index !== -1 && index !== i)
      res.push([Math.max(i, index), Math.min(i, index)]);
  }
  return res;
}
function isSame(nums1, nums2) {
  if (nums1[0] === nums2[0] && nums1[1] === nums2[1]) return true;
}
/**
 * 解析一个url，并生成window.location对象包含的域
 * location:
 * {
 *  href: '包含完整的url',
 *  origin: '包含协议到pathname之前的内容',
 *  protocol: 'url使用的协议，包含末尾的:',
 *  username: '用户名', // 暂时不支持
 *  password: '密码',  // 暂时不支持
 *  host: '完整主机名，包含:和端口',
 *  hostname: '主机名，不包含端口'
 *  port: '端口号',
 *  pathname: '服务器上访问资源的路径/开头',
 *  search: 'query string，?开头',
 *  hash: '#开头的fragment identifier'
 * }
 * @param {string} url
 * @returns {Object}
 */
export function transUrl(url) {
  let obj = {};
  obj.href = url;
  obj.protocol = url.substring(0, url.indexOf(":"));
  let hostname = url.substring(url.indexOf(":") + 2);
  hostname = hostname.substring(
    1,
    hostname.indexOf("?") || hostname.indexOf("/") || null
  );
  obj.host = hostname;
  obj.hostname =
    hostname.indexOf(":") > 0
      ? hostname.substring(0, hostname.indexOf(":"))
      : hostname;
  obj.port =
    hostname.indexOf(":") > 0 ? hostname.substring(hostname.indexOf(":")) : 443;
  return obj;
}
/**
 * 手写一个add方法，实现两个大数相加
 * @param {string} str1
 * @param {string} str2
 * @returns {string}
 */
export function bigAdd(str1, str2) {
  str1 = str1.split("");
  str2 = str2.split("");
  let res = "";
  let flag = 0;
  while (str1.length || str2.length) {
    let a1 = str1.pop() || 0;
    let a2 = str2.pop() || 0;
    let sum = parseInt(a1) + parseInt(a2) + flag;
    if (sum > 9) {
      sum = sum - 10;
      flag = 1;
    } else {
      flag = 0;
    }
    res = sum + res;
  }
  return flag ? flag + res : res;
}
/**
 * 实现new关键字
 * es6中的类提供new.target用于检测是否是使用new关键字创建的类，所以手动实现的new不能
 * 通过校验，不能使用_new实例化Class类
 */
export function _new() {
  let obj = {};
  let _constructor = Array.prototype.shift.call(arguments); //取出参数的第一项-构造函数
  obj.__proto__ = _constructor.prototype; //修改实例的原型指向构造函数的原型
  let res = _constructor.apply(obj, arguments); //调用构造函数，this指向obj
  return typeof res === "object" ? res : obj;
}
/**
 * 深度拷贝
 */
export function deepClone(target) {
  // 使用weakmap解决循环引用，键必须为对象
  const map = new WeakMap();

  // 判断是否为对象或者函数
  function isObject(target) {
    return (
      (typeof target === "object" && target) || typeof target === "function"
    );
  }
  function clone(data) {
    // 如果data不属于对象或者函数，则证明其为基本数据类型，直接返回数值即可
    if (!isObject(data)) {
      return data;
    }
    const exist = map.get(data);
    const type = getType(data);
    if (exist) {
      return exist; //如果weakmap中已经存在对象的键值，表明对象已经被添加过
    }
    // 对日期和正则函数做匹配
    // 对于日期或者正则，直接调用其构造函数重新进行实例化
    if ([Date, RegExp].includes(type)) {
      return new data.constructor(data);
    }
    // 如果是函数则利用toString函数重新定义一个自执行函数，直接返回函数结果
    if (type === "Function") {
      return new Function("return " + data.toString())();
    }
    if (type === "Map") {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (type === "Set") {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data); // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
    const result = Object.create(Object.getPrototypeOf(data), allDesc); // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
    map.set(data, result);
    // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }
  return clone(target);
}
/**
 * 防抖
 * 在时间T内触发则覆盖上一次，只触发T内的最后一次点击
 * @param {*} fn
 * @param {Number} wait
 */
export function debounce(fn, wait) {
  let timer;
  return function () {
    let that = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, wait);
  };
}
/**
 * 节流
 * 每T时间触发一次
 * 利用函数闭包，闭包中使用的变量不会被销毁，所以timer不会被立即销毁，第二次进入后仍然是之前的timer
 * @param {*} fn
 * @param {Number} delay
 */
export function throttled(fn, delay = 500) {
  let timer;
  return function () {
    let that = this;
    let args = arguments;
    if (!timer) {
      return setTimeout(() => {
        fn.apply(that, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * Vue2.x发布/订阅与观察者模式（包括数据拦截）
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
 * subs数组存放watchers
 * 通知watchers更新 —— notify()
 * 通知watcher收集dep —— depend()
 * 在dep中收集watcher —— addSub(watcher)
 * 创建自身的target属性，用来保存当前watcher
 */

/**
 * 实现数据劫持
 */
class Observer {
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
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
    });
  }
  defineReactivesProxy(data) {
    return new Proxy(data, {
      /**
       * @param {*} target 目标对象
       * @param {*} propkey 属性名
       * @param {*} reciver Proxy实例本身
       */
      get: function (target, propkey, reciver) {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
    });
  }
}

/**
 * 发布订阅中心
 */
class Dep {
  constructor() {
    this.subs = []; // 存放所有的watcher
  }
  // 订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 发布
  notify() {
    // 执行所有watcher的update方法
    this.subs.forEach((watcher) => watcher.update());
  }
}
let dep = new Dep();
