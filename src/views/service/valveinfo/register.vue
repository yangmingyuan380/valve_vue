<template>
  <div class="app-container">
    <el-form :model="user" :rules="rules" ref="user" label-position="center" label-width="120px" size="mini">
      <h4 style="text-align:center">专项审核材料完整性登记表</h4>
      <el-row>
        <el-col :span="4">
          <el-form-item label="单位" prop="userID">
            <el-input v-model="user.userID"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="职工号" prop="userID">
            <el-input v-model="user.userID"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="user.userName" controls-position="right" :min="0"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="mytable">
        <el-table
          :data="tableData"
          :span-method="arraySpanMethod"
          :header-cell-style="headFirst"
          border
          align="center"
          height="500px"
          style="width: 1000px;" :cell-style="{padding: '5px'}">
          <el-table-column label="审核项目及材料名称" align="center" width="180px">
            <el-table-column prop="name" align="center" width="55px">
            </el-table-column>
            <el-table-column
              prop="data1">
            </el-table-column>
            <el-table-column
              prop="data2">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="chose"
            align="center"
            label="选择" width="130px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.chose" size="mini">
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="0"></el-option>
                <el-option label="不存在" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="problem"
            label="备注/存在问题">
            <template slot-scope="scope" size="mini">
              <el-input type="textarea" :rows="1" v-model="scope.row.problem"/>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData2"
          :header-cell-style="headFirst"
          border
          align="center"
          style="width: 1000px" :row-style="{height: '0px'}">
          <el-table-column label="审核项目及材料名称" align="center" width="180px">
            <el-table-column prop="name" align="center" width="50px">
            </el-table-column>
            <el-table-column
              prop="data">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="number"
            label="有(份数)" width="80px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="isNo"
            label="无/不存在" width="130px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.isNo">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="problem"
            label="奖励或处分名称及时间">
            <template slot-scope="scope">
              <el-input type="textarea" :rows="1" v-model="scope.row.problem"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      rules: {},
      tableData2: [{
        name: '奖励材料(七类)',
        data: '填写重要的奖励或记功、受处分的情况，主要为县处级以上奖励。记录在《干部（职工）基本信息审核表》内的奖励情况，' +
          '档案内必须有相关奖励材料附件。',
        number: '',
        isNo: '',
        problem: ''
      }, {
        name: '处分材料(八类)',
        data: '受过处分的，要填写何年何月因何问题经何单位批准受何种处分等等。记录在《干部（职工）基本信息审核表》内的处分情况' +
          '，档案内必须有相关处分材料附件。',
        number: '',
        isNo: '',
        problem: ''
      }],
      tableData: [{
        name: '履历材料',
        data1: '《干部履历表》(必须有1999年版)(一类)',
        chose: '',
        problem: ''
      }, {
        name: '考核材料',
        data1: '全部年度考核表(三类)' +
          '(最早自1994年起，备注未有年份)',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科(四-1类)',
        data2: '高校招生报名登记表（不同年代可能不同）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科',
        data2: '学生登记、学生卡片、学籍表、有“同意录取”字样的报考表等',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科',
        data2: '高校学生成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科',
        data2: '高校毕业生登记表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科',
        data2: '本科毕业学位授予情况、有“同意毕业”“授予学士学位”字样的成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '本科',
        data2: '本科毕业证书、学位证书复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生(四-1类)',
        data2: '报考攻读硕士研究生登记表（不同年代可能不同）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '硕士研究生登记表、学籍表、有“同意录取”字样的报考表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '硕士研究生成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '毕业研究生登记表（直博生除外）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '授予硕士学位决定（直博生除外）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '单独考试的还应有专家推荐表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '硕士研究生',
        data2: '硕士毕业证书、学位证书复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '直博/硕博连读(四-1类)',
        data2: '学籍异动情况',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请硕士学位(无学历)(四-1类)',
        data2: '国家统考科目成绩合格证书（通知单）复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请硕士学位(无学历)(四-1类)',
        data2: '国家组织的外语考试（1995年开始）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请硕士学位(无学历)(四-1类)',
        data2: '学科综合水平全国统一考试（1999.9部分学科）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请硕士学位(无学历)(四-1类)',
        data2: '学位课程进修成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请硕士学位(无学历)(四-1类)',
        data2: '授予硕士学位的材料及决定',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生(四-1类)',
        data2: '报考攻读博士研究生登记表（直博生除外）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '专家推荐书（直博生除外）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '博士研究生登记表（学籍表）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '博士研究生成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '博士研究生毕业登记表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '博士学位审批材料（博士学位申请审批书、论文评议书、答辩委员会会议决议等）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '授予博士学位决定',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '博士研究生',
        data2: '博士毕业证书、学位证书复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请博士学位(无学历)(四-1类)',
        data2: '学位课程进修成绩表',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境内)(四-1类)',
        data1: '同等学力申请博士学位(无学历)(四-1类)',
        data2: '授予博士学位的材料及决定',
        chose: '',
        problem: ''
      }, {
        name: '党校学历',
        data1: '大专、大学（四-1类）',
        data2: '学员成绩表',
        chose: '',
        problem: ''
      }, {
        name: '党校学历',
        data1: '大专、大学（四-1类）',
        data2: '毕业学员（登记）鉴定表或学历证明',
        chose: '',
        problem: '',
      }, {
        name: '党校学历',
        data1: '党校研究生(四-1类)',
        data2: '在职研究生（班）、研究生（考核）登记表或在职研究生班毕业学院登记表',
        chose: '',
        problem: '',
      }, {
        name: '党校学历',
        data1: '党校研究生(四-1类)',
        data2: '毕业论文评审答辩情况表',
        chose: '',
        problem: '',
      }, {
        name: '党校学历',
        data1: '党校研究生(四-1类)',
        data2: '毕业学院政治思想情况鉴定表',
        chose: '',
        problem: '',
      }, {
        name: '党校学历',
        data1: '党校研究生(四-1类)',
        data2: '学员党性锻炼小结',
        chose: '',
        problem: '',
      }, {
        name: '在军队院校取得的学历学位',
        data1: '地方普通中学、高校毕业生、士兵、军队干部考入军队院校并取得毕业证书和学位证书的\n' +
          '（四-1类）',
        data2: '军队院校学员学籍管理登记表',
        chose: '',
        problem: '',
      }, {
        name: '在军队院校取得的学历学位',
        data1: '地方普通中学、高校毕业生、士兵、军队干部考入军队院校并取得毕业证书和学位证书的\n' +
          '（四-1类）',
        data2: '毕业学员定职定级报告表',
        chose: '',
        problem: '',
      }, {
        name: '在军队院校取得的学历学位',
        data1: '士兵、军队干部参加军队院校函授学习，取得成人教育学历证书、学位证书的\n' +
          '（四-1类）',
        data2: '军队院校学员学籍管理登记表',
        chose: '',
        problem: ''
      }, {
        name: '在军队院校取得的学历学位',
        data1: '地方人员参加军队院校成人委托培养教育的\n' +
          '（四-1类）',
        data2: '学历信息查询由教育部、解放军总参谋部军训部合适，并出具认证结果。',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '本科(四-1类)',
        data2: '教育部留服中心学历学位认证书 （2000年开始）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '本科(四-1类)',
        data2: '本科学历学位证书复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '硕士(四-1类)',
        data2: '教育部留服中心学历学位认证书 （2000年开始）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '硕士(四-1类)',
        data2: '硕士学历学位复印件',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '博士(四-1类)',
        data2: '教育部留服中心学历学位认证书 （2000年开始）',
        chose: '',
        problem: ''
      }, {
        name: '学历学位材料(境外)',
        data1: '博士(四-1类)',
        data2: '博士学历学位复印件',
        chose: '',
        problem: ''
      }, {
        name: '科研成果',
        data1: '博士后(四-3类)',
        data2: '博士后进站申请表',
        chose: '',
        problem: ''
      }, {
        name: '科研成果',
        data1: '博士后(四-3类)',
        data2: '博士后工作期满出站审批表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '中级职称(四-2类)',
        data2: '专业技术职务任职资格评审表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '中级职称(四-2类)',
        data2: '专业技术岗位聘用审批表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '中级职称(四-2类)',
        data2: '专业技术岗位晋级申请表（仅岗位晋级教师有）',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '副高职称(四-2类)',
        data2: '专业技术职务任职资格评审表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '副高职称(四-2类)',
        data2: '专业技术岗位聘用审批表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '副高职称(四-2类)',
        data2: '专业技术岗位晋级申请表（仅岗位晋级教师有）',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '高级职称(四-2类)',
        data2: '专业技术职务任职资格评审表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '高级职称(四-2类)',
        data2: '专业技术岗位聘用审批表',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '高级职称(四-2类)',
        data2: '专业技术岗位晋级申请表（仅岗位晋级教师有）',
        chose: '',
        problem: ''
      }, {
        name: '职称职务材料',
        data1: '干部任免审批表\n' +
          '（九-2类）',
        data2: '1997年以后任副科以上职务的必须有',
        chose: '',
        problem: ''
      }, {
        name: '入党材料',
        data1: '《中国共产党入党志愿书》\n' +
          '（六-1类）',
        data2: '必须有',
        chose: '',
        problem: ''
      }, {
        name: '入党材料',
        data1: '入党申请书（六-2类）',
        data2: '必须有',
        chose: '',
        problem: ''
      }, {
        name: '入党材料',
        data1: '入党转正申请书（六-3类）',
        data2: '必须有',
        chose: '',
        problem: ''
      }, {
        name: '入党材料',
        data1: '1985年党员登记表（六类）',
        data2: '1985年以前入党的必须有',
        chose: '',
        problem: ''
      }, {
        name: '入党材料',
        data1: '1990年党员登记表（六类）',
        data2: '1990年以前入党的必须有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '本科（派遣证/报到证）\n' +
          '（十类）',
        data2: '仅本科毕业工作的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '硕士（派遣证/报到证）\n' +
          '（十类）',
        data2: '仅硕士毕业工作的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '博士（派遣证/报到证）\n' +
          '（十类）',
        data2: '仅博士毕业工作的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '首次劳动合同(十类)',
        data2: '如其首次就业在公司，则一般有，需补。',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '转正定级审批表\n' +
          '（九-1类）',
        data2: '仅大中专及本科毕业生工作满一年有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '招工登记表\n' +
          '（九-2类）',
        data2: '仅招工的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '上山下乡登记表\n' +
          '（九-2类或十类）',
        data2: '仅知青插队的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '应征入伍登记表\n' +
          '（九-2类）',
        data2: '仅应征入伍的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '部省属事业单位接收应届高校毕业生登记表\n' +
          '（九-2类）',
        data2: '仅应届毕业生进入事业编制的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '留学回国人员录用审批表\n' +
          '（九-2类）',
        data2: '仅留学回国人员进入事业编制的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '人员调动登记表\n' +
          '（九-2类）',
        data2: '仅人员调动进入事业编制的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '工资变动表\n' +
          '（九-1类）',
        data2: '1993年以来的工资变动表',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '干部任免审批表\n' +
          '（九-2类）',
        data2: '1997年以后任副科以上职务的必须有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '破格提拔和越级提拔的审批材料\n' +
          '（九-2类）',
        data2: '仅破格或越级提拔的有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '转干审批表\n' +
          '（九-2类）',
        data2: '仅工人转干有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '专业审批表\n' +
          '（九-2类）',
        data2: '仅军转干部有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '公务员过渡审批表（十类）',
        data2: '仅公务员有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '公务员登记表（十类）',
        data2: '仅公务员有',
        chose: '',
        problem: ''
      }, {
        name: '工作经历材料(境内)',
        data1: '参照公务员法管理机关（单位）工作人员登记表（十类）',
        data2: '仅公务员有',
        chose: '',
        problem: ''
      }, {
        name: '变更材料',
        data1: '更改参加工作时间(五类)',
        data2: '上级批复或确认其参加工作时间的材料',
        chose: '',
        problem: ''
      }, {
        name: '变更材料',
        data1: '更改出生日期（2006年以前）\n' +
          '（五类）',
        data2: '个人申请、调查报告、证明材料、上级批复',
        chose: '',
        problem: ''
      },]
    };
  },
  methods: {
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0 || rowIndex === 1) {
        if (columnIndex === 1) {
          return [1, 2];
        } else if (columnIndex === 2) {
          return [0, 0];
        }
      }
      if (columnIndex === 0) {
        if (rowIndex === 2) {
          return {
            rowspan: 29,
            colspan: 1
          }
        } else if (rowIndex > 2 && rowIndex < 31) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 31) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex > 31 && rowIndex < 37) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 37) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex > 37 && rowIndex < 41) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 41) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex > 41 && rowIndex < 47) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 47) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 47 && rowIndex < 49) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 49) {
          return {
            rowspan: 10,
            colspan: 1
          }
        } else if (rowIndex > 49 && rowIndex < 59) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 59) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex > 59 && rowIndex < 64) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 64) {
          return {
            rowspan: 19,
            colspan: 1
          }
        } else if (rowIndex > 64 && rowIndex < 83) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 83) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 83 && rowIndex < 85) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 2) {
        if (rowIndex === 80) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex > 80 && rowIndex < 83) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
          }
      if (columnIndex === 1 || columnIndex === 4) {
        if (rowIndex === 2) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else if (rowIndex > 2 && rowIndex < 8) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 8) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else if (rowIndex > 8 && rowIndex < 15) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 16) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex > 16 && rowIndex < 21) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 21) {
          return {
            rowspan: 8,
            colspan: 1
          }
        } else if (rowIndex > 21 && rowIndex < 29) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 29) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 29 && rowIndex < 31) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 31) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 31 && rowIndex < 33) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 33) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex > 33 && rowIndex < 37) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 37) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 37 && rowIndex < 39) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 41) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 41 && rowIndex < 43) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 43) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 43 && rowIndex < 45) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 45) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 45 && rowIndex < 47) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 47) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex > 47 && rowIndex < 49) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 49) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex > 49 && rowIndex < 52) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 52) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex > 52 && rowIndex < 55) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (rowIndex === 55) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else if (rowIndex > 55 && rowIndex < 58) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        // if (rowIndex === 58) {
        //   return {
        //     rowspan: 2,
        //     colspan: 1
        //   }
        // } else if (rowIndex > 58 && rowIndex < 60) {
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   }
        // }
      }
    },
    headFirst({row, colunm, rowIndex, columnIndex}) {
      if (rowIndex === 1) {
        //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return {display: 'none'}

      }
      return "background:#f5f7fa"
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;

  .mytable {
    box-shadow: 0 0 5px #cac6c6;
    float: left;
    width: 1000px;
    margin: 20px 200px 20px;
  }
}

</style>
