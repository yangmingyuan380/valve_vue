<template>
  <div class="app-container">
    <el-form :model="user" :rules="rules" ref="user" label-position="center" label-width="120px" size="mini">
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">基本信息</h4>
          <div class="note">
            <p>填写说明:</p>
            <p>【查找】：1、输入职工号；2、输入姓名及单位。</br>
              【新建】：输入“单位”、“职工号”、“姓名”</br>
              【姓名】：姓名（包括少数民族干部的姓名）用字要固定，不能用同音字代替，最多允许输入18个汉字（包括“·”）。</br>
              【性别】：从下拉列表中选择 “男”“女”。</br>
              【出生年月】：《干部基本信息审核表》填写时，一律用公历和阿拉伯数字，年份用4位数字表示，月份用2位数字表示，如“1972.04”。</br>
            </p>
          </div>
          <el-row>
            <el-col :span="4">
              <el-form-item label="职工号">
                <el-input v-model="user.userID"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位">
                <el-select v-model="user.organize" placeholder="请选择">
                  <el-option
                    v-for="item in organize"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名">
                <el-input v-model="user.userName" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="查询条件">
                <el-select v-model="search" placeholder="请选择" style="width: 130px">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="职工号" value="1"></el-option>
                  <el-option label="单位和姓名" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" plain :disabled="isDisabled" size="mini">查找</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="success" plain :disabled="isDisabled" size="mini" @click="add">新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="性别">
                <el-select v-model="user.gender" placeholder="请选择">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="民族">
                <el-input v-model="user.nation" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="籍贯">
                <el-input v-model="user.nativePlace" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="出生地">
                <el-input v-model="user.birthplace" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="健康状况">
                <el-input v-model="user.health" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="现任职务" label-width="90px">
                <el-input v-model="user.occupation" controls-position="right" :min="0" style="width: 100px"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="管理岗位等级">
                <el-select v-model="user.managerLevel" placeholder="请选择">
                  <el-option
                    v-for="item in managerLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业技术职务（职称）" label-width="180px">
                <el-input v-model="user.jobTitle" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专业技术岗位等级" label-width="160px">
                <el-select v-model="user.techniqueLevel" placeholder="请选择">
                  <el-option
                    v-for="item in techniqueLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="熟悉专业、有何特长">
            <el-input type="textarea" :rows="2" v-model="user.speciality" style="width: 500px"/>
          </el-form-item>
        </div>
      </div>
      <div class="app-main" v-show="isShow">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">审核情况</h4>
            <el-row>
              <el-col :span="4">
                <el-form-item label="初审人职工号" prop="auditerID">
                  <el-input v-model="user.auditerID" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人" prop="auditer">
                  <el-input v-model="user.auditer" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人单位" prop="auditer">
                  <el-input v-model="user.auditerOrganize" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="初审时间" prop="auditDatetime">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="user.auditDatetime"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审状态" prop="auditStatus">
                  <el-select v-model="user.auditStatus" style="width: 100px">
                    <el-option label="未初审" value="0"></el-option>
                    <el-option label="初审中" value="1"></el-option>
                    <el-option label="完成初审" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="复审人职工号" prop="auditerID2">
                  <el-input v-model="user.auditerID2" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人" prop="auditer2">
                  <el-input v-model="user.auditer2" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人单位" prop="auditerOrganize2">
                  <el-input v-model="user.auditerOrganize2" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审时间" prop="auditDatetime2">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="user.auditDatetime2"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审状态" prop="auditStatus2">
                  <el-select v-model="user.auditStatus2" style="width: 100px">
                    <el-option label="未初审" value="0"></el-option>
                    <el-option label="初审中" value="1"></el-option>
                    <el-option label="完成初审" value="2"></el-option>
                  </el-select>
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
                <el-form-item label="初审认定出生时间" prop="birthDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.birthDate"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审认定出生时间" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.birthDate2"
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
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="birthIsTrue2" label-width="100px">
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
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="身份证号码时间" prop="IDcardDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.IDcardDate"
                                  style="width: 130px;"></el-date-picker>
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
            <el-form-item label="最早形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.earliestRecord" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="最新任免材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.newRecord" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="其他形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.othersRecord" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="出生时间存在问题" prop="birthProblem" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.birthProblem" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">参加工作时间</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="初审认定参加工作时间" prop="workDate" label-width="170px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.workDate"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定参加工作时间" label-width="160px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.workDate2"
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
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="workIsTrue2">
                  <el-select v-model="user.workIsTrue2" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织是否进行过认定" prop="workIsTrue3" label-width="170px">
                  <el-select v-model="user.workIsTrue3" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="国内最早参加工作材料记载" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user. earliestWorkRecord" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="组织人事部门形成的相关材料" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user. formWorkRecord" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="参加工作时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user.birthProblem" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">入党时间</h4>
            <el-row>
              <el-col :span="4">
                <el-form-item label="政治面貌" prop="politicStatus" label-width="80px">
                  <el-select v-model="user.政治面貌" placeholder="请选择" @change="isPartyer">
                    <el-option
                      v-for="item in 政治面貌字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="初审认定入党时间" prop="partyDate" v-show="showPartyDate" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.partyDate1"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定入党时间" v-show="showPartyDate" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.partyDate2"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中共党员入党时间记载情况是否一致" v-show="showPartyDate" prop="partyIsTrue1" label-width="250px">
                  <el-select v-model="user.partyIsTrue1" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="《入党志愿书》记载入党时间" v-show="showPartyDate" prop="《入党志愿书》记载入党时间" label-width="200px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.入党志愿书记载入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加入民主党派或无党派人士的时间" prop="加入民主党派或无党派人士的时间" label-width="235px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.加入民主党派或无党派人士的时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="partyIsTrue2" label-width="100px">
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
            <el-row>
              <el-col :span="4">
                <el-form-item label="第二党派" prop="politicStatus" label-width="80px">
                  <el-select v-model="user.第二党派" placeholder="请选择">
                    <el-option
                      v-for="item in 政治面貌字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="参加第二党派时间" prop="参加第二党派时间" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.参加第二党派时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="组织人事部门形成的相关材料" prop="组织人事部门形成的相关材料" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user.组织人事部门形成的相关材料" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="入党时间存在问题" prop="入党时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user.入党时间存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">学历学位材料</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="全日制最高学历" prop="全日制最高学历" label-width="120px">
                  <el-select v-model="user.全日制最高学历" placeholder="请选择">
                    <el-option
                      v-for="item in 学历字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="全日制最高学位" prop="全日制最高学位" label-width="120px">
                  <el-select v-model="user.全日制最高学位" placeholder="请选择">
                    <el-option
                      v-for="item in 学位字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学历" prop="在职最高学历" label-width="100px">
                  <el-select v-model="user.在职最高学历" placeholder="请选择">
                    <el-option
                      v-for="item in 学历字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学位" prop="在职最高学位" label-width="100px">
                  <el-select v-model="user.在职最高学位" placeholder="请选择">
                    <el-option
                      v-for="item in 学位字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="全日制最高学历毕业院校、系及专业" prop="全日制最高学历毕业院校系及专业" label-width="150px">
                  <el-input type="textarea" :rows="1" v-model="user.全日制最高学历毕业院校系及专业" style="width: 150px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="全日制最高学位毕业院校、系及专业" prop="全日制最高学位毕业院校系及专业" label-width="150px">
                  <el-input type="textarea" :rows="1" v-model="user.全日制最高学位毕业院校系及专业" style="width: 150px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学历毕业院校、系及专业" prop="在职最高学历毕业院校系及专业" label-width="130px">
                  <el-input type="textarea" :rows="1" v-model="user.在职最高学历毕业院校系及专业" style="width: 150px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学位毕业院校、系及专业" prop="在职最高学位毕业院校系及专业" label-width="130px">
                  <el-input type="textarea" :rows="1" v-model="user.在职最高学位毕业院校系及专业" style="width: 150px"/>
                </el-form-item>
              </el-col>
            </el-row>
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
            <el-form-item label="学习经历列表">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addedu">添加</el-button>
              <el-table :data="user.学习经历列表" align="center" border style="width: 99%;margin-top: 10px" height="250">
                <el-table-column label="入学时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.入学时间`" :rules="rules.入学时间">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.入学时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="毕业时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.毕业时间`" :rules="rules.毕业时间">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.毕业时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="学历">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.学历`">
                      <el-select v-model="scope.row.学历" placeholder="请选择">
                        <el-option
                          v-for="item in 学历字典"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="学位">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.学位`">
                      <el-select v-model="scope.row.学位" placeholder="请选择">
                        <el-option
                          v-for="item in 学位字典"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学历的院校或机构">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.获得学历的院校或机构`">
                      <el-input v-model="scope.row.获得学历的院校或机构"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学位的院校或机构">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.获得学位的院校或机构`">
                      <el-input v-model="scope.row.获得学位的院校或机构"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学历的国家（地区）">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.获得学历的国家地区`">
                      <el-input v-model="scope.row.获得学历的国家地区"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学位的国家（地区）">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.获得学位的国家地区`">
                      <el-input v-model="scope.row.获得学位的国家地区"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="所学专业">
                  <template slot-scope="scope">
                    <el-form-item :prop="`eduList.${scope.$index}.所学专业`">
                      <el-input v-model="scope.row.所学专业"/>
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
            <el-form-item label="学历学位材料存在问题" label-width="160px">
              <el-input type="textarea" :rows="2" v-model="user.学历学位材料存在问题" style="width: 500px"/>
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
            <el-form-item label="工作经历列表">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addexperience">添加</el-button>
              <el-table :data="user.工作经历列表" align="center" border style="width: 99%;margin-top: 10px"
                        height="250">
                <el-table-column label="起始时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.起始时间`" :rules="rules.chinaName">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.起始时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="终止时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.终止时间`" :rules="rules.chinaName">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.终止时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="所在单位名称">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.所在单位名称`" :rules="rules.phone">
                      <el-input v-model="scope.row.所在单位名称"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="从事工作">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.从事工作`">
                      <el-input v-model="scope.row.从事工作"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="曾任党政职务">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.曾任党政职务`">
                      <el-input v-model="scope.row.曾任党政职务"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="曾任专业技术职务">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.曾任专业技术职务`">
                      <el-input v-model="scope.row.曾任专业技术职务"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="scope">
                    <el-form-item :prop="`工作经历列表.${scope.$index}.备注`">
                      <el-input v-model="scope.row.备注"/>
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
              <el-col :span="9">
                <el-form-item label="2019年年度考核结果" prop="awardResult" label-width="150px">
                  <el-select v-model="user.年度考核结果2019" placeholder="请选择">
                    <el-option
                      v-for="item in 考核结果字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="2020年年度考核结果" label-width="150px">
                  <el-select v-model="user.年度考核结果2020" placeholder="请选择">
                    <el-option
                      v-for="item in 考核结果字典"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="添加奖励情况">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addaward">添加</el-button>
              <el-table :data="user.奖励情况列表" align="center" border style="width: 99%;margin-top: 10px"
                        height="250">
                <el-table-column label="奖励时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`奖励情况列表.${scope.$index}.奖励时间`" :rules="rules.chinaName">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.奖励时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="奖励情况">
                  <template slot-scope="scope">
                    <el-form-item :prop="`奖励情况列表.${scope.$index}.奖励情况`" :rules="rules.phone">
                      <el-input v-model="scope.row.奖励情况"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="100px">
                  <template slot-scope="scope">
                    <el-button @click.prevent="removeAward(scope.row)" style="width: 70px" type="danger"
                               icon="el-icon-delete">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="添加处分情况">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addPunish">添加</el-button>
              <el-table :data="user.处分情况列表" align="center" border style="width: 99%;margin-top: 10px"
                        height="250">
                <el-table-column label="处分时间">
                  <template slot-scope="scope">
                    <el-form-item :prop="`奖励情况列表.${scope.$index}.处分时间`" :rules="rules.chinaName">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.处分时间"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="处分情况">
                  <template slot-scope="scope">
                    <el-form-item :prop="`奖励情况列表.${scope.$index}.处分情况`" :rules="rules.phone">
                      <el-input v-model="scope.row.处分情况"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="100px">
                  <template slot-scope="scope">
                    <el-button @click.prevent="removePunish(scope.row)" style="width: 70px" type="danger"
                               icon="el-icon-delete">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="奖惩情况存在问题" prop="奖惩情况存在问题" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.奖惩情况存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">家庭主要成员及重要社会关系</h4>
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
            <el-form-item label="家庭主要成员及重要社会关系">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addFamily">添加</el-button>
              <el-table :data="user.家庭成员列表" align="center" border style="width: 99%;margin-top: 10px" height="250">
                <el-table-column label="称谓">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.称谓`" :rules="rules.chinaName">
                      <el-input v-model="scope.row.称谓"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.姓名`" :rules="rules.chinaName">
                      <el-input v-model="scope.row.姓名"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="出生年月">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.出生年月`" :rules="rules.chinaName">
                      <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.出生年月"
                                      style="width: 130px;"></el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="政治面貌">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.政治面貌`" :rules="rules.chinaName">
                      <el-select v-model="scope.row.政治面貌" placeholder="请选择">
                        <el-option
                          v-for="item in 政治面貌字典"
                          :key="item.label"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="工作/学习单位及职务">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.单位及职务`" :rules="rules.phone">
                      <el-input v-model="scope.row.单位及职务"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="现居住地">
                  <template slot-scope="scope">
                    <el-form-item :prop="`家庭成员列表.${scope.$index}.现居住地`" :rules="rules.phone">
                      <el-input v-model="scope.row.现居住地"/>
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
            <el-form-item label="家庭主要成员存在问题" prop="家庭主要成员存在问题" label-width="170px">
              <el-input type="textarea" :rows="2" v-model="user.家庭主要成员存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="mybottom">
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="saveOrUpdate">提交</el-button>
            <el-button type="primary" @click="goback">取消</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    // 定义初始化数据
    return {
      organize: [
        {
          value: '0',
          label: '自动化'
        }],
      search: '0',
      managerLevel: [],
      techniqueLevel: [],
      政治面貌字典: [
        {label: '党员'},
      ],
      学历字典: [],
      学位字典: [],
      考核结果字典: [],
      isShow: false,
      isDisabled: false,
      showPartyDate: false,
      user: {
        auditDatetime: new Date(),
        auditStatus: '0',
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
        学习经历列表: [{
          学习时间: '',
          毕业时间: '',
          witness: '',
        }],
        工作经历列表: [{}],
        奖励情况列表: [{}],
        处分情况列表: [{}],
        家庭成员列表: [{}],
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
    // 基本信息中新增按钮
    add() {
      this.isShow = true; // 显示后面模块
      this.isDisabled = true; // 禁用查询和新增按钮
    },
    // 如果政治面貌是党员，显示入党时间
    isPartyer(value) {
      if (value === "党员") {
        this.showPartyDate = true;
      } else {
        this.user.partyDate = new Date();
      }
    },
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
    addaward() {
      this.user.奖励情况列表.push({
        奖励时间: '',
        奖励情况: '',
      })
    },
    addPunish(){
      this.user.处分情况列表.push({
        处分时间: '',
        处分情况: '',
      })
    },
    addFamily() {
      this.user.家庭成员列表.push({
        称谓: '',
        姓名: '',
        出生年月: '',
        政治面貌: '',
        单位及职务:'',
        现居住地:'',
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
    removeAward(item){
      var index = this.user.奖励情况列表.indexOf(item)
      if (index !== -1) {
        this.user.奖励情况列表.splice(index, 1)
      }
    },
    removePunish(item){
      var index = this.user.处分情况列表.indexOf(item)
      if (index !== -1) {
        this.user.处分情况列表.splice(index, 1)
      }
    },
    removeFamily(item) {
      var index = this.user.家庭成员列表.indexOf(item)
      if (index !== -1) {
        this.user.家庭成员列表.splice(index, 1)
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
  width: 1300px;
  box-shadow: 0 0 5px #cac6c6;

  .container {
    width: 100%;
    margin: 8px 15px 8px 0px;
    float: left;

    .note {
      font-size: 13px;
      color: red;
    }
  }
}

.mybottom {
  float: left;
  width: 100%;
  margin: 15px auto;
}
</style>
