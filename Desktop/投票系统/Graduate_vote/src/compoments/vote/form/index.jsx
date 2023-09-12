import React, { Component } from 'react';
import { Drawer } from 'antd'
import styles from './form.module.css'
import axios from 'axios'
var checkLimit = 3;

class Form extends Component {
  state = {
    student_list: [],
    checked_num: 0,
    students:[
      { "id": "1", "sex": "男", "identity": "预备党员", "name": '李益方', "school": "数学与统计学院" },
      { "id": "2", "sex": "女", "identity": "预备党员", "name": '王赫奇', "school": "文学院" },
      { "id": "3", "sex": "女", "identity": "共青团员", "name": '王曼茜', "school": "美术学院" },
      { "id": "4", "sex": "女", "identity": "预备党员", "name": '殷子惠', "school": "地理科学学院" },
      { "id": "5", "sex": "女", "identity": "共青团员", "name": '赫华', "school": "地理科学学院" },
      { "id": "6", "sex": "男", "identity": "预备党员", "name": '张传民', "school": "美术学院" },
      { "id": "7", "sex": "男", "identity": "预备党员", "name": '殷琪超', "school": "美术学院" },
      { "id": "8", "sex": "女", "identity": "预备党员", "name": '盛美玲', "school": "政法学院" },
      { "id": "9", "sex": "女", "identity": "预备党员", "name": '冯荃', "school": "心理学院" },
      { "id": "10", "sex": "女", "identity": "共青团员", "name": '杨雪娇', "school": "马克思主义学部" },
      { "id": "11", "sex": "女", "identity": "预备党员", "name": '赵梓欣', "school": "心理学院" },
      { "id": "12", "sex": "女", "identity": "共青团员", "name": '杨笑雨', "school": "外国语学院" }
    ]
  }
  // componentDidMount(){
  //   axios.get('http://43.140.197.15:8080/users').then(res=>{
  //     console.log(res.data.data.students,"====")
  //     checkLimit=res.data.data.limit
  //     console.log(checkLimit)
  //     this.setState((state) => {
  //       return {
  //         students:res.data.data.students
  //       }
  //     }, () => { console.log(this.state.students) })
  //   })
  // }
  // checked_num = e => {
  //   const q = e.target
  //   if (e.target.checked == false) {
  //     console.log(1)
  //     let list = this.state.student_list
  //     let value = e.target.dataset.id
  //     list.splice(list.indexOf(value), 1)
  //     this.setState((state) => {
  //       return {
  //         student_list: list,
  //         checked_num: state.checked_num - 1
  //       }
  //     }, () => { console.log(this.state.student_list) })
  //   } else if (this.state.checked_num >=checkLimit) {
  //     alert("选人到达上限")
  //     e.target.checked = false
  //   } else {
  //     this.choose(q)
  //   }
  // }
  // choose = q => {
  //   let list = this.state.student_list
  //   console.log(this.state.checked_num)
  //   list.push(q.dataset.id)
  //   this.setState((state) => {
  //     return {
  //       student_list: list,
  //       checked_num: state.checked_num + 1
  //     }
  //   }, () => { console.log(this.state.student_list) })
  // }
  render() {
    return (
      <div className={styles.form}>
        {/* <h1 className={styles.toptitle}>候 选 人 名 单</h1> */}
        {/* <div className={styles.limit}>每人限投 <span className={styles.limitmark}>{checkLimit}</span> 票</div> */}
        <div  className={styles.need}>
          <span className={styles.needtitle}>招募条件:</span>
          <p>
              1．具有我校学籍的全日制应届本科毕业生，并且不属于公费师范生以及定向、委托培养等招生时明确规定不得报考研究生的情形。申请研究生支教团的不可兼报校内外研究生推免和其他专项计划类推免。<br />
              2．具有高尚的爱国主义情操和集体主义精神，理想信念坚定，社会责任感强，诚实守信，学风端正，品行优良，积极向上。在校期间未受任何校纪处分，无任何考试作弊和剽窃他人学术成果记录。<br />
              3．完成截止第三学年（五年制为第四学年）应修的全部必修课程，不及格（重修及格的视为及格）或未修的不具备排名资格。<br />
              4．原则上，大类平台课、专业基础课、专业主干课等专业必修课平均学分绩点在专业中的排名不低于前30%；学校认定的基地班专业学生不受排名限制。<br />
              大学英语四级成绩在425分（含）以上，其它语种学生大学外语四级成绩需合格（仅限东北师范大学考点，其它考点无效）；或东北师范大学英语水平测试成绩达到70分(含)以上。
              体育类、艺术类学生申报研究生支教团的，其专业排名、外语水平等要求与申请所在学科普通类推免保持一致。<br />
              5．身心健康，能胜任西部地区基础教育志愿服务工作。<br />
              6．中共党员（含预备党员），获得中小学教师资格证或已报名参加2022年下半年中小学教师资格考试者，积极参加志愿服务、有志愿服务经历者，同等条件下可优先考虑。<br />
              7．其他相关事宜按照《东北师范大学推荐优秀应届本科毕业生免试攻读硕士学位研究生工作实施办法（修订）》执行。</p>
        </div>
        {/* 表头 */}
        <table>
              <tr className={styles.tablehead}>
                <th  style={{ WebkitBorderTopLeftRadius: 15 }}>序号</th>
                <th>学院</th>
                <th>姓名</th>
                <th>性别</th>
                <th>政治面貌</th>
                <th>学院排序</th>
                <th>面试排序</th>
                <th style={{ WebkitBorderTopRightRadius: 15 }}>是否同意</th>
             </tr>
          
          {this.state.students.map((item,index) => {
            let sex='男'
            if(item.voteGender==0){
              sex='女'
            }
            return (
              <tr className={styles.student}>
                <td>
                  <span className={styles.message}>{index+1} </span>
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
                  <span className={styles.message}> {item.voteInsti}</span>
                </td>
                <td></td>
                <td></td>
                <td>
                  <input type='checkbox' name='student' key={item.voteId} onClick={this.checked_num} data-id={item.voteId} />
                </td>
              </tr>
            )
          })}
          <div className={styles.blank}></div>
        </table>

      </div>
    );
  }
}
export default Form