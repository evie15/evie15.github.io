import React from "react"
import { Checkbox } from 'antd'
import Revote from '../button';
import styles from './result.module.css'
import axios from "axios";
import { Component } from 'react';

// var student = []

class Result extends Component{
    state={
         student:[
            {voteId: 2, voteName: 'lisi', voteGender: 0, votePoli: 'test', voteInsti: 'test',votePoll:5}
        ]
    }
    componentDidMount(){
        axios({
            method:'post',//请求方式
            url:'http://43.140.197.15:8080/admin/getVoteResult',//请求地址
            params:'',//和url一起发送的数据（如get请求）
            data:'',//必要参数，
            // 自定义请求头
            }).then(
            res=>{
                 if(res.data.msg == 'success'){
                 }
                 else{
                    console.log('failed')
                 }
                this.setState({
                    student:res.data.data.students
                })
            })
        setInterval(() => {
            axios({
                method:'post',//请求方式
                url:'http://43.140.197.15:8080/admin/getVoteResult',//请求地址
                params:'',//和url一起发送的数据（如get请求）
                data:'',//必要参数，
                // 自定义请求头
                }).then(
                res=>{
                     if(res.data.msg == 'success'){
                     }
                     else{
                        console.log('failed')
                     }
                    this.setState({
                        student:res.data.data.students
                    })
                })
        }, 5000);
    }
    render(){
        var i = 0
        return (
            <div className={styles.result}>
                <table>
                    <tr>
                        <th style={{ WebkitBorderTopLeftRadius: 15 }}>选择再次投票</th>
                        <th>排名</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>政治面貌</th>
                        <th>学院</th>
                        <th style={{ WebkitBorderTopRightRadius: 15 }}>票数</th>
                    </tr>
                    {this.state.student.map(item => {
                        i++
                        let sex='男'
                        if(item.voteGender==0){
                          sex='女'
                        }
                        return (
                            <tr className={styles.student}>
                                <td>
                                    <input type='checkbox' name='student' key={item.id} data-id={item.id} />
                                </td>
                                <td>
                                    <span className={styles.message}>{i} </span>
                                </td>
                                <td>
                                    <span className={styles.message}>{item.voteName} </span>
                                </td>
                                <td>
                                    <span className={styles.message}>{sex} </span>
                                </td>
                                <td>
                                    <span className={styles.message}>{item.votePoli} </span>
                                </td>
                                <td>
                                    <span className={styles.message}>{item.voteInsti} </span>
                                </td>
                                <td>
                                    <span className={styles.message}>{item.votePoll} </span>
                                </td>
                            </tr>
                        )
                    })}
                    {/* <Revote></Revote> */}
                    <div className={styles.blank}></div>
                </table>
                
            </div>
        )
    }
}

export default Result
