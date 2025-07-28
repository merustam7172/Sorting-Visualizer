export function MergeSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const aux = array.slice();
  const main = array.slice();
  mergeHelper(main, 0, main.length-1, aux, animations);
  return animations;
}

function mergeHelper(main, start, end, aux, animations) {
  if (start === end) return;
  const mid = Math.floor((start+end)/2);
  mergeHelper(aux, start, mid, main, animations);
  mergeHelper(aux, mid+1, end, main, animations);
  doMerge(main, start, mid, end, aux, animations);
}

function doMerge(main, start, mid, end, aux, animations) {
  let i=start, j=mid+1, k=start;
  while (i<=mid && j<=end) {
    animations.push({ type:'compare', i, j });
    animations.push({ type:'revert', i, j });
    if (aux[i] <= aux[j]) {
      animations.push({ type:'overwrite', index:k, value:aux[i] });
      main[k++] = aux[i++];
    } else {
      animations.push({ type:'overwrite', index:k, value:aux[j] });
      main[k++] = aux[j++];
    }
  }
  while (i<=mid) {
    animations.push({ type:'compare', i, j:i });
    animations.push({ type:'revert', i, j:i });
    animations.push({ type:'overwrite', index:k, value:aux[i] });
    main[k++] = aux[i++];
  }
  while (j<=end) {
    animations.push({ type:'compare', i:j, j });
    animations.push({ type:'revert', i:j, j });
    animations.push({ type:'overwrite', index:k, value:aux[j] });
    main[k++] = aux[j++];
  }
}