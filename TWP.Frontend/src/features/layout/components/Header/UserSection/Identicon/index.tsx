import Identicons from "react-identicons";
import styles from "./styles.module.scss";

export interface Props {
    seed: string;
    size?: number;
}

const Identicon = ({ seed, size = 20 }: Props) => (
    <div className={styles["identicon"]}>
        <Identicons string={seed} size={size} />
    </div>
);

export default Identicon;
