export function selectionSort(array) {
    const anim = [];
    const a = array.slice();
    for (let i=0; i<a.length; i++) {
      let minIdx = i;
      for (let j=i+1; j<a.length; j++) {
        anim.push([i, j, false]);
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        anim.push([i, minIdx, true]);
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
      }
    }
    return anim;
  }