import React, { Component } from 'react';

import './ResizeTemplate.css';
import { Storage } from '../../services/LocalStorage';

interface IRecipeProps {
    useMinMaxHeight?: boolean,
    bottom: JSX.Element,
    maxBottomHeight?: string,
    minBottomHeight?: string,
    top: JSX.Element,
    id: string,
}

export class TwoRowsResizable extends Component<IRecipeProps> {

    state = { bottomHeight: 400 }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({}));
        this.setState({
            bottomHeight: Storage.getColumnsResizableSize(this.props.id),
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({}));
    }

    mouseMove = (event: any) => {
        this.setState({ bottomHeight: (window.innerHeight - event.pageY) - 20, });
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.pointerEvents = 'unset';
        Storage.setColumnsResizableSize(this.props.id, this.state.bottomHeight);
    }

    mouseDown = () => {
        window.document.body.style.pointerEvents = 'none';
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render() {
        const useMinMaxHeight = this.props.useMinMaxHeight !== undefined ? this.props.useMinMaxHeight : true

        return (
            <div className="flex1 display-block full-width full-height">
                <div className="full-width" style={{
                    maxHeight: useMinMaxHeight ? this.props.maxBottomHeight || '90%' : undefined,
                    minHeight: useMinMaxHeight ? this.props.minBottomHeight || '10%' : undefined,
                    height: (window.innerHeight - this.state.bottomHeight) - 60,
                }}>{this.props.top}</div>

                <hr className='hr' />

                <div className="full-width" style={{
                    height: this.state.bottomHeight,
                    maxHeight: useMinMaxHeight ? this.props.maxBottomHeight || '95%' : undefined,
                    minHeight: useMinMaxHeight ? this.props.minBottomHeight || '10%' : undefined,
                }}>
                    <div className="grabber-col-right-resize-y" onMouseDown={this.mouseDown} />
                    <div className="flex1 full-width">
                        {this.props.bottom}
                    </div>
                </div>
            </div>
        );
    }
}
