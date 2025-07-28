export function bubbleSort(array) {
    const anim = [];
    const a = array.slice();
    for (let i=0; i<a.length-1; i++) {
      for (let j=0; j<a.length-1; j++) {
        if (a[j] > a[j+1]) {
          anim.push([j, j+1, true]);
          [a[j], a[j+1]] = [a[j+1], a[j]];
        } else {
          anim.push([j, j+1, false]);
        }
      }
    }
    return anim;
  }