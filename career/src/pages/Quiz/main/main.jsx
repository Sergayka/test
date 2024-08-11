import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import style from './main.module.scss';
import Spinner from '../../../components/spinner/spinner';
import { startQuiz, newQuestion, newQuizFull } from './quizCheck';

const Main = ({ newQuiz = true }) => {
    const [startNewQuiz, setStartNewQuiz] = useState(newQuiz); 
    const [fetchData, setFetchData] = useState(null);
    const [load, setLoad] = useState(true);
    const [question, setQuestions] = useState(null);    
    const [procent, setProcent] = useState(0);
    const [result, setResult] = useState('');
    const [isResult, setIsResult] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const nameFaculty = JSON.parse(localStorage.getItem('nameFculty'));
                const response = await fetch(`http://127.0.0.1:5000/collectionOnName?nameColl=${nameFaculty}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                startQuiz(setQuestions, setStartNewQuiz, data)
                setFetchData(data);
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoad(false);
            }
        };

        fetchQuizData();
    }, []);

    useEffect(() => {
        if (!newQuiz) {
            setStartNewQuiz(newQuiz);
        }
    }, [newQuiz]);

    const number = [
        { num: 5, text: 'Очень подходит, сильно', custom: 1 },
        { num: 4, text: "Подходит, нормально", custom: 2 },
        { num: 3, text: "Средне(ние)", custom: 3 }, 
        { num: 2, text: "Не подходит, чуть ниже среднего", custom: 4 }, 
        { num: 1, text: 'Вообще не подходит, плохо', custom: 5 }
    ];

    const blockAnimate = {
        hidden: { y: 100, opacity: 0 },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.5 }
        })
    };

    const blockTextAnimate = {
        hidden: { y: 100, opacity: 0 },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.1 }
        })
    };

    return (
        <motion.main 
            key={startNewQuiz}  // Key here will force re-render and animation restart
            initial='hidden'
            animate='visible'
            custom={1}
            variants={blockAnimate}
            className={style.main}
        >
            {load ? (
                <Spinner />
            ) : isResult ? (
                <motion.div 
                key="result"
                variants={blockAnimate}
                initial='hidden'
                animate='visible'
                custom={1}
                className={style.containerQuiz}>
                    <div className={style.containerQuizwrapper}>
                        <h2 className={style.qestionHeaderResult}>Вам подойдет данная кафедра:</h2>
                    </div>
                    <div className={style.qestionIsResult}>
                        <h1>{result}</h1>
                    </div>
                    <div className={style.containerButton}>
                        <a 
                            className={style.containerButtonLink} 
                            onClick={() => newQuizFull(setIsResult, setProcent, setQuestions, setStartNewQuiz, fetchData)}
                        >
                            Попробовать еще раз
                        </a>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                key="quiz"
                custom={.5}
                variants={blockAnimate}
                initial='hidden'
                animate='visible'
                className={style.containerQuiz}>
                    <div className={style.progress}>
                        <div style={{ width: `${procent}%` }} className={style.progress__inner}></div>
                    </div>
                    <div className={style.containerQuizWrapper}>
                        <h2 className={style.qestionHeader}>{question}</h2>
                    </div>
                    <ul className={style.ul}>
                        {number.map(({ num, text, custom }) => (
                            <motion.li 
                                custom={custom}
                                variants={blockTextAnimate}
                                initial='hidden'
                                animate='visible'
                                key={num} 
                                onClick={() => newQuestion(setQuestions, num, question, setProcent, setResult, setIsResult)}
                            >
                                {num} - {text}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.main>
    );
};

export default Main;