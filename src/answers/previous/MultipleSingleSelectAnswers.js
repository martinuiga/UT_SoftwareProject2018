import React from 'react';
import { countBy } from 'ramda';
import PropTypes from 'prop-types';
import { BarChart, XAxis, Tooltip, Bar } from 'recharts';
import { Subheader } from 'material-ui';

class MultipleSingleSelectAnswers extends React.PureComponent {

  getAnswersOccurencesData = () => {
    const instances = countBy(answer => answer, this.props.answers);
    const data = [];
    Object.keys(instances).forEach(key => {
      data.push({ name: key, value: instances[key] });
    });
    return data;
  }

  render() {
    console.log('answers', this.props.answers);
    const data = this.getAnswersOccurencesData();
    return (
      <div style={{ marginTop: '10px' }}>
        <Subheader style={{ fontSize: '18px' }}>Varasemad vastused</Subheader>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" name="Valitud kordade arv" fill="#BDBDBD" />
        </BarChart>
      </div>
    );
  }
}

MultipleSingleSelectAnswers.propTypes = {
  answers: PropTypes.array.isRequired
};

export default MultipleSingleSelectAnswers;
