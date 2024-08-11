import styles from './spinner.module.scss'
import React from 'react'

const spinner = () => {
    return (
        <span className={styles.loader}></span>
    )
}

export default spinner