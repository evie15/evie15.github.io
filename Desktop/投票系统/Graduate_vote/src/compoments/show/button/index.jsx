import React from "react"
import { Button } from 'antd'
import styles from './button.module.css'
const Revote = (() => {
    return (
        <div className={styles.submitContainer}>
            <Button className={styles.submit}
                type="primary"
                shape="round"
                size="large"
                block='true'
            >重 &nbsp; 新 &nbsp; 投 &nbsp; 票</Button>
        </div>

    )
})
export default Revote