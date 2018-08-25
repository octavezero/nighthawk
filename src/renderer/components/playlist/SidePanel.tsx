import * as React from 'react';
import { AppStoreConsumer } from '../../stores/AppContext';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { Icon } from '../elements/Icon';
import { EditableTextbox } from '../elements/EditableTextbox';
import AppStore from '../../stores/AppStore';

interface SidePanelProps {}

interface SidePanelState {}

export default class SidePanel extends React.Component<
    SidePanelProps,
    SidePanelState
> {
    constructor(props: SidePanelProps) {
        super(props);
    }

    render() {
        return (
            <AppStoreConsumer>
                {store => (
                    <div className="details">
                        <div className="panel">
                            <h6>Playlists</h6>
                            <ButtonGroup>
                                <Button
                                    type="link"
                                    icon={true}
                                    onClick={() =>
                                        store.playlist.addNewPlaylist()
                                    }>
                                    <Icon icon="plus" />
                                </Button>
                                <Button type="link" icon={true}>
                                    <Icon icon="minus" />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="list">
                            {store.state.playlist.playlists.map(
                                (obj, index) => (
                                    <div
                                        onClick={() =>
                                            store.playlist.changeActivePlaylist(
                                                index
                                            )
                                        }
                                        key={index}
                                        className={
                                            index ===
                                            store.state.playlist.currentId
                                                ? 'list-row current'
                                                : 'list-row'
                                        }>
                                        <EditableTextbox
                                            text={obj.name}
                                            onChange={(value: string) =>
                                                store.playlist.renamePlaylist(
                                                    index,
                                                    value
                                                )
                                            }
                                            editable={obj.type === 'normal'}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
