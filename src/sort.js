/**
 * 归并排序
 * @param {Array<number>} arr
 * @returns
 */
export function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
/**
 * @param {Array<number>} left
 * @param {Array<number>} right
 * @returns
 */
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] >= right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  while (left.length || right.length) {
    result.push(left.shift() || right.shift());
  }
  return result;
}
/**
 * 快排
 * @param {Array<number>} arr
 * @param {number} begin
 * @param {number} end
 */
export function quickSort(arr, begin, end) {
  console.time("1.快速排序耗时");
  if (
    Object.prototype.toString.call(arr).slice(8, -1) === "Array" &&
    typeof begin === "number" &&
    typeof end === "number"
  ) {
    if (begin < end) {
      let x = arr[end],
        i = begin - 1,
        temp;
      for (let j = begin; j <= end; j++) {
        if (arr[j] <= x) {
          i++;
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
      quickSort(arr, begin, i - 1);
      quickSort(arr, i + 1, end);
    }
    console.timeEnd("1.快速排序耗时");
    return arr;
  } else {
    return "array is not an Array or left or right is not a number!";
  }
}
export function quickSort2(arr) {
  console.time("2.快速排序耗时");
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.timeEnd("2.快速排序耗时");
  return quickSort2(left).concat([pivot], quickSort2(right));
}
/**
 * 插入排序
 * 从第一个元素开始，该元素可以认为已经被排序；
 * 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * 将新元素插入到该位置后；
 * 重复步骤2~5。
 * @param {Array<number>} arr
 */
export function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let key = arr[i];
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
/**
 * 选择排序
 * 工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 以此类推，直到所有元素均排序完毕
 * @param {Array<number>} arr
 */
export function selectSort(arr) {
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    let tmp = arr[i];
    arr[i] = arr[min];
    arr[min] = tmp;
  }
}
/**
 * 冒泡排序
 */
export function bubleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }
    }
  }
  return arr;
}
