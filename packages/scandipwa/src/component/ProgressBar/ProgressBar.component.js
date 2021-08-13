import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import mark from './mark.svg';

import './ProgressBar.style'

class ProgressBar extends PureComponent {
    static propTypes = {
        titles: PropTypes.objectOf(PropTypes.string).isRequired,
        currentStep: PropTypes.number.isRequired,
        stepsCount: PropTypes.number.isRequired,
    };

    progressStartPart = 0;

    componentDidMount() {
        setTimeout(() => {
            this.progressStartPart = 1.5;
            this.forceUpdate();
        }, 0);
    }


    render() {
        const { titles, currentStep, stepsCount } = this.props;

        const numOfSpaces = stepsCount - 1;
        const progressStartPart = 1.5;
        const onePartLength = 1 / (numOfSpaces + progressStartPart * 2);
        const progress = currentStep === (stepsCount + 1) ? 1 : onePartLength * (this.progressStartPart + (currentStep - 1));
        const stepBarMargin = onePartLength * progressStartPart;
        const progressLineWidth = `${100 * progress}%`;
        const marginRight = `${100 * stepBarMargin}%`;
        const marginLeft = marginRight;
        const width = `${100 * (1 - stepBarMargin * 2)}%`;

        return (
            <div block="ProgressBar">
                <div block="ProgressBar" elem="BackgroundLine" />
                <div block="ProgressBar" elem="ProgressLine" style={{ width: progressLineWidth }} />
                <div block="ProgressBar" elem="StepBar" style={{ marginRight, marginLeft, width }}>
                    {Object.keys(titles).map((step) => (
                        <div key={titles[step]} block="ProgressBar" elem="ProgressStep">
                            <div block="ProgressBar" elem="StepNumber" mods={{ highlighted: currentStep >= step }}>
                                {currentStep > step ? <img src={mark} alt="completed" /> : step}
                            </div>
                            <div block="ProgressBar" elem="StepTitle" mods={{ highlighted: currentStep >= step }}>
                                {titles[step]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ProgressBar;
