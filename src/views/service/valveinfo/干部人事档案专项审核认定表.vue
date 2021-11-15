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
            <el-col :span="4">
              <el-form-item label="职工号" prop="职工号">
                <el-input v-model="基本信息.职工号" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位" prop="单位">
                <el-select
                  v-model="基本信息.单位"
                  filterable
                  placeholder="输入搜索"
                >
                  <el-option
                    v-for="item in 单位字典"
                    :key="item"
                    :label="item"
                    :value="item"
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
                >查找</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
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
                <el-input v-model="基本信息.进入本校时间"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
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
            <el-col :span="5">
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
      <div class="cell">
        <div class="container">
          <h4 style="text-align: center">审核情况</h4>
          <el-row>
            <el-col :span="4">
              <el-form-item label="初审人职工号" prop="初审人职工号">
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
              <el-form-item label="复审人职工号" prop="复审人职工号">
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
              align="center"
              height="500px"
              style="width: 1000px"
              :cell-style="{ padding: '5px' }"
            >
              <el-table-column label="审核项目" align="center" width="500px">
              </el-table-column>
              <el-table-column  label="存在问题">
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
              <el-form-item
                label="工作单位及职务(职称)"
                prop="工作单位及职务"
              >
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
      <div class="mybottom">
        <el-form-item style="margin: 10px 10px 10px 400px">
          <el-button
            type="primary"
            :disabled = "commitdisabled"
            @click="saveOrUpdate"
            style="margin: 10px 10px 10px 0px"
            >提交</el-button
          >
          <el-button v-show = "cancelshow" type="primary" @click="goback">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import 基本信息 from "@/api/service/基本信息";
import { getAccountRecord, putAccountRecord} from "@/api/service/干部人事档案专项审核认定表";
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
        职工号: "1",
        单位: "2",
        姓名: "3",
        性别: "4",
        现任职务: "5",
        管理岗位等级: "6",
        专业技术职务职称: "7",
        专业技术岗位等级: "8",
        进入本校时间: "9",
        初审人职工号: "0",
        初审人: "q",
        初审人单位: "w",
        初审时间: "e",
        初审状态: "r",
        复审人职工号: "t",
        复审人: "y",
        复审人单位: "u",
        复审时间: "i",
        复审状态: "o",
        审核问题及审核意见: "p",
      },
      基本信息rules: {
        职工号: [
          { required: true, message: "请输入职工号", trigger: "blur" },
          { validator: checknumber, trigger: "blur" },
        ],
        单位: [{ required: true, message: "请选择单位", trigger: "blur" }],
        姓名: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        性别: [{ required: true, message: "请选择性别", trigger: "blur" }],
        民族: [{ required: true, message: "请填写民族", trigger: "blur" }],
      },
      审核情况: {
        初审时间: new Date(),
        初审状态: "未审核",
      },
      认定: {
        姓名: "z",
        工作单位及职务: "x",
        单位审核意见: "c",
      },
      审核情况rules: {
        初审人职工号: [
          { required: true, message: "请输入职工号", trigger: "blur" },
          { validator: checknumber, trigger: "blur" },
        ],
        复审人职工号: [
          { required: true, message: "请输入职工号", trigger: "blur" },
          { validator: checknumber, trigger: "blur" },
        ],
      },
      textarea: "", //简历区域
      rules: {
        职工号: [
          { required: true, message: "请输入职工号", trigger: "blur" },
          { validator: checknumber, trigger: "blur" },
        ],
        单位: [{ required: true, message: "请选择单位", trigger: "blur" }],
        姓名: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        性别: [{ required: true, message: "请选择性别", trigger: "blur" }],
        民族: [{ required: true, message: "请填写民族", trigger: "blur" }],
        birthDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        birthIsTrue1: [{ required: true, message: "请选择", trigger: "blur" }],
        birthIsTrue2: [{ required: true, message: "请选择", trigger: "blur" }],
        birthIsTrue3: [{ required: true, message: "请选择", trigger: "blur" }],
        birthIsTrue4: [{ required: true, message: "请选择", trigger: "blur" }],
        workDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        workIsTrue1: [{ required: true, message: "请选择", trigger: "blur" }],
        workIsTrue2: [{ required: true, message: "请选择", trigger: "blur" }],
        workIsTrue3: [{ required: true, message: "请选择", trigger: "blur" }],
        partyDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        chinaName: [{ required: true, message: "必填", trigger: "blur" }],
        phone: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },

  mounted() {
  },
  created() {
    // 在页面渲染前调用methods中方法
    基本信息.getlist().then((response) => {
      this.单位字典 = response.data.单位字典;
      console.log(this.单位字典);
    });
  },
  methods: {
    // 查找信息
    async saveOrUpdate() {
      if (this.user.职工号 === "") {
        alert("请确认职工号是否填写正确");
      } else {
        var userres = await putInfoRecord(this.user);
        console.log(this.user.年龄);
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
      console.log(resp.data.count);
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
      this.flush();
      this.searchdisabled = false;
      this.commitdisabled = true;
      this.cancelshow = false;
      this.inputdisabled = false;
    },
    //添加一行
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cell {
  //background-color: #eceaea;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  background-clip: padding-box;
  float: left;
  margin: 15px auto;
  width: 1300px;
  box-shadow: 0 0 5px #cac6c6;

  .container {
    width: 100%;
    margin: 8px 15px 8px 0px;
    float: left;

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
  }
}

.mybottom {
  float: left;
  width: 100%;
  margin: 15px auto;
}
</style>
