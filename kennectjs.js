const container = document.getElementById('container');
let bars = [];

// Function to generate bars with numbers
function generateBars() {
  container.innerHTML = '';
  for (let i = 1; i <= 50; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${i * 5}px`;
    bar.textContent = i;
    container.appendChild(bar);
    bars.push(bar);
  }
}

// Randomize the array of bars and numbers
function randomizeArray() {
  bars.sort(() => Math.random() - 0.5);
  arrangeBars();
}

// Sort using Insertion Sort
function insertionSort() {
  for (let i = 1; i < bars.length; i++) {
    let currentBar = bars[i];
    let j = i - 1;
    while (j >= 0 && +bars[j].textContent > +currentBar.textContent) {
      bars[j + 1] = bars[j];
      j--;
    }
    bars[j + 1] = currentBar;
  }
  arrangeBars();
}

// Sort using Selection Sort
function selectionSort() {
  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (+bars[j].textContent < +bars[minIdx].textContent) {
        minIdx = j;
      }
    }
    [bars[i], bars[minIdx]] = [bars[minIdx], bars[i]];
  }
  arrangeBars();
}

// Sort using Bubble Sort
function bubbleSort() {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < bars.length - 1; i++) {
      if (+bars[i].textContent > +bars[i + 1].textContent) {
        [bars[i], bars[i + 1]] = [bars[i + 1], bars[i]];
        swapped = true;
      }
    }
  } while (swapped);
  arrangeBars();
}

// Other sorting algorithms: Quick Sort, Merge Sort, Shell Sort

// Quick Sort implementation
function quickSort() {
  function partition(arr, low, high) {
    const pivot = arr[Math.floor((low + high) / 2)];
    let i = low;
    let j = high;

    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    return i;
  }

  function sort(arr, low, high) {
    if (arr.length > 1) {
      const index = partition(arr, low, high);
      if (low < index - 1) {
        sort(arr, low, index - 1);
      }
      if (index < high) {
        sort(arr, index, high);
      }
    }
    return arr;
  }

  const heights = bars.map(bar => parseInt(bar.style.height));
  const sortedHeights = sort(heights, 0, heights.length - 1);

  bars.forEach((bar, index) => {
    bar.style.height = `${sortedHeights[index]}px`;
    bar.textContent = sortedHeights[index] / 5;
  });
}

// Merge Sort implementation
function mergeSort() {
  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }

  function sort(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      sort(arr, left, mid);
      sort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }

  const heights = bars.map(bar => parseInt(bar.style.height));
  sort(heights, 0, heights.length - 1);

  bars.forEach((bar, index) => {
    bar.style.height = `${heights[index]}px`;
    bar.textContent = heights[index] / 5;
  });
}

// Shell Sort implementation
function shellSort() {
  const n = bars.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = parseInt(bars[i].style.height);
      let j = i;
      while (j >= gap && parseInt(bars[j - gap].style.height) > temp) {
        bars[j].style.height = bars[j - gap].style.height;
        bars[j].textContent = parseInt(bars[j - gap].style.height) / 5;
        j -= gap;
      }
      bars[j].style.height = `${temp}px`;
      bars[j].textContent = temp / 5;
    }
    gap = Math.floor(gap / 2);
  }
}



// Function to arrange bars in the container
function arrangeBars() {
  container.innerHTML = '';
  bars.forEach(bar => container.appendChild(bar));
}

generateBars(); // Generate bars initially

function reduceSize() {
  bars.forEach(bar => {
    // Get the current height of the bar
    const currentHeight = parseInt(bar.style.height, 10);
    // Reduce the height by a certain value (e.g., 10 pixels)
    const reducedHeight = currentHeight - 10; // Change this value to adjust the reduction amount
    // Ensure the reduced height is not less than a minimum value (e.g., 5 pixels)
    bar.style.height = `${Math.max(reducedHeight, 5)}px`;
  });
}