<template>
  <div class="app-container">
    <el-form
      :model="基本信息"
      :rules="基本信息rules"
      ref="基本信息"
      label-position="center"
      label-width="120px"
      size="mini"
    >
      <div class="cell">
        <div class="container">
          <h4 style="text-align: center">基本信息</h4>
          <el-row>
            <el-col :span="5">
              <el-form-item label="职工号" prop="职工号">
                <el-input v-model="基本信息.职工号"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单位" prop="单位">
                <el-select
                  v-model="基本信息.单位"
                  filterable
                  placeholder="输入搜索"
                >
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
            <el-col :span="4">
              <el-form-item label="姓名" prop="姓名">
                <el-input
                  v-model="基本信息.姓名"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
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
            <el-col :span="2">
              <el-button
                type="primary"
                :disabled="searchdisabled"
                size="mini"
                @click="search"
              >查找
              </el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="性别" prop="性别">
                <el-select v-model="基本信息.性别" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现任职务" label-width="180px">
                <el-input
                  v-model="基本信息.现任职务"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="进入本校时间" label-width="160px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="基本信息.进入本校时间"
                  style="width: 180px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="管理岗位等级">
                <el-select v-model="基本信息.管理岗位等级" placeholder="请选择">
                  <el-option
                    v-for="item in 管理岗位等级字典"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业技术职务（职称）" label-width="180px">
                <el-input
                  v-model="基本信息.专业技术职务职称"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业技术岗位等级" label-width="160px">
                <el-select
                  v-model="基本信息.专业技术岗位等级"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in 专业技术岗位等级字典"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <h4 style="text-align: center">审核情况</h4>
          <el-row>
            <el-col :span="4">
              <el-form-item label="初审人单位号" prop="初审人职工号">
                <el-input
                  v-model="基本信息.初审人职工号"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审人" prop="初审人">
                <el-input
                  v-model="基本信息.初审人"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审人单位" prop="初审人单位">
                <el-select
                  v-model="基本信息.初审人单位"
                  filterable
                  placeholder="输入搜索"
                >
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
            <el-col :span="5">
              <el-form-item label="初审时间" prop="初审时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="基本信息.初审时间"
                  style="width: 180px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审状态" prop="初审状态">
                <el-select v-model="基本信息.初审状态" style="width: 100px">
                  <el-option label="未初审" value="未初审"></el-option>
                  <el-option label="初审中" value="初审中"></el-option>
                  <el-option label="完成初审" value="完成初审"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="复审人单位号" prop="复审人职工号">
                <el-input
                  v-model="基本信息.复审人职工号"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审人" prop="复审人">
                <el-input
                  v-model="基本信息.复审人"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审人单位" prop="复审人单位">
                <el-select
                  v-model="基本信息.复审人单位"
                  filterable
                  placeholder="输入搜索"
                >
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
            <el-col :span="5">
              <el-form-item label="复审时间" prop="复审时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="基本信息.复审时间"
                  style="width: 180px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审状态" prop="复审状态">
                <el-select v-model="基本信息.复审状态" style="width: 100px">
                  <el-option label="未初审" value="未初审"></el-option>
                  <el-option label="初审中" value="初审中"></el-option>
                  <el-option label="完成初审" value="完成初审"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mytable">
            <el-table
              border
              :data="tableData"
              align="center"
              height="500px"
              style="width: 1000px"
              :cell-style="{ padding: '5px' }"
            >
              <el-table-column
                prop="审核项目"
                label="审核项目"
                align="center"
                width="300px"
              >
              </el-table-column>

              <el-table-column prop="存在问题" label="存在问题" class="cell">
              </el-table-column>
            </el-table>
          </div>
          <h4 style="text-align: center">审核中发现的有关问题及审核意见</h4>
          <el-row>
            <el-col :span="7">
              <el-form-item label="姓名" prop="姓名" style="width: 300px">
                <el-input
                  v-model="认定.姓名"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="工作单位及职务(职称)" prop="工作单位及职务">
                <el-input
                  v-model="认定.工作单位及职务"
                  style="width: 300px"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入审核中发现的有关问题及审核意见"
            v-model="认定.单位审核意见"
            style="margin-left: 100px; width: 1000px"
          ></el-input>
        </div>
      </div>
      <div class="mybottom" v-show="divshow">
        <el-form-item style="margin: 10px 10px 10px 400px">
          <el-button
            type="success"
            :disabled="commitdisabled"
            @click="saveOrUpdate"
            style="margin: 10px 10px 10px 0px"
          >提交
          </el-button
          >
          <el-button v-show="cancelshow" type="danger" @click="goback"
          >取消
          </el-button
          >
          <el-button @click="output">导出专项审核认定表</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import 基本信息 from "@/api/service/基本信息";
import 导出excel表 from "@/api/service/导出excel表";
import {
  getAccountRecord,
  putAccountRecord,
} from "@/api/service/干部人事档案专项审核认定表";
import {getAccountProblem} from "@/api/service/审核问题";

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
    // 定义初始化数据
    return {
      管理岗位等级字典: [
        "管理岗位一级",
        "管理岗位二级",
        "管理岗位三级",
        "管理岗位四级",
        "管理岗位五级",
        "管理岗位六级",
        "管理岗位七级",
        "管理岗位八级",
        "管理岗位九级",
        "管理岗位十级",
      ],
      专业技术岗位等级字典: [
        "专业技术岗位一级",
        "专业技术岗位二级",
        "专业技术岗位三级",
        "专业技术岗位四级",
        "专业技术岗位五级",
        "专业技术岗位六级",
        "专业技术岗位七级",
        "专业技术岗位八级",
        "专业技术岗位九级",
        "专业技术岗位十级",
      ],
      tableData: [
        {
          审核项目: "出生时间存在问题",
          存在问题: "",
        },
        {
          审核项目: "参加工作时间存在问题",
          存在问题: "",
        },
        {
          审核项目: "入党时间存在问题",
          存在问题: "",
        },
        {
          审核项目: "学历学位存在问题",
          存在问题: "",
        },
        {
          审核项目: "工作经历存在问题",
          存在问题: "",
        },
        {
          审核项目: "奖惩情况存在问题",
          存在问题: "",
        },
        {
          审核项目: "家庭主要成员存在问题",
          存在问题: "",
        },
        {
          审核项目: "审核问题及审核意见",
          存在问题: "",
        },
        {
          审核项目: "单位审核意见",
          存在问题: "",
        },
        {
          审核项目: "完整性问题汇总",
          存在问题: "",
        },
      ],
      查询条件: "0",
      单位字典: [
        // "建筑学院",
        // "机械工程学院",
        // "能源与环境学院",
        // "信息科学与工程学院",
        // "土木工程学院",
        // "电子科学与工程学院、微电子学院",
        // "数学学院",
        // "自动化学院",
        // "计算机科学与工程学院、软件学院",
        // "物理学院",
        // "生物科学与医学工程学院",
        // "材料科学与工程学院",
        // "人文学院",
        // "艺术学院",
        // "法学院",
        // "经济管理学院",
        // "电气工程学院",
        // "外国语学院",
        // "体育系",
        // "化学化工学院",
        // "交通学院",
        // "仪器科学与工程学院",
        // "医学院",
        // "公共卫生学院",
        // "马克思主义学院",
        // "海外教育学院",
        // "生命科学与技术学院",
        // "网络空间安全学院",
        // "吴健雄学院",
        // "建筑研究所",
        // "成贤学院",
        // "无锡分校",
        // "继续教育学院",
        // "图书馆",
        // "档案馆",
        // "东南大学学报(自然科学版)",
        // "东南大学学报(哲学社会科学版)",
        // "东南大学学报(医学版)",
        // "党委教师工作部(教师教学发展中心)",
        // "网络与信息中心",
        // "城市工程科学技术研究院",
        // "智能交通运输系统(ITS)研究中心",
        // "东南大学-南京通信技术研究院",
        // "东南大学医院",
        // "研究生院(党委研究生工作部)",
        // "党委办公室、党委统战部",
        // "党委组织部",
        // "党委宣传部",
        // "纪委办公室(监察处)",
        // "团委",
        // "工会",
        // "党委老干部处",
        // "机关党委",
        // "产业党工委",
        // "校长办公室",
        // "科研院",
        // "保密办公室",
        // "教务处",
        // "教务处/电子电工实验中心",
        // "教务处/教育技术中心",
        // "人事处",
        // "党委学工部(学生处)",
        // "财务处",
        // "社会科学处",
        // "丁家桥校区管理委员会",
        // "苏州校区管理委员会",
        // "四牌楼校区管理委员会",
        // "发展委员会",
        // "国际合作处(港澳台办公室)",
        // "党委发展规划与学科建设部、" + "发展规划与学科建设处(双一流建设办公室)",
        // "审计处",
        // "党委保卫部(保卫处)",
        // "实验室与设备管理处",
        // "东南大学大数据计算中心",
        // "东南大学分析测试中心",
        // "资产管理处(国有资产管理委员会办公室)",
        // "基本建设处",
        // "总务处",
        // "后勤党工委",
        // "江苏东南大学资产管理经营有限公司",
        // "东南大学脑科学与智能技术研究院",
        // "中华民族视觉形象研究基地",
        // "东南大学文化传媒与国际战略研究院",
        // "附属中大医院",
      ],
      考核结果字典: ["优秀"],
      searchdisabled: false,
      inputdisabled: false,
      isDisabled: false,
      cancelshow: false,
      divshow: false,
      commitdisabled: true,
      基本信息: {
        职工号: "",
        单位: "",
        姓名: "",
        性别: "",
        现任职务: "",
        管理岗位等级: "",
        专业技术职务职称: "",
        专业技术岗位等级: "",
        进入本校时间: "",
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
        审核问题及审核意见: "",
      },
      基本信息rules: {
        职工号: [
          {required: true, message: "请输入职工号", trigger: "blur"},
          {validator: checknumber, trigger: "blur"},
        ],
        单位: [{required: true, message: "请选择单位", trigger: "blur"}],
        姓名: [{required: true, message: "请输入姓名", trigger: "blur"}],
        性别: [{required: true, message: "请选择性别", trigger: "blur"}],
      },
      审核情况: {
        初审时间: new Date(),
        初审状态: "未审核",
      },
      认定: {
        姓名: "",
        工作单位及职务: "",
        单位审核意见: "",
      },
      审核情况rules: {
        初审人职工号: [
          {required: true, message: "请输入职工号", trigger: "blur"},
          {validator: checknumber, trigger: "blur"},
        ],
        复审人职工号: [
          {required: true, message: "请输入职工号", trigger: "blur"},
          {validator: checknumber, trigger: "blur"},
        ],
      }, //简历区域
      rules: {
        职工号: [
          {required: true, message: "请输入职工号", trigger: "blur"},
          {validator: checknumber, trigger: "blur"},
        ],
        单位: [{required: true, message: "请选择单位", trigger: "blur"}],
        姓名: [{required: true, message: "请输入姓名", trigger: "blur"}],
        性别: [{required: true, message: "请选择性别", trigger: "blur"}],
        birthDate: [{required: true, message: "请选择日期", trigger: "blur"}],
        birthIsTrue1: [{required: true, message: "请选择", trigger: "blur"}],
        birthIsTrue2: [{required: true, message: "请选择", trigger: "blur"}],
        birthIsTrue3: [{required: true, message: "请选择", trigger: "blur"}],
        birthIsTrue4: [{required: true, message: "请选择", trigger: "blur"}],
        workDate: [{required: true, message: "请选择日期", trigger: "blur"}],
        workIsTrue1: [{required: true, message: "请选择", trigger: "blur"}],
        workIsTrue2: [{required: true, message: "请选择", trigger: "blur"}],
        workIsTrue3: [{required: true, message: "请选择", trigger: "blur"}],
        partyDate: [{required: true, message: "请选择日期", trigger: "blur"}],
        chinaName: [{required: true, message: "必填", trigger: "blur"}],
        phone: [{required: true, message: "必填", trigger: "blur"}],
      },
    };
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
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("当前页面数据未保存，确定要离开？");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  created() {
    // 在页面渲染前调用methods中方法
    基本信息.getlist().then((response) => {
      this.单位字典 = response.data.单位字典;
      //console.log(this.单位字典);
    });
  },
  methods: {
    // 查找信息
    async saveOrUpdate() {
      const answer = window.confirm(
        "请确认初审与复审信息是否完善，确认后将提交"
      );
      if (answer) {
      } else {
        return;
      }
      if (this.基本信息.职工号 === "") {
        alert("请确认职工号是否填写正确");
      } else {
        var userres = await putAccountRecord(this.基本信息);
        if (userres.data.count === 0) {
          alert("查无此人，请先完善基本信息！");
        } else if (userres.data.count === 1) {
          this.$message({
            type: "success",
            message: "修改提交成功!",
          });
        } else {
          this.$message({
            type: "fail",
            message: "修改提交失败!",
          });
        }
      }
    },
    fullfill(res) {
      this.tableData[0].存在问题 = res.出生时间存在问题;
      this.tableData[1].存在问题 = res.参加工作时间存在问题;
      this.tableData[2].存在问题 = res.入党时间存在问题;
      this.tableData[3].存在问题 = res.学历学位存在问题;
      this.tableData[4].存在问题 = res.工作经历存在问题;
      this.tableData[5].存在问题 = res.奖惩情况存在问题;
      this.tableData[6].存在问题 = res.家庭主要成员存在问题;
      this.tableData[7].存在问题 = res.审核问题及审核意见;
      this.tableData[8].存在问题 = res.单位审核意见;
      // let sumProblem = res.完整性问题汇总;
      // sumProblem = sumProblem.split("\n");
      this.tableData[9].存在问题 = res.完整性问题汇总;
    },
    async search() {
      this.searchdisabled = true;
      this.inputdisabled = true;
      var param = {
        职工号: "",
        姓名: "",
        单位: "",
      };
      var resp;
      if (this.查询条件 === "0") {
        // 根据职工号、单位和姓名查询
        if (
          this.基本信息.职工号 === "" ||
          this.基本信息.单位 === "" ||
          this.基本信息.姓名 === ""
        ) {
          alert("请填写职工号、单位和姓名");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.基本信息.职工号;
          param.姓名 = this.基本信息.姓名;
          param.单位 = this.基本信息.单位;
          resp = await getAccountRecord(param);
        }
      } else if (this.查询条件 === "1") {
        // 只根据职工号查询
        if (this.基本信息.职工号 === "") {
          alert("请填写职工号");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.基本信息.职工号;
          param.姓名 = this.基本信息.姓名;
          param.单位 = this.基本信息.单位;
          resp = await getAccountRecord(param);
        }
      } else if (this.查询条件 === "2") {
        if (this.基本信息.单位 === "" || this.基本信息.姓名 === "") {
          alert("请填写单位和姓名");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.基本信息.职工号;
          param.姓名 = this.基本信息.姓名;
          param.单位 = this.基本信息.单位;
          resp = await getAccountRecord(param);
        }
      }
      //console.log(resp.data.count);
      var count = resp.data.count;
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
        this.基本信息 = resp.data.user;
        this.认定.姓名 = this.基本信息.姓名;
        this.认定.工作单位及职务 =
          this.基本信息.单位 +
          (this.基本信息.现任职务 === (null || "无")
            ? ""
            : this.基本信息.现任职务);
        var para = {
          职工号: "",
        };
        para.职工号 = this.基本信息.职工号;
        var prob = await getAccountProblem(para);
        var res = prob.data;
        var problem = res.problem;
        this.fullfill(problem);
        //console.log(problem);
        //this.calculate();
        this.divshow = true;
        this.$message({
          type: "success",
          message: "查询成功!",
        });
        this.cancelshow = true;
        this.commitdisabled = false;
      } else {
        alert('请以"职工号"或"姓名"加"单位"的组合进行查询');
        this.inputdisabled = false;
        this.searchdisabled = false;
      }
    },
    goback() {
      const answer = window.confirm(
        "请确认是否放弃更改"
      );
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
      Object.keys(this.基本信息).forEach((key) => (this.基本信息[key] = ""));
      this.commitdisabled = true;
      this.divshow = false;
    },
    output() {
      let idList = [];
      idList.push(this.基本信息.职工号);
      导出excel表
        .output4(idList)
        .then((response) => {
          const blob = new Blob([response]); // 把得到的结果用流对象转一下
          var a = document.createElement("a"); //创建一F个<a></a>标签
          a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
          a.download = "干部人事档案专项审核认定表-"+this.基本信息.单位+"-"+this.基本信息.姓名+".doc"; //设置文件名
          a.style.display = "none"; // 障眼法藏起来a标签
          document.body.appendChild(a); // 将a标签追加到文档对象中
          a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
          a.remove(); // 一次性的，用完就删除a标签
          this.$message({
            type: "success",
            message: "干部人事档案专项审核认定表导出成功",
          });
        })
        .catch((error) => {
          console.log("error", error); //这里会打印捕获的异常是什么，我这里是false
        });
    },
    //添加一行
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/baseCell";


.cell > .container {

  .note {
    margin-left: 10px;
    font-size: 13px;
    color: red;
  }

  .简历 {
    margin-left: 30px;
    font-size: 15px;
  }

  .mytable {
    box-shadow: 0 0 5px #cac6c6;
    float: left;
    width: 1000px;
    margin: 20px 200px 100px 100px;
  }

  /deep/ .el-table {
    .cell {
      white-space: pre-wrap;
    }
  }
}

.mybottom {
  float: left;
  width: 100%;
  margin: 15px auto;
}
</style>
