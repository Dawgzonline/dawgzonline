import React from 'react';
import Image from 'next/image';
import styles from "../styles/Maintenance.module.scss";

export default function MaintenancePage() {
    return (
        <div className={styles.container}>
            <div className={styles.photo}>
                <Image alt="Site under maintenance" layout='responsive' width="1000" height="1000" src="/WebsiteUnderMaintenance.png" />
            </div>
            
        </div>
    )
}
