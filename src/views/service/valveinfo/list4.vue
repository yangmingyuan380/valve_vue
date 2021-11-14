<template>
  <div class="app-container">
    <el-form :model="基本信息" :rules="基本信息rules" ref="基本信息" label-position="center" label-width="120px" size="mini">
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">查询条件</h4>
          <el-row>
            <el-col :span="4">
              <el-form-item label="职工号" prop="职工号">
                <el-input v-model="基本信息.职工号"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单位" prop="单位">
                <el-select v-model="基本信息.单位" filterable clearable placeholder="输入以搜索" style="width: 250px">
                  <el-option
                    v-for="item in 单位字典"
                    :key="item.单位"
                    :label="item.单位"
                    :value="item.单位">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名" prop="姓名">
                <el-input v-model="基本信息.姓名" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别">
                <el-select v-model="基本信息.性别" clearable placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="民族">
                <el-input v-model="基本信息.民族" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="现任职务">
                <el-input v-model="基本信息.现任职务" controls-position="right" :min="0" style="width: 80px"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="管理岗位等级">
                <el-select v-model="基本信息.管理岗位等级" clearable style="width: 120px" placeholder="请选择">
                  <el-option
                    v-for="item in 管理岗位等级字典"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专业技术职务（职称）" label-width="180px">
                <el-input v-model="基本信息.专业技术职务职称" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专业技术岗位等级" label-width="160px">
                <el-select v-model="基本信息.专业技术岗位等级" clearable placeholder="请选择" style="width: 150px">
                  <el-option
                    v-for="item in 专业技术岗位等级字典"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="初审时间">
                <el-date-picker
                  v-model="初审时间"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审状态">
                <el-select v-model="基本信息.初审状态"style="width: 100px">
                  <el-option label="未初审" value="未初审"></el-option>
                  <el-option label="初审中" value="初审中"></el-option>
                  <el-option label="完成初审" value="完成初审"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审人" prop="初审人">
                <el-input v-model="基本信息.初审人" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="复审时间">
                <el-date-picker
                  v-model="复审时间"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审状态">
                <el-select v-model="基本信息.复审状态"style="width: 100px">
                  <el-option label="未复审" value="未复审"></el-option>
                  <el-option label="复审中" value="复审中"></el-option>
                  <el-option label="完成复审" value="完成复审"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审人" prop="复审人">
                <el-input v-model="基本信息.复审人" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:center">
            <el-button type="primary" plain size="medium" @click="getdata">查找</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="cell">
      <div class="container">
        <el-table
          :data="审核情况"
          border
          style="width: 1280px;margin: 10px">
          <af-table-column label="序号"
                           width="50">
            <template slot-scope="scope">
              {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
          </af-table-column>
          <af-table-column
            prop="单位"
            label="单位">
          </af-table-column>
          <af-table-column
            prop="职工号"
            label="职工号">
          </af-table-column>
          <af-table-column
            prop="姓名"
            label="姓名">
          </af-table-column>
          <af-table-column
            prop="初审状态"
            label="初审状态">
          </af-table-column>
          <af-table-column
            prop="初审时间"
            label="初审时间">
          </af-table-column>
          <af-table-column
            prop="初审人"
            label="初审人">
          </af-table-column>
          <af-table-column
            prop="复审状态"
            label="复审状态">
          </af-table-column>
          <af-table-column
            prop="复审时间"
            label="复审时间">
          </af-table-column>
          <af-table-column
            prop="复审人"
            label="复审人">
          </af-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="page"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getdata"
        />
      </div>
    </div>
  </div>
</template>

<script>
import 基本信息 from '@/api/service/基本信息'
import 审核情况一览表 from '@/api/service/审核情况一览表'
export default {
  data() {
    var checknumber = (rule, value, callback) => {
      if (value !== '') {
        var numReg = /^[0-9]{9}$/;
        if (!numReg.test(value)) {
          callback(new Error('职工号应为9位数字'));
        } else {
          callback()
        }
      }
    };
    // 定义初始化数据
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      管理岗位等级字典: ['管理岗位一级', '管理岗位二级', '管理岗位三级', '管理岗位四级', '管理岗位五级', '管理岗位六级', '管理岗位七级', '管理岗位八级', '管理岗位九级', '管理岗位十级',],
      专业技术岗位等级字典: ['专业技术岗位一级', '专业技术岗位二级', '专业技术岗位三级', '专业技术岗位四级', '专业技术岗位五级', '专业技术岗位六级', '专业技术岗位七级', '专业技术岗位八级', '专业技术岗位九级', '专业技术岗位十级',],
      初审时间:'',
      复审时间:'',
      基本信息: {
        职工号: '',
        单位: '',
        姓名: '',
      },
      基本信息rules: {
        职工号: [
          {validator: checknumber, trigger: 'blur'}
        ],
      },
      单位字典: [],
      审核情况: [{}],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },

  created() {
    基本信息.getlist().then((response) => {
      this.单位字典 = response.data.单位字典;
    })
    // 在页面渲染前调用methods中方法
    this.getdata()
  },
  methods: {
    // 查找信息
    search() {
      this.$refs['基本信息'].validate((valid) => {
        if (valid) {
          this.getdata()
        } else {
          alert("信息有误")
        }
      })
    },
    getdata() {
      let 初审时间开始 = '';
      let 初审时间结束 = '';
      let 复审时间开始 = '';
      let 复审时间结束 = '';
      if(this.初审时间!==''){
        初审时间开始 = this.formatDate(this.初审时间[0]);
        初审时间结束 = this.formatDate(this.初审时间[1]);
      }
      if(this.复审时间!=='') {
        复审时间开始 = this.formatDate(this.复审时间[0]);
        复审时间结束 = this.formatDate(this.复审时间[1]);
      }
      审核情况一览表.getdata(this.page,this.limit,初审时间开始,初审时间结束,复审时间开始,复审时间结束,this.基本信息).then((response) => {
        this.审核情况 = response.data.list;
        this.total = response.data.total;
        this.$message({
          type: "success",
          message: "查询成功!",
        })
      })
    },
    formatDate(datetime){ // 将date类型准换为yyy-MM-dd HH:mm:ss格式
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
      var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    },
  }
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
  }
}

</style>
