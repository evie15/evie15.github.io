import React from "react";
import styles from './footer.module.css'
import Submit from '../button';
const Footer = (() => {
    return (
        <div className={styles.bottom}>
            <div className={styles.limit}>每人限投 <span className={styles.limitmark}>4</span> 票
            , 已投<span className={styles.limitmark}> 3 </span>票
            </div>
            <Submit></Submit>
        </div>
    )
})
export default Footer