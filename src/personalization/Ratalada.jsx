import React from 'react';

class Ratalada extends React.Component {
  renderFloatText = () => (
    <div className="RataAlada-board">
      <h3 className="primeiro">
        {'>> THERE YOU ARE. LET\'S PLAY, JUST YOU AND ME. IS READY?'}
      </h3>
      <h3 className="segundo">
        {' >> PROCEED? [CLICK PLAY / CLOSE THE PAGE]'}
      </h3>
    </div>

  );

  render() {
    return (
      this.renderFloatText()
    );
  }
}

export default Ratalada;
