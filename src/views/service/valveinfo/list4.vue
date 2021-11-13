<template>
  <div class="app-container">
    <el-form :model="基本信息" :rules="基本信息rules" ref="基本信息" label-position="center" label-width="120px" size="mini">
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">审核情况一览表</h4>
          <el-row>
            <el-col :span="4">
              <el-form-item label="职工号" prop="职工号">
                <el-input v-model="基本信息.职工号"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位" prop="单位">
                <el-select v-model="基本信息.单位" filterable placeholder="输入搜索">
                  <el-option
                    v-for="item in 单位字典"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="姓名" prop="姓名">
                <el-input v-model="基本信息.姓名" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="查询条件">
                <el-select v-model="查询条件" placeholder="请选择" style="width: 130px">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="职工号" value="1"></el-option>
                  <el-option label="单位和姓名" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" plain :disabled="isDisabled" size="mini" @click="search">查找</el-button>
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
            <el-col :span="4">
              <el-form-item label="民族" prop="民族">
                <el-input v-model="基本信息.民族" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="籍贯">
                <el-input v-model="基本信息.籍贯" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="出生地">
                <el-input v-model="基本信息.出生地" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="健康状况">
                <el-input v-model="基本信息.健康状况" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="现任职务" label-width="90px">
                <el-input v-model="基本信息.现任职务" controls-position="right" :min="0" style="width: 100px"/>
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
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业技术职务（职称）" label-width="180px">
                <el-input v-model="基本信息.专业技术职务职称" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专业技术岗位等级" label-width="160px">
                <el-select v-model="基本信息.专业技术岗位等级" placeholder="请选择">
                  <el-option
                    v-for="item in 专业技术岗位等级字典"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="进入本校时间">
                <el-input v-model="user.进入本校时间"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="熟悉专业、有何特长">
            <el-input type="textarea" :rows="2" v-model="基本信息.熟悉专业有何特长" style="width: 500px"/>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="save1">保存</el-button>
            <el-button type="primary" @click="update1">更新</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="app-main" >
      <el-form :model="审核情况" :rules="审核情况rules" ref="审核情况" label-position="center" label-width="120px" size="mini">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">审核情况</h4>
            <el-row>
              <el-col :span="4">
                <el-form-item label="初审人职工号" prop="初审人职工号">
                  <el-input v-model="审核情况.初审人职工号" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人" prop="初审人">
                  <el-input v-model="审核情况.初审人" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人单位" prop="初审人单位">
                  <el-select v-model="审核情况.初审人单位" filterable placeholder="输入搜索">
                    <el-option
                      v-for="item in 单位字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="初审时间" prop="初审时间">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="审核情况.初审时间"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审状态" prop="初审状态">
                  <el-select v-model="审核情况.初审状态" style="width: 100px">
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
                  <el-input v-model="审核情况.复审人职工号" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人" prop="复审人">
                  <el-input v-model="审核情况.复审人" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人单位" prop="复审人单位">
                  <el-select v-model="审核情况.复审人单位" filterable placeholder="输入搜索">
                    <el-option
                      v-for="item in 单位字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审时间" prop="复审时间">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="审核情况.复审时间"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审状态" prop="复审状态">
                  <el-select v-model="审核情况.复审状态" style="width: 100px">
                    <el-option label="未初审" value="未初审"></el-option>
                    <el-option label="初审中" value="初审中"></el-option>
                    <el-option label="完成初审" value="完成初审"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="save2">保存</el-button>
              <el-button type="primary" @click="update2">更新</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <el-form :model="出生时间" :rules="出生时间rules" ref="出生时间" label-position="center" label-width="120px" size="mini">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">出生时间</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="初审认定出生时间" prop="birthDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="出生时间.初审认定出生时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审认定出生时间" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="出生时间.复审认定出生时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="记载情况是否一致" prop="birthIsTrue1" label-width="150px">
                  <el-select v-model="出生时间.出生时间记载是否一致" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="birthIsTrue2" label-width="100px">
                  <el-select v-model="出生时间.出生时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="组织是否进行过认定" prop="birthIsTrue3" label-width="150px">
                  <el-select v-model="出生时间.出生时间组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="身份证号码时间" prop="IDcardDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="出生时间.身份证号码时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="最早形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="出生时间.最早形成材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="最新任免材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="出生时间.最新任免材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="其他形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="出生时间.其他形成材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="出生时间存在问题" prop="birthProblem" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="出生时间.出生时间存在问题" style="width: 500px"/>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="save3">保存</el-button>
              <el-button type="primary" @click="update3">更新</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <el-form :model="参加工作时间" :rules="参加工作时间rules" ref="参加工作时间" label-position="center" label-width="120px" size="mini">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">参加工作时间</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="初审认定参加工作时间" prop="workDate" label-width="170px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="参加工作时间.初审认定参加工作时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定参加工作时间" label-width="160px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="参加工作时间.复审认定参加工作时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="记载情况是否一致" prop="workIsTrue1" label-width="150px">
                  <el-select v-model="参加工作时间.参加工作时间记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="workIsTrue2">
                  <el-select v-model="参加工作时间.参加工作时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织是否进行过认定" prop="workIsTrue3" label-width="170px">
                  <el-select v-model="参加工作时间.参加工作时间组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="国内最早参加工作材料记载" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="参加工作时间.国内最早参加工作材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="组织人事部门形成的相关材料" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="参加工作时间.参加工作时间组织人事相关材料" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="参加工作时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="参加工作时间.参加工作时间存在问题" style="width: 500px"/>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="save4">保存</el-button>
              <el-button type="primary" @click="update4">更新</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <el-form :model="入党时间" :rules="入党时间rules" ref="入党时间" label-position="center" label-width="120px" size="mini">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">入党时间</h4>
            <el-row>
              <el-col :span="4">
                <el-form-item label="政治面貌" prop="politicStatus" label-width="80px">
                  <el-select v-model="入党时间.政治面貌" placeholder="输入搜索" filterable @change="isPartyer">
                    <el-option
                      v-for="item in 政治面貌字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="初审认定入党时间" prop="partyDate" v-show="showPartyDate" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="入党时间.初审认定入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定入党时间" v-show="showPartyDate" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="入党时间.复审认定入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中共党员入党时间记载情况是否一致" v-show="showPartyDate" prop="partyIsTrue1" label-width="250px">
                  <el-select v-model="入党时间.入党时间记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="《入党志愿书》记载入党时间" v-show="showPartyDate" prop="《入党志愿书》记载入党时间" label-width="200px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="入党时间.入党志愿书记载入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加入民主党派或无党派人士的时间" prop="加入民主党派或无党派人士的时间" label-width="235px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="入党时间.加入民主党派或无党派人士的时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="partyIsTrue2" label-width="100px">
                  <el-select v-model="入党时间.入党时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织是否进行过认定" prop="partyIsTrue3" label-width="150px">
                  <el-select v-model="入党时间.入党时间组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-form-item label="第二党派" prop="politicStatus" label-width="80px">
                  <el-select v-model="入党时间.第二党派" filterable placeholder="输入搜索">
                    <el-option
                      v-for="item in 政治面貌字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="参加第二党派时间" prop="参加第二党派时间" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="入党时间.参加第二党派时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="组织人事部门形成的相关材料" prop="组织人事部门形成的相关材料" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="入党时间.入党时间组织人事相关材料" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="入党时间存在问题" prop="入党时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="入党时间.入党时间存在问题" style="width: 500px"/>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="save5">保存</el-button>
              <el-button type="primary" @click="update5">更新</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <el-form :model="学历学位材料" :rules="学历学位材料rules" ref="学历学位材料" label-position="center" label-width="120px" size="mini">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">学历学位材料</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="全日制最高学历" prop="全日制最高学历" label-width="120px">
                  <el-cascader
                    v-model="学历"
                    :options="学历字典"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="全日制最高学位" prop="全日制最高学位" label-width="120px">
                  <el-cascader
                    v-model="学位"
                    :options="学位字典"
                    :props="{expandTrigger: 'hover'}"
                    @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学历" prop="在职最高学历" label-width="100px">
                  <el-cascader
                    v-model="学历"
                    :options="学历字典"
                    :props="{expandTrigger: 'hover'}"
                    @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学位" prop="在职最高学位" label-width="100px">
                  <el-cascader
                    v-model="学位"
                    :options="学位字典"
                    :props="{expandTrigger: 'hover'}"
                    @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="全日制最高学历毕业院校、系及专业" prop="全日制最高学历毕业院校系及专业" label-width="250px">
                  <el-input type="textarea" :rows="1" v-model="学历学位材料.全日制最高学历毕业院校系及专业" style="width: 250px"/>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="全日制最高学位毕业院校、系及专业" prop="全日制最高学位毕业院校系及专业" label-width="250px">
                  <el-input type="textarea" :rows="1" v-model="学历学位材料.全日制最高学位毕业院校系及专业" style="width: 250px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="在职最高学历毕业院校、系及专业" prop="在职最高学历毕业院校系及专业" label-width="250px">
                  <el-input type="textarea" :rows="1" v-model="学历学位材料.在职最高学历毕业院校系及专业" style="width: 250px"/>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="在职最高学位毕业院校、系及专业" prop="在职最高学位毕业院校系及专业" label-width="250px">
                  <el-input type="textarea" :rows="1" v-model="学历学位材料.在职最高学位毕业院校系及专业" style="width: 250px"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="记载情况是否一致" prop="eduIsTrue1" label-width="150px">
                  <el-select v-model="学历学位材料.学历学位记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="真实性存疑" prop="eduIsTrue2">
                  <el-select v-model="学历学位材料.学历学位真实性存疑" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="组织是否进行过认定" prop="eduIsTrue3" label-width="150px">
                  <el-select v-model="学历学位材料.学历学位组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="学习经历">
              <el-button icon="el-icon-plus" type="success" size="mini" @click="addedu">添加</el-button>
              <el-table :data="学历学位材料.学习经历列表" align="center" border style="width: 99%;margin-top: 10px" height="250">
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
                    <el-form-item :prop="`学习经历列表.${scope.$index}.学历`">
                      <el-cascader
                        v-model="scope.row.学历"
                        :options="学历字典"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange"></el-cascader>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="学位">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.学位`">
                      <el-cascader
                        v-model="scope.row.学位"
                        :options="学位字典"
                        :props="{expandTrigger: 'hover'}"
                        @change="handleChange"></el-cascader>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学历的院校或机构">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.获得学历的院校或机构`">
                      <el-input v-model="scope.row.获得学历的院校或机构"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学位的院校或机构">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.获得学位的院校或机构`">
                      <el-input v-model="scope.row.获得学位的院校或机构"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学历的国家（地区）">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.获得学历的国家地区`">
                      <el-input v-model="scope.row.获得学历的国家地区"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="获得学位的国家（地区）">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.获得学位的国家地区`">
                      <el-input v-model="scope.row.获得学位的国家地区"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="所学专业">
                  <template slot-scope="scope">
                    <el-form-item :prop="`学习经历列表.${scope.$index}.所学专业`">
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
              <el-input type="textarea" :rows="2" v-model="学历学位材料.学历学位存在问题" style="width: 500px"/>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="save6">保存</el-button>
              <el-button type="primary" @click="update6">更新</el-button>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">工作经历</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="记载情况是否一致" prop="experienceIsTrue1" label-width="150px">
                  <el-select v-model="user.工作经历记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="真实性存疑" prop="experienceIsTrue2">
                  <el-select v-model="user.工作经历真实性存疑" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织是否进行过认定" prop="experienceIsTrue3" label-width="150px">
                  <el-select v-model="user.工作经历组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
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
              <el-input type="textarea" :rows="2" v-model="user.工作经历存在问题" style="width: 500px"/>
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
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="2019年年度考核结果" prop="awardResult" label-width="150px">
                  <el-select v-model="user.a2019年考核结果" placeholder="请选择">
                    <el-option
                      v-for="item in 考核结果字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="2020年年度考核结果" label-width="150px">
                  <el-select v-model="user.a2020年考核结果" placeholder="请选择">
                    <el-option
                      v-for="item in 考核结果字典"
                      :key="item"
                      :label="item"
                      :value="item">
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
                  <el-select v-model="user.应添人员是否填写齐全" style="width: 100px">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
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
                      <el-select v-model="scope.row.政治面貌"  filterable placeholder="输入搜索">
                        <el-option
                          v-for="item in 政治面貌字典"
                          :key="item"
                          :label="item"
                          :value="item">
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
      </el-form>
    </div>
  </div>
</template>

<script>
import 基本信息 from '@/api/service/基本信息'
import 审核情况 from '@/api/service/审核情况'
import 出生时间 from '@/api/service/出生时间'
import 参加工作时间 from '@/api/service/参加工作时间'
import 入党时间 from '@/api/service/入党时间'
import 学历学位材料 from '@/api/service/学历学位材料'
export default {
  data() {
    var checknumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('职工号不能为空'));
      } else {
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
      管理岗位等级字典:['管理岗位一级','管理岗位二级','管理岗位三级','管理岗位四级','管理岗位五级','管理岗位六级','管理岗位七级','管理岗位八级','管理岗位九级','管理岗位十级',],
      专业技术岗位等级字典:['专业技术岗位一级','专业技术岗位二级','专业技术岗位三级','专业技术岗位四级','专业技术岗位五级','专业技术岗位六级','专业技术岗位七级','专业技术岗位八级','专业技术岗位九级','专业技术岗位十级',],
      查询条件: '0',
      政治面貌字典: ['党员','中共预备党员','共青团员','民革党员','民盟盟员','民建会员',
        '民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员','无党派人士','群众'],
      单位字典: ['建筑学院',
        '机械工程学院',
        '能源与环境学院',
        '信息科学与工程学院',
        '土木工程学院',
        '电子科学与工程学院、微电子学院',
        '数学学院',
        '自动化学院',
        '计算机科学与工程学院、软件学院',
        '物理学院',
        '生物科学与医学工程学院',
        '材料科学与工程学院',
        '人文学院',
        '艺术学院',
        '法学院',
        '经济管理学院',
        '电气工程学院',
        '外国语学院',
        '体育系',
        '化学化工学院',
        '交通学院',
        '仪器科学与工程学院',
        '医学院',
        '公共卫生学院',
        '马克思主义学院',
        '海外教育学院',
        '生命科学与技术学院',
        '网络空间安全学院',
        '吴健雄学院',
        '建筑研究所',
        '成贤学院',
        '无锡分校',
        '继续教育学院',
        '图书馆',
        '档案馆',
        '东南大学学报(自然科学版)',
        '东南大学学报(哲学社会科学版)',
        '东南大学学报(医学版)',
        '党委教师工作部(教师教学发展中心)',
        '网络与信息中心',
        '城市工程科学技术研究院',
        '智能交通运输系统(ITS)研究中心',
        '东南大学-南京通信技术研究院',
        '东南大学医院',
        '研究生院(党委研究生工作部)',
        '党委办公室、党委统战部',
        '党委组织部',
        '党委宣传部',
        '纪委办公室(监察处)',
        '团委',
        '工会',
        '党委老干部处',
        '机关党委',
        '产业党工委',
        '校长办公室',
        '科研院',
        '保密办公室',
        '教务处',
        '教务处/电子电工实验中心',
        '教务处/教育技术中心',
        '人事处',
        '党委学工部(学生处)',
        '财务处',
        '社会科学处',
        '丁家桥校区管理委员会',
        '苏州校区管理委员会',
        '四牌楼校区管理委员会',
        '发展委员会',
        '国际合作处(港澳台办公室)',
        '党委发展规划与学科建设部、' +
        '发展规划与学科建设处(双一流建设办公室)',
        '审计处',
        '党委保卫部(保卫处)',
        '实验室与设备管理处',
        '东南大学大数据计算中心',
        '东南大学分析测试中心',
        '资产管理处(国有资产管理委员会办公室)',
        '基本建设处',
        '总务处',
        '后勤党工委',
        '江苏东南大学资产管理经营有限公司',
        '东南大学脑科学与智能技术研究院',
        '中华民族视觉形象研究基地',
        '东南大学文化传媒与国际战略研究院',
        '附属中大医院',],
      学历字典: [{
        value: '研究生教育',
        label: '研究生教育',
        children: [{
          value: '博士研究生',
          label: '博士研究生',
        },{
          value: '硕士研究生',
          label: '硕士研究生',
        },{
          value: '中央党校研究生',
          label: '中央党校研究生'
        },{
          value: '省(区、市)委党校研究生',
          label: '省(区、市)委党校研究生',
        },]
      },{
        value: '本科教育',
        label: '本科教育',
        children: [{
          value: '大学',
          label: '大学'
        },{
          value: '中央党校大学',
          label: '中央党校大学'
        },{
          value: '省(区、市)委党校大学',
          label: '省(区、市)委党校大学'
        }]
      },{
        value: '专科教育',
        label: '专科教育',
        children: [{
          value: '大专',
          label: '大专'
        },{
          value: '省(区、市)委党校大专',
          label: '省(区、市)委党校大专'
        },{
          value: '中央党校大专',
          label: '中央党校大专'
        }]
      }],
      学位: [],
      学位字典: [{
        value: '博士',
        label: '博士',
        children: [{
          value: '哲学博士学位',
          label: '哲学博士学位'
        },{
          value: '经济学博士学位',
          label: '经济学博士学位'
        },{
          value: '法学博士学位',
          label: '法学博士学位'
        },{
          value: '教育学博士学位',
          label: '教育学博士学位'
        },{
          value: '文学博士学位',
          label: '文学博士学位'
        },{
          value: '历史学博士学位',
          label: '历史学博士学位'
        },{
          value: '理学博士学位',
          label: '理学博士学位'
        },{
          value: '工学博士学位',
          label: '工学博士学位'
        },{
          value: '农学博士学位',
          label: '农学博士学位'
        },{
          value: '医学博士学位',
          label: '医学博士学位'
        },{
          value: '军事学博士学位',
          label: '军事学博士学位'
        },{
          value: '管理学博士学位',
          label: '管理学博士学位'
        },{
          value: '艺术学博士学位',
          label: '艺术学博士学位'
        },{
          value: '教育博士专业学位',
          label: '教育博士专业学位'
        },{
          value: '工程博士专业学位',
          label: '工程博士专业学位'
        },{
          value: '临床医学博士专业学位',
          label: '临床医学博士专业学位'
        },{
          value: '兽医博士专业学位',
          label: '兽医博士专业学位'
        },{
          value: '口腔医学博士专业学位',
          label: '口腔医学博士专业学位'
        }]
      },{
        value: '硕士',
        label: '硕士',
        children: [{
          value: '哲学硕士学位',
          label: '哲学硕士学位',
        },{
          value: '经济学硕士学位',
          label: '经济学硕士学位'
        },{
          value: '法学硕士学位',
          label: '法学硕士学位'
        },{
          value: '教育学硕士学位',
          label: '教育学硕士学位'
        },{
          value: '文学硕士学位',
          label: '文学硕士学位'
        },{
          value: '历史学硕士学位',
          label: '历史学硕士学位'
        },{
          value: '理学硕士学位',
          label: '理学硕士学位'
        },{
          value: '工学硕士学位',
          label: '工学硕士学位'
        },{
          value: '农学硕士学位',
          label: '农学硕士学位'
        },{
          value: '医学硕士学位',
          label: '医学硕士学位'
        },{
          value: '军事学硕士学位',
          label: '军事学硕士学位'
        },{
          value: '管理学硕士学位',
          label: '管理学硕士学位'
        },{
          value: '艺术学硕士学位',
          label: '艺术学硕士学位'
        },{
          value: '法律硕士专业学位',
          label: '法律硕士专业学位'
        },{
          value: '教育硕士专业学位',
          label: '教育硕士专业学位'
        },{
          value: '工程硕士专业学位',
          label: '工程硕士专业学位',
        },{
          value: '建筑学硕士专业学位',
          label: '建筑学硕士专业学位'
        },{
          value: '临床医学硕士专业学位',
          label: '临床医学硕士专业学位'
        },{
          value: '工商管理硕士专业学位',
          label: '工商管理硕士专业学位'
        },{
          value: '农业推广硕士专业学位',
          label: '农业推广硕士专业学位'
        },{
          value: '兽医硕士专业学位',
          label: '兽医硕士专业学位'
        },{
          value: '公共管理硕士专业学位',
          label: '公共管理硕士专业学位'
        },{
          value: '口腔医学硕士专业学位',
          label: '口腔医学硕士专业学位'
        },{
          value: '公共卫生硕士专业学位',
          label: '公共卫生硕士专业学位'
        },{
          value: '军事硕士专业学位',
          label: '军事硕士专业学位'
        },{
          value: '金融硕士专业学位',
          label: '金融硕士专业学位'
        },{
          value: '应用统计硕士专业学位',
          label: '应用统计硕士专业学位'
        },{
          value: '税务硕士专业学位',
          label: '税务硕士专业学位'
        },{
          value: '国际商务硕士专业学位',
          label: '国际商务硕士专业学位'
        },{
          value: '保险硕士专业学位',
          label: '保险硕士专业学位'
        },{
          value: '资产评估硕士专业学位',
          label: '资产评估硕士专业学位'
        },{
          value: '审计硕士专业学位',
          label: '审计硕士专业学位'
        },{
          value: '社会工作硕士专业学位',
          label: '社会工作硕士专业学位'
        },{
          value: '警务工作硕士专业学位',
          label: '警务工作硕士专业学位'
        },{
          value: '体育硕士专业学位',
          label: '体育硕士专业学位'
        },{
          value: '汉语国际教育硕士专业学位',
          label: '汉语国际教育硕士专业学位'
        },{
          value: '应用心理硕士专业学位',
          label: '应用心理硕士专业学位'
        },{
          value: '翻译硕士专业学位',
          label: '翻译硕士专业学位'
        },{
          value: '新闻与传播硕士专业学位',
          label: '新闻与传播硕士专业学位'
        },{
          value: '出版硕士专业学位',
          label: '出版硕士专业学位'
        },{
          value: '文物与博物馆硕士专业学位',
          label: '文物与博物馆硕士专业学位'
        },{
          value: '城市规划硕士专业学位',
          label: '城市规划硕士专业学位'
        },{
          value: '风景园林硕士专业学位',
          label: '风景园林硕士专业学位'
        },{
          value: '林业硕士专业学位',
          label: '林业硕士专业学位'
        },{
          value: '护理硕士专业学位',
          label: '护理硕士专业学位'
        },{
          value: '药学硕士专业学位',
          label: '药学硕士专业学位'
        },{
          value: '中药学硕士专业学位',
          label: '中药学硕士专业学位'
        },{
          value: '会计硕士专业学位',
          label: '会计硕士专业学位'
        },{
          value: '旅游管理硕士专业学位',
          label: '旅游管理硕士专业学位'
        },{
          value: '图书情报硕士专业学位',
          label: '图书情报硕士专业学位'
        },{
          value: '工程管理硕士专业学位',
          label: '工程管理硕士专业学位'
        },{
          value: '艺术硕士专业学位',
          label: '艺术硕士专业学位'
        },]
      },{
        value: '学士',
        label: '学士',
        children: [{
          value: '哲学学士学位',
          label: '哲学学士学位'
        },{
          value: '经济学学士学位',
          label: '经济学学士学位'
        },{
          value: '法学学士学位',
          label: '法学学士学位'
        },{
          value: '教育学学士学位',
          label: '教育学学士学位'
        },{
          value: '文学学士学位',
          label: '文学学士学位'
        },{
          value: '历史学学士学位',
          label: '历史学学士学位'
        },{
          value: '理学学士学位',
          label: '理学学士学位'
        },{
          value: '工学学士学位',
          label: '工学学士学位'
        },{
          value: '农学学士学位',
          label: '农学学士学位'
        },{
          value: '医学学士学位',
          label: '医学学士学位'
        },{
          value: '军事学学士学位',
          label: '军事学学士学位'
        },{
          value: '管理学学士学位',
          label: '管理学学士学位'
        },{
          value: '艺术学学士学位',
          label: '艺术学学士学位'
        },{
          value: '建筑学学士专业学位',
          label: '建筑学学士专业学位'
        },]
      },{
        value: '无',
        label: '无'
      }],
      考核结果字典: ['优秀'],
      isShow: false,
      isDisabled: false,
      showPartyDate: false,
      基本信息: {
        职工号: '',
        单位: '',
        姓名: '',
      },
      基本信息rules: {
        职工号: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
          {validator: checknumber, trigger: 'blur'}
        ],
        单位: [
          {required: true, message: '请选择单位', trigger: 'blur'},
        ],
        姓名: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        性别: [
          {required: true, message: '请选择性别', trigger: 'blur'},
        ],
        民族: [
          {required: true, message: '请填写民族', trigger: 'blur'},
        ],
      },
      审核情况: {
        初审时间: new Date(),
        初审状态: '未审核',
      },
      审核情况rules: {
        初审人职工号: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
          {validator: checknumber, trigger: 'blur'}
        ],
        复审人职工号: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
          {validator: checknumber, trigger: 'blur'}
        ],
      },
      出生时间:{

      },
      出生时间rules: {

      },
      参加工作时间:{

      },
      参加工作时间rules: {

      },
      入党时间:{

      },
      入党时间rules: {

      },
      学历学位材料:{
        学习经历列表: [{}],
      },
      学历学位材料rules: {

      },
      user: {
        工作经历列表: [{}],
        奖励情况列表: [{}],
        处分情况列表: [{}],
        家庭成员列表: [{}],
      },
      rules: {
        职工号: [
          {required: true, message: '请输入职工号', trigger: 'blur'},
          {validator: checknumber, trigger: 'blur'}
        ],
        单位: [
          {required: true, message: '请选择单位', trigger: 'blur'},
        ],
        姓名: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        性别: [
          {required: true, message: '请选择性别', trigger: 'blur'},
        ],
        民族: [
          {required: true, message: '请填写民族', trigger: 'blur'},
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
    // 查找信息
    search() {
      if (this.查询条件 === '0') { // 根据职工号、单位和姓名查询
        if (this.基本信息.职工号 === '' || this.基本信息.单位 === '' || this.基本信息.姓名 === '') {
          alert('请填写职工号、单位和姓名');
        } else {
          this.isShow = true; // 显示后面模块
          this.isDisabled = true; // 禁用查询和新增按钮
        }
      } else if (this.查询条件 === '1') { // 只根据职工号查询
        if (this.基本信息.职工号 === '') {
          alert("请填写职工号");
        }else {
          this.isShow = true; // 显示后面模块
          this.isDisabled = true; // 禁用查询和新增按钮
        }
      } else if (this.查询条件 === '2') {
        if (this.基本信息.单位 === '' || this.基本信息.姓名 === '') {
          alert("请填写单位和姓名");
        } else {
          this.isShow = true; // 显示后面模块
          this.isDisabled = true; // 禁用查询和新增按钮
        }
      }
    },
    save1() {
      基本信息.save(this.基本信息)
    },
    update1() {
      基本信息.update(this.基本信息)
    },
    save2() {
      this.审核情况.职工号 = this.基本信息.职工号
      审核情况.save(this.审核情况)
    },
    update2() {
      this.审核情况.职工号 = this.基本信息.职工号
      审核情况.update(this.审核情况)
    },
    save3() {
      this.出生时间.职工号 = this.基本信息.职工号
      出生时间.save(this.出生时间)
    },
    update3() {
      this.出生时间.职工号 = this.基本信息.职工号
      出生时间.update(this.出生时间)
    },
    save4() {
      this.参加工作时间.职工号 = this.基本信息.职工号
      参加工作时间.save(this.参加工作时间)
    },
    update4() {
      this.参加工作时间.职工号 = this.基本信息.职工号
      参加工作时间.update(this.参加工作时间)
    },
    save5() {
      this.入党时间.职工号 = this.基本信息.职工号
      入党时间.save(this.入党时间)
    },
    update5() {
      this.入党时间.职工号 = this.基本信息.职工号
      入党时间.update(this.入党时间)
    },
    save6() {
      this.学历学位材料.职工号 = this.基本信息.职工号
      学历学位材料.save(this.学历学位材料)
    },
    update6() {
      this.学历学位材料.职工号 = this.基本信息.职工号
      学历学位材料.update(this.学历学位材料)
    },
    // 如果政治面貌是党员，显示入党时间
    isPartyer(value) {
      if (value === "中共党员") {
        this.showPartyDate = true;
      } else {
        this.user.partyDate = new Date();
      }
    },
    saveOrUpdate() {
      valve.save(this.user)
    },
    goback() {
    },
    //添加一行
    addedu() {
      this.学历学位材料.学习经历列表.push({
      })
    },
    addexperience() {
      this.user.工作经历列表.push({
        起始时间: '',
        终止时间: '',
        所在单位名称: '',
        从事工作: '',
        曾任党政职务: '',
        曾任专业技术职务: '',
        备注: ''
      })
    },
    addaward() {
      this.user.奖励情况列表.push({
        奖励时间: '',
        奖励情况: '',
      })
    },
    addPunish() {
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
        单位及职务: '',
        现居住地: '',
      })
    },
    removeEdu(item) {
      var index = this.学历学位材料.学习经历列表.indexOf(item)
      if (index !== -1) {
        this.学历学位材料.学习经历列表.splice(index, 1)
      }
    },
    removeExperience(item) {
      var index = this.user.工作经历列表.indexOf(item)
      if (index !== -1) {
        this.user.工作经历列表.splice(index, 1)
      }
    },
    removeAward(item) {
      var index = this.user.奖励情况列表.indexOf(item)
      if (index !== -1) {
        this.user.奖励情况列表.splice(index, 1)
      }
    },
    removePunish(item) {
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
      margin-left: 10px;
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
