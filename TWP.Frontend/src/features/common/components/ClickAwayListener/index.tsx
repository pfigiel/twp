import { ReactElement } from "react";
import ReactClickAwayListener from "react-click-away-listener";

interface Props {
    children: ReactElement;
    onClickAway: () => void;
}

const ClickAwayListener = ({ children, onClickAway }: Props) => (
    <ReactClickAwayListener onClickAway={onClickAway}>{children}</ReactClickAwayListener>
);

export default ClickAwayListener;
