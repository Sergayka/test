import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/spinner/spinner.jsx';
import style from './main.module.scss';
import { motion } from 'framer-motion';

const Main = () => {
    const [fetchdata, setFetchdata] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch("http://79.174.80.113/api/universities")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные данные:', data); // Выводим все полученные данные в консоль
            setFetchdata(data);
            setLoad(false);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            setLoad(false);
        });
    }, []);

    const blockAnimate = {
        hidden: {
            y: 100,
            opacity: 0,
        },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.5 },
        })
    };

    const inDefindFaculty = (department) => {
        localStorage.setItem('nameFculty', JSON.stringify(department.name));
    };

    return (
        <motion.main
          initial='hidden'
          animate='visible'
          className={style.main}
        >
            {load ? (
                <Spinner />
            ) : (
                fetchdata.length > 0 ? (
                    fetchdata.map((department, index) => {
                        console.log(`Department ${index + 1} URL:`, department); // Выводим значение urlImg в консоль
                        return (
                            <motion.section
                              custom={index}
                              variants={blockAnimate}
                              initial='hidden'
                              animate='visible'
                              key={department.id || index}
                            >
                                <div className={style.containerNewQuiz}>
                                    <div className={style.logo}>
                                        <img src={`http://79.174.80.113/${department.urlImg}`} alt="logo university" />
                                    </div>
                                    <div className={style.wrapper}>
                                        <div className={style.description}>
                                            <h2>{department.full_name}</h2>
                                            <a href={department.url} target="_blank" rel="noopener noreferrer">
                                                <p className={style.parOne}>{department.description}</p>
                                                <p className={style.parTwo}>Узнать о вузе</p>
                                            </a>
                                        </div>
                                        <div className={style.containerButton}>
                                            <Link to='/quiz' className={style.containerButtonLink} onClick={() => inDefindFaculty(department)}>
                                                Пройти тест
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        );
                    })
                ) : (
                    <p>No data available</p>
                )
            )}
        </motion.main>
    );
};

export default Main;
