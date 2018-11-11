import { concat } from 'ramda';

const readTextFile = (file) => {
  return fetch(file)
    .then(response => response.text())
    .then((data) => {
      return data.split('\n').filter(Boolean);
    });
};

export const getCurseWords = () => {
  return readTextFile('ropp.txt')
    .then(roppWords => readTextFile('big_bad.unique.txt')
      .then(bigBadWords => {
        return concat(roppWords, bigBadWords);
      }));
};

export default FileReader;
