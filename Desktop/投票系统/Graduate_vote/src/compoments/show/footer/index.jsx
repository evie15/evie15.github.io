import React from "react";
import styles from './footer.module.css'
import Totalcount from "../totalcount/index"
const Footresult = (() => {
    return (
        <div className={styles.bottom}>
            <Totalcount></Totalcount>
        </div>
    )
})
export default Footresult