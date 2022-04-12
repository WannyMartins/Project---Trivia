import React from 'react';

class Ratalada extends React.Component {
  renderFloatText = () => (
    <div className="RataAlada-board">
      <h3 className="primeiro">
        {' >> THERE YOU ARE. LET\'S PLAY A GAME, JUST ME AND YOU. YOU READY?'}
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
