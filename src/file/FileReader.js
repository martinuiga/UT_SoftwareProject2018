export const readTextFile = file => {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        const allText = rawFile.responseText;
        console.log('allText: ', allText);
        this.setState({
          fundData: allText
        });
      }
    }
  };
  rawFile.send(null);
};

export const readRoppTxt = () => {
  readTextFile('../assets/files/ropp.txt');
};

export default FileReader;
