<template>
  <div class="app-container">
    <h4 style="text-align: center">专项审核材料完整性登记表</h4>
    <el-form
      :model="user"
      :rules="userrules"
      ref="user"
      label-position="center"
      label-width="120px"
      size="mini"
    >
      <h4 style="text-align: center">基本信息</h4>
      <el-row>
        <el-col :span="4">
          <el-form-item label="职工号" prop="职工号">
            <el-input v-model="user.职工号" :disabled="inputdisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="单位" prop="单位">
            <el-select v-model="user.单位" :disabled="inputdisabled">
              <el-option
                v-for="item in 单位字典"
                :key="item.单位"
                :label="item.单位"
                :value="item.单位"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="单位" prop="单位">
            <el-input v-model="user.单位" :disabled="inputdisabled" />
          </el-form-item>
        </el-col> -->
        <el-col :span="4">
          <el-form-item label="姓名" prop="姓名">
            <el-input
              v-model="user.姓名"
              :disabled="inputdisabled"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="查询条件">
            <el-select
              v-model="查询条件"
              placeholder="请选择"
              style="width: 130px"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="职工号" value="1"></el-option>
              <el-option label="单位和姓名" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" align="middle">
          <el-button
            type="primary"
            :disabled="searchdisabled"
            size="mini"
            @click="search"
          >查找</el-button
          >
          <el-button
            type="success"
            :disabled="commitdisabled"
            size="mini"
            @click="saveOrUpdate"
          >提交</el-button
          >
          <el-button
            type="danger"
            v-show="cancelshow"
            size="mini"
            @click="cancel"
          >放弃</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-form
      :model="user"
      :rules="rules"
      ref="user"
      label-position="center"
      label-width="120px"
      size="mini"
    >
      <div class="mytable" v-show="divshow">
        <el-container style="height: 850px">
          <el-main width="main" class="main">
            <el-table
              :data="tableData"
              :span-method="arraySpanMethod"
              :header-cell-style="headFirst"
              border
              align="center"
              height="500px"
              style="width: 1000px"
              :cell-style="{ padding: '5px' }"
            >
              <el-table-column
                label="审核项目及材料名称"
                align="center"
                width="180px"
              >
                <el-table-column prop="name" align="center" width="55px">
                </el-table-column>
                <el-table-column prop="data1"> </el-table-column>
                <el-table-column prop="data2"> </el-table-column>
              </el-table-column>
              <el-table-column
                prop="chose"
                align="center"
                label="选择"
                width="130px"
              >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.chose" size="mini">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                    <el-option label="不存在" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="problem" label="备注/存在问题">
                <template slot-scope="scope" size="mini">
                  <el-input
                    type="textarea"
                    :rows="1"
                    v-model="scope.row.problem"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="tableData2"
              :header-cell-style="headFirst"
              border
              align="center"
              style="width: 1000px"
              :row-style="{ height: '0px' }"
            >
              <el-table-column
                label="审核项目及材料名称"
                align="center"
                width="180px"
              >
                <el-table-column prop="name" align="center" width="50px">
                </el-table-column>
                <el-table-column prop="data"> </el-table-column>
              </el-table-column>
              <el-table-column prop="number" label="有(份数)" width="80px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.number"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="isNo" label="无/不存在" width="130px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isNo">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="problem" label="奖励或处分名称及时间">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    :rows="1"
                    v-model="scope.row.problem"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="output" style="margin: 5px 600px"
            >导出完整性登记表</el-button
            >
          </el-main>

          <el-aside padding="20px">
            <el-table
              :data="tableData3"
              :header-cell-style="headFirst"
              border
              align="center"
              style="width: 310px"
            >
              <el-table-column
                prop="problems"
                label="完整性问题汇总"
                width="295px"
              >
              </el-table-column>
            </el-table>
          </el-aside>
        </el-container>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  getIntegrityRecord,
  putIntegrityRecord,
} from "@/api/service/完整性登记表";
import {
  getIntegrityProblem,
  putIntegrityProblem,
} from "@/api/service/完整性问题";
import 基本信息 from "@/api/service/基本信息";
import 导出excel表 from "@/api/service/导出excel表";
export default {
  data() {
    var checknumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("职工号不能为空"));
      } else {
        var numReg = /^[0-9]{9}$/;
        if (!numReg.test(value)) {
          callback(new Error("职工号应为9位数字"));
        } else {
          callback();
        }
      }
    };
    return {
      基本信息: [],
      单位字典: [],
      查询条件: "0",
      user: {
        职工号: "",
        单位: "",
        姓名: "",
        //审核情况
        初审人职工号: "",
        初审人: "",
        初审人单位: "",
        初审时间: "",
        初审状态: "",
        复审人职工号: "",
        复审人: "",
        复审人单位: "",
        复审时间: "",
        复审状态: "",
        //完整性-履历材料
        干部履历表: "",
        //完整性-考核材料
        年度考核表: "",
        缺年度考核表年份: "",
        //完整性-本科
        本科高校招生报名登记表: "",
        本科同意录取: "",
        本科高校学生成绩表: "",
        本科高校毕业生登记表: "",
        本科同意毕业: "",
        本科毕业学位书: "",
        //完整性-硕士研究生
        硕士研究生登记表: "",
        硕士同意录取: "",
        硕士学习成绩表: "",
        毕业研究生登记表: "",
        授予硕士学位决定: "",
        硕士毕业学位复印件: "",
        硕士专家推荐表: "",
        //直播/硕博连读
        直博连读学籍异动情况: "",
        //同等学力申请硕士学位（无学历）
        同等学力国家统考科目成绩合格证书: "",
        同等学力国家组织的外语考试: "",
        同等学力学科综合水平全国统一考试: "",
        同等学力硕士学位课程进修成绩表: "",
        同等学力授予硕士学位的材料及决定: "",
        //博士研究生
        攻读博士研究生登记表: "",
        博士专家推荐书: "",
        博士研究生登记表: "",
        博士研究生成绩表: "",
        博士研究生毕业登记表: "",
        博士学位审批材料: "",
        授予博士学位决定: "",
        博士毕业学位复印件: "",
        //同等学力申请博士学位（无学历）
        同等学力博士学位课程进修成绩表: "",
        同等学力博士学位的材料及决定: "",
        //党校学历
        党校大学学员成绩表: "",
        党校大学毕业学员鉴定表: "",
        党校研究生毕业学员登记表: "",
        党校研究生答辩情况表: "",
        党校研究生政治思想情况鉴定表: "",
        党校研究生学员党性锻炼小结: "",
        军队院校学员学籍管理登记表1: "",
        军队毕业学员定职定级报告表: "",
        军队院校学员学籍管理登记表2: "",
        军队委培证明: "",
        //学历学位材料境外
        本科国外学历学位认证: "",
        本科国外学历学位复印件: "",
        硕士国外学历学位认证: "",
        硕士国外学历学位复印件: "",
        博士国外学历学位认证: "",
        博士国外学历学位复印件: "",
        //科研成果
        博士后进站申请表: "",
        博士后工作期满出站审批表: "",
        //职称职务材料
        中级职称评审表: "",
        中级聘用审批表: "",
        中级岗位晋级表: "",
        副高职称评审表: "",
        副高聘用审批表: "",
        副高岗位晋级表: "",
        正高职称评审表: "",
        正高聘用审批表: "",
        正高岗位晋级表: "",
        副科以上干部任免审批表: "",
        //入党材料
        入党志愿书: "",
        入党申请书: "",
        入党转正申请书: "",
        a1985年党员登记表: "",
        a1990年党员登记表: "",
        //工作经历材料境内
        本科报到证: "",
        硕士报到证: "",
        博士报到证: "",
        首次劳动合同: "",
        转正定级审批表: "",
        招工登记表: "",
        上山下乡登记表: "",
        应征入伍登记表: "",
        部省属事业单位接收应届高校毕业生登记表: "",
        留学回国人员录用审批表: "",
        人员调动登记表: "",
        工资变动表: "",
        干部任免审批表: "",
        破格提拔和越级提拔的审批材料: "",
        转干审批表: "",
        专业审批表: "",
        公务员过渡审批表: "",
        公务员登记表: "",
        参照公务员法管理机关单位工作人员登记表: "",
        //变更材料
        更改参加工作时间: "",
        更改出生日期: "",
        //奖惩材料
        是否有奖励: "",
        是否有处分: "",
        奖励份数: "",
        处分份数: "",
        奖励材料登记: "",
        处分材料登记: "",
        //问题汇总
        完整性问题汇总: "",
      },
      userrules: {
        职工号: [
          { required: true, message: "请输入职工号", trigger: "blur" },
          { validator: checknumber, trigger: "blur" },
        ],
        单位: [{ required: true, message: "请选择单位", trigger: "blur" }],
        姓名: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        性别: [{ required: true, message: "请选择性别", trigger: "blur" }],
        民族: [{ required: true, message: "请填写民族", trigger: "blur" }],
      },
      problem: {
        职工号: "",
        履历材料: "",
        考核材料: "",
        学历学位材料境内本科: "",
        学历学位材料境内硕士: "",
        学历学位材料境内直博: "",
        学历学位材料境内同学力硕士: "",
        学历学位材料境内博士: "",
        学历学位材料境内同学力博士: "",
        党校学历大学: "",
        党校学历研究生: "",
        军队院校: "",
        军队函授: "",
        军队委托培养: "",
        学历学位材料境外本科: "",
        学历学位材料境外硕士: "",
        学历学位材料境外博士: "",
        //科研成果
        科研成果: "",
        //职称职务
        职称职务中级: "",
        职称职务副高: "",
        职称职务高级: "",
        职称职务干部任免审批: "",
        //入党材料
        入党材料入党志愿书: "",
        入党材料入党申请书: "",
        入党材料转正申请书: "",
        入党材料1985党员登记: "",
        入党材料1990党员登记: "",
        //工作经历境内
        工作境内本科: "",
        工作境内硕士: "",
        工作境内博士: "",
        工作境内劳动合同: "",
        工作境内转正定级审批: "",
        工作境内上山下乡: "",
        工作境内招工登记: "",
        工作境内应征入伍登记: "",
        工作境内毕业生登记: "",
        工作境内留学: "",
        工作境内人员调动: "",
        工作境内工资变动: "",
        工作境内干部任免: "",
        工作境内破格: "",
        工作境内转干审批: "",
        工作境内专业审批: "",
        工作境内公务员过渡审批: "",
        工作境内公务员登记: "",
        工作境内工作人员: "",
        //变更材料
        变更材料更改工作时间: "",
        变更材料更改出生日期: "",
      },
      rules: {},
      searchdisabled: false,
      commitdisabled: true,
      inputdisabled: false,
      divshow: false,
      cancelshow: false,
      tableData2: [
        {
          name: "奖励材料(七类)",
          data:
            "填写重要的奖励或记功、受处分的情况，主要为县处级以上奖励。记录在《干部（职工）基本信息审核表》内的奖励情况，" +
            "档案内必须有相关奖励材料附件。",
          number: "",
          isNo: "",
          problem: "",
        },
        {
          name: "处分材料(八类)",
          data:
            "受过处分的，要填写何年何月因何问题经何单位批准受何种处分等等。记录在《干部（职工）基本信息审核表》内的处分情况" +
            "，档案内必须有相关处分材料附件。",
          number: "",
          isNo: "",
          problem: "",
        },
      ],
      tableData3: [
        {
          problems: "",
        },
      ],
      tableData: [
        {
          name: "履历材料",
          data1: "《干部履历表》(必须有1999年版)(一类)",
          chose: "",
          problem: "",
        },
        {
          name: "考核材料",
          data1: "全部年度考核表(三类)" + "(最早自1994年起，备注未有年份)",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科(四-1类)",
          data2: "高校招生报名登记表（不同年代可能不同）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科",
          data2: "学生登记、学生卡片、学籍表、有“同意录取”字样的报考表等",
          chose: "",
          problem: "d",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科",
          data2: "高校学生成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科",
          data2: "高校毕业生登记表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科",
          data2: "本科毕业学位授予情况、有“同意毕业”“授予学士学位”字样的成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "本科",
          data2: "本科毕业证书、学位证书复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生(四-1类)",
          data2: "报考攻读硕士研究生登记表（不同年代可能不同）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "硕士研究生登记表、学籍表、有“同意录取”字样的报考表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "硕士研究生成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "毕业研究生登记表（直博生除外）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "授予硕士学位决定（直博生除外）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "单独考试的还应有专家推荐表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "硕士研究生",
          data2: "硕士毕业证书、学位证书复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "直博/硕博连读(四-1类)",
          data2: "学籍异动情况",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请硕士学位(无学历)(四-1类)",
          data2: "国家统考科目成绩合格证书（通知单）复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请硕士学位(无学历)(四-1类)",
          data2: "国家组织的外语考试（1995年开始）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请硕士学位(无学历)(四-1类)",
          data2: "学科综合水平全国统一考试（1999.9部分学科）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请硕士学位(无学历)(四-1类)",
          data2: "学位课程进修成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请硕士学位(无学历)(四-1类)",
          data2: "授予硕士学位的材料及决定",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生(四-1类)",
          data2: "报考攻读博士研究生登记表（直博生除外）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "专家推荐书（直博生除外）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "博士研究生登记表（学籍表）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "博士研究生成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "博士研究生毕业登记表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2:
            "博士学位审批材料（博士学位申请审批书、论文评议书、答辩委员会会议决议等）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "授予博士学位决定",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "博士研究生",
          data2: "博士毕业证书、学位证书复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请博士学位(无学历)(四-1类)",
          data2: "学位课程进修成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境内)(四-1类)",
          data1: "同等学力申请博士学位(无学历)(四-1类)",
          data2: "授予博士学位的材料及决定",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "大专、大学（四-1类）",
          data2: "学员成绩表",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "大专、大学（四-1类）",
          data2: "毕业学员（登记）鉴定表或学历证明",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "党校研究生(四-1类)",
          data2:
            "在职研究生（班）、研究生（考核）登记表或在职研究生班毕业学院登记表",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "党校研究生(四-1类)",
          data2: "毕业论文评审答辩情况表",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "党校研究生(四-1类)",
          data2: "毕业学院政治思想情况鉴定表",
          chose: "",
          problem: "",
        },
        {
          name: "党校学历",
          data1: "党校研究生(四-1类)",
          data2: "学员党性锻炼小结",
          chose: "",
          problem: "",
        },
        {
          name: "在军队院校取得的学历学位",
          data1:
            "地方普通中学、高校毕业生、士兵、军队干部考入军队院校并取得毕业证书和学位证书的\n" +
            "（四-1类）",
          data2: "军队院校学员学籍管理登记表",
          chose: "",
          problem: "",
        },
        {
          name: "在军队院校取得的学历学位",
          data1:
            "地方普通中学、高校毕业生、士兵、军队干部考入军队院校并取得毕业证书和学位证书的\n" +
            "（四-1类）",
          data2: "毕业学员定职定级报告表",
          chose: "",
          problem: "",
        },
        {
          name: "在军队院校取得的学历学位",
          data1:
            "士兵、军队干部参加军队院校函授学习，取得成人教育学历证书、学位证书的\n" +
            "（四-1类）",
          data2: "军队院校学员学籍管理登记表",
          chose: "",
          problem: "",
        },
        {
          name: "在军队院校取得的学历学位",
          data1: "地方人员参加军队院校成人委托培养教育的\n" + "（四-1类）",
          data2:
            "学历信息查询由教育部、解放军总参谋部军训部合适，并出具认证结果。",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "本科(四-1类)",
          data2: "教育部留服中心学历学位认证书 （2000年开始）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "本科(四-1类)",
          data2: "本科学历学位证书复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "硕士(四-1类)",
          data2: "教育部留服中心学历学位认证书 （2000年开始）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "硕士(四-1类)",
          data2: "硕士学历学位复印件",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "博士(四-1类)",
          data2: "教育部留服中心学历学位认证书 （2000年开始）",
          chose: "",
          problem: "",
        },
        {
          name: "学历学位材料(境外)",
          data1: "博士(四-1类)",
          data2: "博士学历学位复印件",
          chose: "",
          problem: "",
        },
        {
          name: "科研成果",
          data1: "博士后(四-3类)",
          data2: "博士后进站申请表",
          chose: "",
          problem: "",
        },
        {
          name: "科研成果",
          data1: "博士后(四-3类)",
          data2: "博士后工作期满出站审批表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "中级职称(四-2类)",
          data2: "专业技术职务任职资格评审表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "中级职称(四-2类)",
          data2: "专业技术岗位聘用审批表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "中级职称(四-2类)",
          data2: "专业技术岗位晋级申请表（仅岗位晋级教师有）",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "副高职称(四-2类)",
          data2: "专业技术职务任职资格评审表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "副高职称(四-2类)",
          data2: "专业技术岗位聘用审批表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "副高职称(四-2类)",
          data2: "专业技术岗位晋级申请表（仅岗位晋级教师有）",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "高级职称(四-2类)",
          data2: "专业技术职务任职资格评审表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "高级职称(四-2类)",
          data2: "专业技术岗位聘用审批表",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "高级职称(四-2类)",
          data2: "专业技术岗位晋级申请表（仅岗位晋级教师有）",
          chose: "",
          problem: "",
        },
        {
          name: "职称职务材料",
          data1: "干部任免审批表\n" + "（九-2类）",
          data2: "1997年以后任副科以上职务的必须有",
          chose: "",
          problem: "",
        },
        {
          name: "入党材料",
          data1: "《中国共产党入党志愿书》\n" + "（六-1类）",
          data2: "必须有",
          chose: "",
          problem: "",
        },
        {
          name: "入党材料",
          data1: "入党申请书（六-2类）",
          data2: "必须有",
          chose: "",
          problem: "",
        },
        {
          name: "入党材料",
          data1: "入党转正申请书（六-3类）",
          data2: "必须有",
          chose: "",
          problem: "",
        },
        {
          name: "入党材料",
          data1: "1985年党员登记表（六类）",
          data2: "1985年以前入党的必须有",
          chose: "",
          problem: "",
        },
        {
          name: "入党材料",
          data1: "1990年党员登记表（六类）",
          data2: "1990年以前入党的必须有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "本科（派遣证/报到证）\n" + "（十类）",
          data2: "仅本科毕业工作的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "硕士（派遣证/报到证）\n" + "（十类）",
          data2: "仅硕士毕业工作的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "博士（派遣证/报到证）\n" + "（十类）",
          data2: "仅博士毕业工作的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "首次劳动合同(十类)",
          data2: "如其首次就业在公司，则一般有，需补。",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "转正定级审批表\n" + "（九-1类）",
          data2: "仅大中专及本科毕业生工作满一年有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "招工登记表\n" + "（九-2类）",
          data2: "仅招工的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "上山下乡登记表\n" + "（九-2类或十类）",
          data2: "仅知青插队的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "应征入伍登记表\n" + "（九-2类）",
          data2: "仅应征入伍的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "部省属事业单位接收应届高校毕业生登记表\n" + "（九-2类）",
          data2: "仅应届毕业生进入事业编制的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "留学回国人员录用审批表\n" + "（九-2类）",
          data2: "仅留学回国人员进入事业编制的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "人员调动登记表\n" + "（九-2类）",
          data2: "仅人员调动进入事业编制的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "工资变动表\n" + "（九-1类）",
          data2: "1993年以来的工资变动表",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "干部任免审批表\n" + "（九-2类）",
          data2: "1997年以后任副科以上职务的必须有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "破格提拔和越级提拔的审批材料\n" + "（九-2类）",
          data2: "仅破格或越级提拔的有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "转干审批表\n" + "（九-2类）",
          data2: "仅工人转干有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "专业审批表\n" + "（九-2类）",
          data2: "仅军转干部有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "公务员过渡审批表（十类）",
          data2: "仅公务员有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "公务员登记表（十类）",
          data2: "仅公务员有",
          chose: "",
          problem: "",
        },
        {
          name: "工作经历材料(境内)",
          data1: "参照公务员法管理机关（单位）工作人员登记表（十类）",
          data2: "仅公务员有",
          chose: "",
          problem: "",
        },
        {
          name: "变更材料",
          data1: "更改参加工作时间(五类)",
          data2: "上级批复或确认其参加工作时间的材料",
          chose: "",
          problem: "",
        },
        {
          name: "变更材料",
          data1: "更改出生日期（2006年以前）\n" + "（五类）",
          data2: "个人申请、调查报告、证明材料、上级批复",
          chose: "",
          problem: "",
        },
      ],
    };
  },
  created() {
    // 在页面渲染前调用methods中方法
    基本信息.getlist().then((response) => {
      this.单位字典 = response.data.单位字典;
    });
  },
  mounted() {
    window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = "关闭提示";
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return "关闭提示";
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("当前页面数据未保存，确定要离开？");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
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
            colspan: 1,
          };
        } else if (rowIndex > 2 && rowIndex < 31) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 31) {
          return {
            rowspan: 6,
            colspan: 1,
          };
        } else if (rowIndex > 31 && rowIndex < 37) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 37) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex > 37 && rowIndex < 41) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 41) {
          return {
            rowspan: 6,
            colspan: 1,
          };
        } else if (rowIndex > 41 && rowIndex < 47) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 47) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 47 && rowIndex < 49) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 49) {
          return {
            rowspan: 10,
            colspan: 1,
          };
        } else if (rowIndex > 49 && rowIndex < 59) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 59) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else if (rowIndex > 59 && rowIndex < 64) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 64) {
          return {
            rowspan: 19,
            colspan: 1,
          };
        } else if (rowIndex > 64 && rowIndex < 83) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 83) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 83 && rowIndex < 85) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex === 2) {
        if (rowIndex === 80) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex > 80 && rowIndex < 83) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex === 1 || columnIndex === 4) {
        if (rowIndex === 2) {
          return {
            rowspan: 6,
            colspan: 1,
          };
        } else if (rowIndex > 2 && rowIndex < 8) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 8) {
          return {
            rowspan: 7,
            colspan: 1,
          };
        } else if (rowIndex > 8 && rowIndex < 15) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 16) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else if (rowIndex > 16 && rowIndex < 21) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 21) {
          return {
            rowspan: 8,
            colspan: 1,
          };
        } else if (rowIndex > 21 && rowIndex < 29) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 29) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 29 && rowIndex < 31) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 31) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 31 && rowIndex < 33) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 33) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex > 33 && rowIndex < 37) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 37) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 37 && rowIndex < 39) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 41) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 41 && rowIndex < 43) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 43) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 43 && rowIndex < 45) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 45) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 45 && rowIndex < 47) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 47) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex > 47 && rowIndex < 49) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 49) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex > 49 && rowIndex < 52) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 52) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex > 52 && rowIndex < 55) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        if (rowIndex === 55) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex > 55 && rowIndex < 58) {
          return {
            rowspan: 0,
            colspan: 0,
          };
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
    headFirst({ row, colunm, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
        return { display: "none" };
      }
      return "background:#f5f7fa";
    },
    async search() {
      this.searchdisabled = true;
      this.inputdisabled = true;
      var resp;
      var count;

      if (this.查询条件 === "0") {
        // 根据职工号、单位和姓名查询
        if (
          this.user.职工号 === "" ||
          this.user.单位 === "" ||
          this.user.姓名 === ""
        ) {
          alert("请填写职工号、单位和姓名");
          this.inputdisabled = false;
          this.searchdisabled = false;
          return;
        } else {
          resp = await getIntegrityRecord(this.user);
          count = resp.data.count;
        }
      } else if (this.查询条件 === "1") {
        // 只根据职工号查询
        if (this.user.职工号 === "") {
          alert("请填写职工号");
          this.inputdisabled = false;
          this.searchdisabled = false;
          return;
        } else {
          resp = await getIntegrityRecord(this.user);
          count = resp.data.count;
        }
      } else if (this.查询条件 === "2") {
        if (this.user.单位 === "" || this.user.姓名 === "") {
          alert("请填写单位和姓名");
          this.inputdisabled = false;
          this.searchdisabled = false;
          return;
        } else {
          resp = await getIntegrityRecord(this.user);
          count = resp.data.count;
        }
      }

      if (count === 0) {
        this.flush();
        alert("查无此人，请先完善基本信息");
        this.inputdisabled = false;
        this.searchdisabled = false;
      } else if (count > 1) {
        this.flush();
        alert('人员信息存在重复，请以"职工号"进行查询');
        this.inputdisabled = false;
        this.searchdisabled = false;
      } else if (count === 1) {
        var res = resp.data;
        this.user = res.user;
        const params = {
          职工号: this.user.职工号,
        };
        getIntegrityProblem(params).then((resp) => {
          var res = resp.data;
          this.problem = res.problem;
          this.fullfillproblem(res.problem);
        });
        this.fullfilluser(res.user);
        this.divshow = true;
        this.$message({
          type: "success",
          message: "查询成功!",
        });
        this.cancelshow = true;
      } else {
        alert('请以"职工号"或"姓名"加"单位"的组合进行查询');
        this.inputdisabled = false;
        this.searchdisabled = false;
      }
    },
    cancel() {
      const answer = window.confirm("请确认是否放弃更改");
      if (answer) {
      } else {
        return;
      }
      this.flush();
      this.searchdisabled = false;
      this.commitdisabled = true;
      this.cancelshow = false;
      this.inputdisabled = false;
    },
    flush() {
      this.tableData3[0].problems = "";
      Object.keys(this.user).forEach((key) => (this.user[key] = "")); //清空属性值没有返回值
      Object.keys(this.problem).forEach((key) => (this.problem[key] = ""));
      this.tableData.forEach((element) => {
        element.chose = "";
        element.problem = "";
      });
      this.tableData2.forEach((element) => {
        element.isNo = "";
        element.number = "";
        element.problem = "";
      });
      this.commitdisabled = true;
      this.divshow = false;
    },
    async saveOrUpdate() {
      const answer = window.confirm(
        "请确认初审与复审信息是否完善，确认后将提交"
      );
      if (answer) {
      } else {
        return;
      }
      if (this.user.职工号 === "") {
        alert("请确认职工号是否填写正确");
      } else {
        this.refill();
        var userres = await putIntegrityRecord(this.user);
        if (userres.data.count === 0) {
          alert("查无此人，请先完善基本信息！");
        } else {
          await putIntegrityProblem(this.problem);
          this.$message({
            type: "success",
            message: "修改提交成功!",
          });
        }
      }
    },
    fullfillproblem(res) {
      this.tableData[0].problem = res.履历材料;
      this.tableData[1].problem = res.考核材料;
      //学历学位材料
      this.tableData[2].problem = res.学历学位材料境内本科;
      this.tableData[8].problem = res.学历学位材料境内硕士;
      this.tableData[15].problem = res.学历学位材料境内直博;
      this.tableData[16].problem = res.学历学位材料境内同学力硕士;
      this.tableData[21].problem = res.学历学位材料境内博士;
      this.tableData[29].problem = res.学历学位材料境内同学力博士;
      //党校材料
      this.tableData[31].problem = res.党校学历大学;
      this.tableData[33].problem = res.党校学历研究生;
      //军队
      this.tableData[37].problem = res.军队院校;
      this.tableData[39].problem = res.军队函授;
      this.tableData[40].problem = res.军队委托培养;
      //学位学历材料境外
      this.tableData[41].problem = res.学历学位材料境外本科;
      this.tableData[43].problem = res.学历学位材料境外硕士;
      this.tableData[45].problem = res.学历学位材料境外博士;
      //科研成果
      this.tableData[47].problem = res.科研成果;
      //职称职务
      this.tableData[49].problem = res.职称职务中级;
      this.tableData[52].problem = res.职称职务副高;
      this.tableData[55].problem = res.职称职务高级;
      this.tableData[58].problem = res.职称职务干部任免审批;
      //入党材料
      this.tableData[59].problem = res.入党材料入党志愿书;
      this.tableData[60].problem = res.入党材料入党申请书;
      this.tableData[61].problem = res.入党材料转正申请书;
      this.tableData[62].problem = res.入党材料1985党员登记;
      this.tableData[63].problem = res.入党材料1990党员登记;
      //工作经历境内
      this.tableData[64].problem = res.工作境内本科;
      this.tableData[65].problem = res.工作境内硕士;
      this.tableData[66].problem = res.工作境内博士;
      this.tableData[67].problem = res.工作境内劳动合同;
      this.tableData[68].problem = res.工作境内转正定级审批;
      this.tableData[69].problem = res.工作境内招工登记;
      this.tableData[70].problem = res.工作境内上山下乡;
      this.tableData[71].problem = res.工作境内应征入伍登记;
      this.tableData[72].problem = res.工作境内毕业生登记;
      this.tableData[73].problem = res.工作境内留学;
      this.tableData[74].problem = res.工作境内人员调动;
      this.tableData[75].problem = res.工作境内工资变动;
      this.tableData[76].problem = res.工作境内干部任免;
      this.tableData[77].problem = res.工作境内破格;
      this.tableData[78].problem = res.工作境内转干审批;
      this.tableData[79].problem = res.工作境内专业审批;
      this.tableData[80].problem = res.工作境内公务员过渡审批;
      this.tableData[81].problem = res.工作境内公务员登记;
      this.tableData[82].problem = res.工作境内工作人员;
      //变更材料
      this.tableData[83].problem = res.变更材料更改工作时间;
      this.tableData[84].problem = res.变更材料更改出生日期;
      //this.problemsupdate();
    },
    problemsupdate() {
      this.tableData3[0].problems = "";
      this.tableData.forEach((element) => {
        if (element.problem != "") {
          this.tableData3[0].problems += element.problem;
          this.tableData3[0].problems += "\n";
        }
      });
    },
    fullfilluser(res) {
      //履历材料
      this.tableData[0].chose = res.干部履历表;
      //考核材料
      this.tableData[1].chose = res.年度考核表;
      //学历学位材料(境内)(四-1类)
      this.tableData[2].chose = res.本科高校招生报名登记表;
      this.tableData[3].chose = res.本科同意录取;
      this.tableData[4].chose = res.本科高校学生成绩表;
      this.tableData[5].chose = res.本科高校毕业生登记表;
      this.tableData[6].chose = res.本科同意毕业;
      this.tableData[7].chose = res.本科毕业学位书;
      this.tableData[8].chose = res.硕士研究生登记表;
      this.tableData[9].chose = res.硕士同意录取;
      this.tableData[10].chose = res.硕士学习成绩表;
      this.tableData[11].chose = res.毕业研究生登记表;
      this.tableData[12].chose = res.授予硕士学位决定;
      this.tableData[13].chose = res.硕士专家推荐表;
      this.tableData[14].chose = res.硕士毕业学位复印件;
      this.tableData[15].chose = res.直博连读学籍异动情况;
      this.tableData[16].chose = res.同等学力国家统考科目成绩合格证书;
      this.tableData[17].chose = res.同等学力国家组织的外语考试;
      this.tableData[18].chose = res.同等学力学科综合水平全国统一考试;
      this.tableData[19].chose = res.同等学力硕士学位课程进修成绩表;
      this.tableData[20].chose = res.同等学力授予硕士学位的材料及决定;
      this.tableData[21].chose = res.攻读博士研究生登记表;
      this.tableData[22].chose = res.博士专家推荐书;
      this.tableData[23].chose = res.博士研究生登记表;
      this.tableData[24].chose = res.博士研究生成绩表;
      this.tableData[25].chose = res.博士研究生毕业登记表;
      this.tableData[26].chose = res.博士学位审批材料;
      this.tableData[27].chose = res.授予博士学位决定;
      this.tableData[28].chose = res.博士毕业学位复印件;
      this.tableData[29].chose = res.同等学力博士学位课程进修成绩表;
      this.tableData[30].chose = res.同等学力博士学位的材料及决定;
      //党校学历
      this.tableData[31].chose = res.党校大学学员成绩表;
      this.tableData[32].chose = res.党校大学毕业学员鉴定表;
      this.tableData[33].chose = res.党校研究生毕业学员登记表;
      this.tableData[34].chose = res.党校研究生答辩情况表;
      this.tableData[35].chose = res.党校研究生政治思想情况鉴定表;
      this.tableData[36].chose = res.党校研究生学员党性锻炼小结;
      //在军队院校取得的学历学位
      this.tableData[37].chose = res.军队院校学员学籍管理登记表1;
      this.tableData[38].chose = res.军队毕业学员定职定级报告表;
      this.tableData[39].chose = res.军队院校学员学籍管理登记表2;
      this.tableData[40].chose = res.军队委培证明;
      //学历学位材料(境外)
      this.tableData[41].chose = res.本科国外学历学位认证;
      this.tableData[42].chose = res.本科国外学历学位复印件;
      this.tableData[43].chose = res.硕士国外学历学位认证;
      this.tableData[44].chose = res.硕士国外学历学位复印件;
      this.tableData[45].chose = res.博士国外学历学位认证;
      this.tableData[46].chose = res.博士国外学历学位复印件;
      //科研成果
      this.tableData[47].chose = res.博士后进站申请表;
      this.tableData[48].chose = res.博士后工作期满出站审批表;
      //职称职务材料
      this.tableData[49].chose = res.中级职称评审表;
      this.tableData[50].chose = res.中级聘用审批表;
      this.tableData[51].chose = res.中级岗位晋级表;
      this.tableData[52].chose = res.副高职称评审表;
      this.tableData[53].chose = res.副高聘用审批表;
      this.tableData[54].chose = res.副高岗位晋级表;
      this.tableData[55].chose = res.正高职称评审表;
      this.tableData[56].chose = res.正高聘用审批表;
      this.tableData[57].chose = res.正高岗位晋级表;
      this.tableData[58].chose = res.干部任免审批表;
      //入党材料
      this.tableData[59].chose = res.入党志愿书;
      this.tableData[60].chose = res.入党申请书;
      this.tableData[61].chose = res.入党转正申请书;
      this.tableData[62].chose = res.a1985年党员登记表;
      this.tableData[63].chose = res.a1990年党员登记表;
      //工作经历材料(境内)
      this.tableData[64].chose = res.本科报到证;
      this.tableData[65].chose = res.硕士报到证;
      this.tableData[66].chose = res.博士报到证;
      this.tableData[67].chose = res.首次劳动合同;
      this.tableData[68].chose = res.转正定级审批表;
      this.tableData[69].chose = res.招工登记表;
      this.tableData[70].chose = res.上山下乡登记表;
      this.tableData[71].chose = res.应征入伍登记表;
      this.tableData[72].chose = res.部省属事业单位接收应届高校毕业生登记表;
      this.tableData[73].chose = res.留学回国人员录用审批表;
      this.tableData[74].chose = res.人员调动登记表;
      this.tableData[75].chose = res.工资变动表;
      this.tableData[76].chose = res.干部任免审批表;
      this.tableData[77].chose = res.破格提拔和越级提拔的审批材料;
      this.tableData[78].chose = res.转干审批表;
      this.tableData[79].chose = res.专业审批表;
      this.tableData[80].chose = res.公务员过渡审批表;
      this.tableData[81].chose = res.公务员登记表;
      this.tableData[82].chose = res.参照公务员法管理机关单位工作人员登记表;
      //变更材料
      this.tableData[83].chose = res.更改参加工作时间;
      this.tableData[84].chose = res.更改出生日期;
      //审核项目及材料名称
      this.tableData2[0].isNo = res.是否有奖励;
      this.tableData2[1].isNo = res.是否有处分;
      this.tableData2[0].number = res.奖励份数;
      this.tableData2[1].number = res.处分份数;
      this.tableData2[0].problem = res.奖励材料登记;
      this.tableData2[1].problem = res.处分材料登记;
      this.tableData3[0].problems = res.完整性问题汇总;
      this.commitdisabled = false;
    },
    output() {
      let idList = [];
      idList.push(this.user.职工号);
      导出excel表
        .output(idList)
        .then((response) => {
          const blob = new Blob([response]); // 把得到的结果用流对象转一下
          var a = document.createElement("a"); //创建一F个<a></a>标签
          a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
          a.download = "完整性登记表-"+this.user.单位+"-"+this.user.姓名+".xlsx"; //设置文件名
          a.style.display = "none"; // 障眼法藏起来a标签
          document.body.appendChild(a); // 将a标签追加到文档对象中
          a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
          a.remove(); // 一次性的，用完就删除a标签
          this.$message({
            type: "success",
            message: "完整性登记表导出成功!",
          });
        })
        .catch((error) => {
          console.log("error", error); //这里会打印捕获的异常是什么，我这里是false
        });
    },
    refill() {
      //履历材料1项
      this.user.干部履历表 = this.tableData[0].chose;
      //考核材料1项
      this.user.年度考核表 = this.tableData[1].chose;
      this.user.本科高校招生报名登记表 = this.tableData[2].chose;
      this.user.本科同意录取 = this.tableData[3].chose;
      this.user.本科高校学生成绩表 = this.tableData[4].chose;
      this.user.本科高校毕业生登记表 = this.tableData[5].chose;
      this.user.本科同意毕业 = this.tableData[6].chose;
      this.user.本科毕业学位书 = this.tableData[7].chose;
      this.user.硕士研究生登记表 = this.tableData[8].chose;
      this.user.硕士同意录取 = this.tableData[9].chose;
      this.user.硕士学习成绩表 = this.tableData[10].chose;
      this.user.毕业研究生登记表 = this.tableData[11].chose;
      this.user.授予硕士学位决定 = this.tableData[12].chose;
      this.user.硕士专家推荐表 = this.tableData[13].chose;
      this.user.硕士毕业学位复印件 = this.tableData[14].chose;
      this.user.直博连读学籍异动情况 = this.tableData[15].chose;
      this.user.同等学力国家统考科目成绩合格证书 = this.tableData[16].chose;
      this.user.同等学力国家组织的外语考试 = this.tableData[17].chose;
      this.user.同等学力学科综合水平全国统一考试 = this.tableData[18].chose;
      this.user.同等学力硕士学位课程进修成绩表 = this.tableData[19].chose;
      this.user.同等学力授予硕士学位的材料及决定 = this.tableData[20].chose;
      this.user.攻读博士研究生登记表 = this.tableData[21].chose;
      this.user.博士专家推荐书 = this.tableData[22].chose;
      this.user.博士研究生登记表 = this.tableData[23].chose;
      this.user.博士研究生成绩表 = this.tableData[24].chose;
      this.user.博士研究生毕业登记表 = this.tableData[25].chose;
      this.user.博士学位审批材料 = this.tableData[26].chose;
      this.user.授予博士学位决定 = this.tableData[27].chose;
      this.user.博士毕业学位复印件 = this.tableData[28].chose;
      this.user.同等学力博士学位课程进修成绩表 = this.tableData[29].chose;
      this.user.同等学力博士学位的材料及决定 = this.tableData[30].chose;
      //党校学历
      this.user.党校大学学员成绩表 = this.tableData[31].chose;
      this.user.党校大学毕业学员鉴定表 = this.tableData[32].chose;
      this.user.党校研究生毕业学员登记表 = this.tableData[33].chose;
      this.user.党校研究生答辩情况表 = this.tableData[34].chose;
      this.user.党校研究生政治思想情况鉴定表 = this.tableData[35].chose;
      this.user.党校研究生学员党性锻炼小结 = this.tableData[36].chose;
      //在军队院校取得的学历学位
      this.user.军队院校学员学籍管理登记表1 = this.tableData[37].chose;
      this.user.军队毕业学员定职定级报告表 = this.tableData[38].chose;
      this.user.军队院校学员学籍管理登记表2 = this.tableData[39].chose;
      this.user.军队委培证明 = this.tableData[40].chose;
      //学历学位材料(境外)
      this.user.本科国外学历学位认证 = this.tableData[41].chose;
      this.user.本科国外学历学位复印件 = this.tableData[42].chose;
      this.user.硕士国外学历学位认证 = this.tableData[43].chose;
      this.user.硕士国外学历学位复印件 = this.tableData[44].chose;
      this.user.博士国外学历学位认证 = this.tableData[45].chose;
      this.user.博士国外学历学位复印件 = this.tableData[46].chose;
      //科研成果
      this.user.博士后进站申请表 = this.tableData[47].chose;
      this.user.博士后工作期满出站审批表 = this.tableData[48].chose;
      //职称职务材料
      this.user.中级职称评审表 = this.tableData[49].chose;
      this.user.中级聘用审批表 = this.tableData[50].chose;
      this.user.中级岗位晋级表 = this.tableData[51].chose;
      this.user.副高职称评审表 = this.tableData[52].chose;
      this.user.副高聘用审批表 = this.tableData[53].chose;
      this.user.副高岗位晋级表 = this.tableData[54].chose;
      this.user.正高职称评审表 = this.tableData[55].chose;
      this.user.正高聘用审批表 = this.tableData[56].chose;
      this.user.正高岗位晋级表 = this.tableData[57].chose;
      this.user.干部任免审批表 = this.tableData[58].chose;
      //入党材料
      this.user.入党志愿书 = this.tableData[59].chose;
      this.user.入党申请书 = this.tableData[60].chose;
      this.user.入党转正申请书 = this.tableData[61].chose;
      this.user.a1985年党员登记表 = this.tableData[62].chose;
      this.user.a1990年党员登记表 = this.tableData[63].chose;
      //工作经历材料(境内)
      this.user.本科报到证 = this.tableData[64].chose;
      this.user.硕士报到证 = this.tableData[65].chose;
      this.user.博士报到证 = this.tableData[66].chose;
      this.user.首次劳动合同 = this.tableData[67].chose;
      this.user.转正定级审批表 = this.tableData[68].chose;
      this.user.招工登记表 = this.tableData[69].chose;
      this.user.上山下乡登记表 = this.tableData[70].chose;
      this.user.应征入伍登记表 = this.tableData[71].chose;
      this.user.部省属事业单位接收应届高校毕业生登记表 =
        this.tableData[72].chose;
      this.user.留学回国人员录用审批表 = this.tableData[73].chose;
      this.user.人员调动登记表 = this.tableData[74].chose;
      this.user.工资变动表 = this.tableData[75].chose;
      this.user.干部任免审批表 = this.tableData[76].chose;
      this.user.破格提拔和越级提拔的审批材料 = this.tableData[77].chose;
      this.user.转干审批表 = this.tableData[78].chose;
      this.user.专业审批表 = this.tableData[79].chose;
      this.user.公务员过渡审批表 = this.tableData[80].chose;
      this.user.公务员登记表 = this.tableData[81].chose;
      this.user.参照公务员法管理机关单位工作人员登记表 =
        this.tableData[82].chose;
      //变更材料
      this.user.更改参加工作时间 = this.tableData[83].chose;
      this.user.更改出生日期 = this.tableData[84].chose;
      //审核项目及材料名称
      this.user.是否有奖励 = this.tableData2[0].isNo;
      this.user.是否有处分 = this.tableData2[1].isNo;
      this.user.奖励份数 = this.tableData2[0].number;
      this.user.处分份数 = this.tableData2[1].number;
      this.user.奖励材料登记 = this.tableData2[0].problem;
      this.user.处分材料登记 = this.tableData2[1].problem;
      //备注
      this.problem.职工号 = this.user.职工号;
      this.problem.履历材料 = this.tableData[0].problem;
      this.problem.考核材料 = this.tableData[1].problem; //学历学位材料
      this.problem.学历学位材料境内本科 = this.tableData[2].problem;
      this.problem.学历学位材料境内硕士 = this.tableData[8].problem;
      this.problem.学历学位材料境内直博 = this.tableData[15].problem;
      this.problem.学历学位材料境内同学力硕士 = this.tableData[16].problem;
      this.problem.学历学位材料境内博士 = this.tableData[21].problem;
      this.problem.学历学位材料境内同学力博士 = this.tableData[29].problem;
      //党校材料
      this.problem.党校学历大学 = this.tableData[31].problem;
      this.problem.党校学历研究生 = this.tableData[33].problem;
      //军队
      this.problem.军队院校 = this.tableData[37].problem;
      this.problem.军队函授 = this.tableData[39].problem;
      this.problem.军队委托培养 = this.tableData[40].problem;
      //学位学历材料境外
      this.problem.学历学位材料境外本科 = this.tableData[41].problem;
      this.problem.学历学位材料境外硕士 = this.tableData[43].problem;
      this.problem.学历学位材料境外博士 = this.tableData[45].problem;
      //科研成果
      this.problem.科研成果 = this.tableData[47].problem;
      //职称职务
      this.problem.职称职务中级 = this.tableData[49].problem;
      this.problem.职称职务副高 = this.tableData[52].problem;
      this.problem.职称职务高级 = this.tableData[55].problem;
      this.problem.职称职务干部任免审批 = this.tableData[58].problem;
      //入党材料
      this.problem.入党材料入党志愿书 = this.tableData[59].problem;
      this.problem.入党材料入党申请书 = this.tableData[60].problem;
      this.problem.入党材料转正申请书 = this.tableData[61].problem;
      this.problem.入党材料1985党员登记 = this.tableData[62].problem;
      this.problem.入党材料1990党员登记 = this.tableData[63].problem;
      //工作经历境内
      this.problem.工作境内本科 = this.tableData[64].problem;
      this.problem.工作境内硕士 = this.tableData[65].problem;
      this.problem.工作境内博士 = this.tableData[66].problem;
      this.problem.工作境内劳动合同 = this.tableData[67].problem;
      this.problem.工作境内转正定级审批 = this.tableData[68].problem;
      this.problem.工作境内招工登记 = this.tableData[69].problem;
      this.problem.工作境内上山下乡 = this.tableData[70].problem;
      this.problem.工作境内应征入伍登记 = this.tableData[71].problem;
      this.problem.工作境内毕业生登记 = this.tableData[72].problem;
      this.problem.工作境内留学 = this.tableData[73].problem;
      this.problem.工作境内人员调动 = this.tableData[74].problem;
      this.problem.工作境内工资变动 = this.tableData[75].problem;
      this.problem.工作境内干部任免 = this.tableData[76].problem;
      this.problem.工作境内破格 = this.tableData[77].problem;
      this.problem.工作境内转干审批 = this.tableData[78].problem;
      this.problem.工作境内专业审批 = this.tableData[79].problem;
      this.problem.工作境内公务员过渡审批 = this.tableData[80].problem;
      this.problem.工作境内公务员登记 = this.tableData[81].problem;
      this.problem.工作境内工作人员 = this.tableData[82].problem;
      //变更材料
      this.problem.变更材料更改工作时间 = this.tableData[83].problem;
      this.problem.变更材料更改出生日期 = this.tableData[84].problem;
      this.problemsupdate();
      this.user.完整性问题汇总 = this.tableData3[0].problems;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;

  .mytable {
    box-shadow: 0 0 5px #cac6c6;
    float: left;
    width: 1300px;
    margin: 20px 10px 20px;
  }

  /deep/.el-table .cell {
    white-space: pre-line; /*保留换行符*/
  }
  /deep/.el-table {
    .el-table {
      height: 500px;
    }
  }
}
</style>
