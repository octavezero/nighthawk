import * as React from 'react';
import { ButtonGroup } from '../elements/buttongroup';
import { Button } from '../elements/button';
import { Icon } from '../elements/Icon';
import Slider from '../elements/Slider';

export interface ControlsProps {}

export default class Controls extends React.Component<ControlsProps, any> {
    constructor(props: ControlsProps) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="controls">
                    <ButtonGroup>
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="skip-previous" />
                        </Button>
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="play" />
                        </Button>
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="skip-next" />
                        </Button>
                    </ButtonGroup>
                    <div className="seekbar">
                        <span>00:00</span>
                        <Slider min={0} max={100} value={50} />
                        <span>05:36</span>
                    </div>
                    <ButtonGroup>
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="repeat" />
                        </Button>
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="shuffle" />
                        </Button>
                    </ButtonGroup>
                    <div className="volume">
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="volume-high" />
                        </Button>
                        <Slider min={0} max={10} value={6} />
                    </div>
                </div>
            </>
        );
    }
}
