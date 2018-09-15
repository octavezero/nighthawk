import * as React from 'react';
import { AppStoreConsumer } from '../../stores/AppContext';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { Icon } from '../elements/Icon';
import { EditableTextbox } from '../elements/EditableTextbox';
import AppStore from '../../stores/AppStore';
import { MessageBox } from '../elements/MessageBox';

interface SidePanelProps {
    store: AppStore;
}

interface SidePanelState {}

export default class SidePanel extends React.Component<
    SidePanelProps,
    SidePanelState
> {
    messageBoxRef: React.RefObject<MessageBox>;

    constructor(props: SidePanelProps) {
        super(props);

        this.messageBoxRef = React.createRef<MessageBox>();
    }

    showDeleteMessageBox = () => {
        if (this.props.store.state.playlist.currentPlaylist.type === 'normal') {
            this.messageBoxRef.current.open();
        }
    };

    confirmDelete = (action: string) => {
        if (action === 'yes') {
            this.props.store.playlist.deletePlaylist();
        }
    };

    render() {
        return (
            <div className="details">
                <MessageBox
                    ref={this.messageBoxRef}
                    heading="Delete Playlist?"
                    message="Delete Selected Playlist?"
                    actionPerformed={this.confirmDelete}
                />
                <div className="panel">
                    <h6>Playlists</h6>
                    <ButtonGroup>
                        <Button
                            data-rh="Add New Playlist"
                            data-rh-at="bottom"
                            type="link"
                            icon={true}
                            onClick={() =>
                                this.props.store.playlist.addNewPlaylist()
                            }>
                            <Icon icon="plus" />
                        </Button>
                        <Button
                            data-rh="Delete Current Playlist"
                            data-rh-at="bottom"
                            type="link"
                            icon={true}
                            onClick={this.showDeleteMessageBox}>
                            <Icon icon="minus" />
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="list">
                    {this.props.store.state.playlist.playlists.map(
                        (obj, index) => (
                            <div
                                onClick={() =>
                                    this.props.store.playlist.changeActivePlaylist(
                                        index
                                    )
                                }
                                key={index}
                                className={
                                    index ===
                                    this.props.store.state.playlist.currentIndex
                                        ? 'list-row current'
                                        : 'list-row'
                                }>
                                <EditableTextbox
                                    text={obj.name}
                                    onChange={(value: string) =>
                                        this.props.store.playlist.renamePlaylist(
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
        );
    }
}
