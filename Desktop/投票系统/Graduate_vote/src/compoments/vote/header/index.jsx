import React from "react";
import styles from './header.module.css'
const Header = (() => {
    return (
        <div className={styles.top}>
            <img src="../public/photo/name.png" className={styles.name} srcset="" />
            <h3 className={styles.title}>研 支 团 招 募 投 票 系 统</h3>
        </div>
    )
})
export default Header