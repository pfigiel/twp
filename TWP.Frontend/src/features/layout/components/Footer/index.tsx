import styles from "./styles.module.scss";

const Footer = () => (
    <div className={styles["footer"]}>
        <div className={styles["footer__top-part"]}></div>
        <div className={styles["footer__bottom-part"]}>The Worship Project &copy; 2021</div>
    </div>
);

export default Footer;
