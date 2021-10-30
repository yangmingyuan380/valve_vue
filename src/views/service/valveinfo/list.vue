<template>
  <div class="app-container">
    <el-form :model="user" :rules="rules" ref="user" label-position="center" label-width="120px" size="mini">
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">基本信息</h4>
          <el-row>
            <el-col :span="4">
              <el-form-item label="职工号" prop="userID">
                <el-input v-model="user.userID" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="user.userName" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">出生时间</h4>
          <el-row>
            <el-col :span="5">
              <el-form-item label="出生日期" prop="birthDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="user.birthDate"
                                style="width: 130px;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="记载情况是否一致" prop="birthIsTrue1" label-width="150px">
                <el-select v-model="user.birthIsTrue1" style="width: 100px">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="真实性存疑" prop="birthIsTrue2">
                <el-select v-model="user.birthIsTrue2" style="width: 100px">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="组织是否进行过认定" prop="birthIsTrue3" label-width="150px">
                <el-select v-model="user.birthIsTrue3" style="width: 100px">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="阴阳历存疑" prop="birthIsTrue4">
                <el-select v-model="user.birthIsTrue4" style="width: 100px">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="存在问题" prop="birthProblem">
            <el-input type="textarea" :rows="2" v-model="user.birthProblem" style="width: 500px"/>
          </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">参加工作时间</h4>
      <el-row>
        <el-col :span="6">
          <el-form-item label="参加工作时间" prop="workDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="user.workDate"
                            style="width: 130px;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="记载情况是否一致" prop="workIsTrue1" label-width="150px">
            <el-select v-model="user.workIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="真实性存疑" prop="workIsTrue2">
            <el-select v-model="user.workIsTrue2" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组织是否进行过认定" prop="workIsTrue3" label-width="150px">
            <el-select v-model="user.workIsTrue3" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="存在问题" prop="birthProblem">
        <el-input type="textarea" :rows="2" v-model="user.birthProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">入党时间</h4>
      <el-row>
        <el-col :span="6">
          <el-form-item label="入党时间" prop="partyDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="user.partyDate"
                            style="width: 130px;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="记载情况是否一致" prop="partyIsTrue1" label-width="150px">
            <el-select v-model="user.partyIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="真实性存疑" prop="partyIsTrue2">
            <el-select v-model="user.partyIsTrue2" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组织是否进行过认定" prop="partyIsTrue3" label-width="150px">
            <el-select v-model="user.partyIsTrue3" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="存在问题" prop="partyProblem">
        <el-input type="textarea" :rows="2" v-model="user.partyProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">学历学位材料</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="记载情况是否一致" prop="eduIsTrue1" label-width="150px">
            <el-select v-model="user.eduIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实性存疑" prop="eduIsTrue2">
            <el-select v-model="user.eduIsTrue2" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织是否进行过认定" prop="eduIsTrue3" label-width="150px">
            <el-select v-model="user.eduIsTrue3" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="学历学位材料">
        <el-button icon="el-icon-plus" type="success" size="mini" @click="addedu">添加</el-button>
        <el-table :data="user.eduList" align="center" border style="width: 80%;margin-top: 10px" height="250">
          <el-table-column label="时间">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.date`" :rules="rules.chinaName">
                <el-input v-model="scope.row.date"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="学历">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.data`" :rules="rules.phone">
                <el-input v-model="scope.row.data"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="证明人">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.witness`" :rules="rules.phone">
                <el-input v-model="scope.row.witness"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot-scope="scope">
              <el-button @click.prevent="removeEdu(scope.row)" style="width: 70px" type="danger"
                         icon="el-icon-delete">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="存在问题" prop="eduProblem">
        <el-input type="textarea" :rows="2" v-model="user.eduProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">工作经历</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="记载情况是否一致" prop="experienceIsTrue1" label-width="150px">
            <el-select v-model="user.experienceIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实性存疑" prop="experienceIsTrue2">
            <el-select v-model="user.experienceIsTrue2" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织是否进行过认定" prop="experienceIsTrue3" label-width="150px">
            <el-select v-model="user.experienceIsTrue3" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作经历">
        <el-button icon="el-icon-plus" type="success" size="mini" @click="addexperience">添加</el-button>
        <el-table :data="user.experienceList" align="center" border style="width: 80%;margin-top: 10px" height="250">
          <el-table-column label="时间">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.date`" :rules="rules.chinaName">
                <el-input v-model="scope.row.date"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="工作经历">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.data`" :rules="rules.phone">
                <el-input v-model="scope.row.data"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="证明人">
            <template slot-scope="scope">
              <el-form-item :prop="`eduList.${scope.$index}.witness`" :rules="rules.phone">
                <el-input v-model="scope.row.witness"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot-scope="scope">
              <el-button @click.prevent="removeExperience(scope.row)" style="width: 70px" type="danger"
                         icon="el-icon-delete">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="存在问题" prop="eduProblem">
        <el-input type="textarea" :rows="2" v-model="user.eduProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">奖惩情况</h4>
      <el-row>
        <el-col :span="6">
          <el-form-item label="填写是否真实准确" prop="awardIsTrue1" label-width="150px">
            <el-select v-model="user.awardIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年度考核结果" prop="awardResult" label-width="150px">
            <el-input v-model="user.awardResult1" placeholder="2019年" style="width: 100px"/>
            <el-input v-model="user.awardResult2" placeholder="2020年" style="width: 100px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="存在问题" prop="awardProblem">
        <el-input type="textarea" :rows="2" v-model="user.awardProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="cell">
        <div class="container">
      <h4 style="text-align:center">家庭主要成员</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="应添人员是否填写齐全" prop="familyIsTrue1" label-width="200px">
            <el-select v-model="user.familyIsTrue1" style="width: 100px">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="家庭成员情况">
        <el-button icon="el-icon-plus" type="success" size="mini" @click="addFamily">添加</el-button>
        <el-table :data="user.familyList" align="center" border style="width: 80%;margin-top: 10px" height="250">
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <el-form-item :prop="`familyList.${scope.$index}.name`" :rules="rules.chinaName">
                <el-input v-model="scope.row.name"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="工作单位">
            <template slot-scope="scope">
              <el-form-item :prop="`familyList.${scope.$index}.work`" :rules="rules.phone">
                <el-input v-model="scope.row.work"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="关系">
            <template slot-scope="scope">
              <el-form-item :prop="`familyList.${scope.$index}.relation`" :rules="rules.phone">
                <el-input v-model="scope.row.relation"/>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot-scope="scope">
              <el-button @click.prevent="removeFamily(scope.row)" style="width: 70px" type="danger"
                         icon="el-icon-delete">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="存在问题" prop="familyProblem">
        <el-input type="textarea" :rows="2" v-model="user.familyProblem" style="width: 500px"/>
      </el-form-item>
        </div>
      </div>
      <div class="mybottom">
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="saveOrUpdate">提交</el-button>
        <el-button type="primary" @click="goback">取消</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    // 定义初始化数据
    return {
      user: {
        userID: '',
        userName: '',
        birthDate: '',
        birthIsTrue1: '',
        birthIsTrue2: '',
        birthIsTrue3: '',
        birthIsTrue4: '',
        birthProblem: '',
        workDate: '',
        workIsTrue1: '',
        workIsTrue2: '',
        workIsTrue3: '',
        partyDate: '',
        partyIsTrue1: '',
        partyIsTrue2: '',
        partyIsTrue3: '',
        partyProblem: '',
        eduList: [{
          date: '',
          data: '',
          witness: '',
        }],
        experienceList: [{
          date: '',
          data: '',
          witness: '',
        }],
        familyList: [{
          name: '',
          work: '',
          relation: '',
        }]
      },
      rules: {
        userID: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
        ],
        userName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        birthDate: [
          {required: true, message: '请选择日期', trigger: 'blur'},
        ],
        birthIsTrue1: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        birthIsTrue2: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        birthIsTrue3: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        birthIsTrue4: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        workDate: [
          {required: true, message: '请选择日期', trigger: 'blur'},
        ],
        workIsTrue1: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        workIsTrue2: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        workIsTrue3: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        partyDate: [
          {required: true, message: '请选择日期', trigger: 'blur'},
        ],
        chinaName: [{required: true, message: '必填', trigger: 'blur'}],
        phone: [{required: true, message: '必填', trigger: 'blur'}],
      },
    };
  },

  created() {
    // 在页面渲染前调用methods中方法
  },
  methods: {
    saveOrUpdate() {

    },
    goback() {
    },
    //添加一行
    addedu() {
      this.user.eduList.push({
        date: '',
        data: '',
        witness: '',
      })
    },
    addexperience() {
      this.user.experienceList.push({
        date: '',
        data: '',
        witness: '',
      })
    },
    addFamily() {
      this.user.familyList.push({
        name: '',
        work: '',
        relation: '',
      })
    },
    removeEdu(item) {
      var index = this.user.eduList.indexOf(item)
      if (index !== -1) {
        this.user.eduList.splice(index, 1)
      }
    },
    removeExperience(item) {
      var index = this.user.experienceList.indexOf(item)
      if (index !== -1) {
        this.user.experienceList.splice(index, 1)
      }
    },
    removeFamily(item) {
      var index = this.user.familyList.indexOf(item)
      if (index !== -1) {
        this.user.familyList.splice(index, 1)
      }
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
  width:1300px;
  box-shadow: 0 0 5px #cac6c6;
  .container{
    width:100%;
    margin: 8px 15px 8px -15px;
    float: left;
  }
}
.mybottom{
  float: left;
  width:100%;
  margin: 15px auto;
}
</style>
