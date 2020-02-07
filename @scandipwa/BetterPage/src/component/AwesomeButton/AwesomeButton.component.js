import React, { PureComponent } from 'react';

import './AwesomeButton.style';

export class AwesomeButton extends PureComponent {
    flex() {
        alert('Behold my awesomeness!');
    }

    render() {
        return <button
                 onClick={ this.flex }
                 className="AwesomeButton"
               >
                   I am awesome.
               </button>
    }
}
