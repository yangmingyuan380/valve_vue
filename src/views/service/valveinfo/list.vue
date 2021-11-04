<template>
  <div class="app-container">
    <el-form :model="基本信息" :rules="基本信息rules" ref="基本信息" label-position="center" label-width="120px" size="mini">
      <div class="cell">
        <div class="container">
          <h4 style="text-align:center">基本信息</h4>
          <div class="note">
            <p>填写说明:</p>
            <dl>
              <dt>【查找】：1、输入职工号；2、输入姓名及单位。</dt>
              <dt>【新建】：输入“单位”、“职工号”、“姓名”</dt>
              <dt>【姓名】：姓名（包括少数民族干部的姓名）用字要固定，不能用同音字代替，最多允许输入18个汉字（包括“·”）。</dt>
              <dt>【性别】：从下拉列表中选择 “男”“女”。</dt>
              <dt>【出生年月】：《干部基本信息审核表》填写时，一律用公历和阿拉伯数字，年份用4位数字表示，月份用2位数字表示，如“1972.04”。</dt>
              <dt>【民族】：参考国标填写</dt>
              <dt>【籍贯】：填写本人的祖居地（指祖父的长期居住地）。按现行政区划填写，应填写省、市或县的名称，如“辽宁大连”“河北盐山”。直辖市直接填写城市名，
                如“上海”“重庆”等。
              </dt>
              <dt>【出生地】：填写本人出生的地方。按现行政区划填写，应填写省、市或县的名称，如“辽宁大连”“河北盐山”。直辖市直接填写城市名，如“上海”“重庆”等。</dt>
              <dt>【健康状况】：根据本人的具体情况填写“健康” “一般”或“较差”；有严重疾病、慢性疾病或身体伤残的，要如实简要填写。</dt>
              <dt>【现任职务】：填写干部现工作单位及担任的主要职务（含拟免职务），一律使用全称或规范的简称。</dt>
              <dt>【管理岗位等级】：一般“科员九级”、“副科八级”、“正科七级”、“副处六级”、“正处五级”，参加过职员晋升的除外。</dt>
              <dt>【专业技术职务（职称）】：应填写本人现担任的最高专业技术职务或现具有的最高专业技术职务任职资格。</dt>
              <dt>【专业技术岗位等级】：“院士：一级”，“正高：二级、三级、四级”，“副高：五级、六级、七级”，“中级：八级、九级、十级”。</dt>
              <dt>【熟悉专业、有何特长】：填写干部所熟悉的工作业务及专长。</dt>
            </dl>
          </div>
          <el-row>
            <el-col :span="4">
              <el-form-item label="职工号" prop="职工号">
                <el-input v-model="基本信息.职工号"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位" prop="单位">
                <el-select v-model="基本信息.单位" placeholder="请选择">
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
            <el-col :span="2">
              <el-button type="success" plain :disabled="isDisabled" size="mini" @click="add">新增</el-button>
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
    <el-form :model="审核情况" :rules="审核情况rules" ref="审核情况" label-position="center" label-width="120px" size="mini">
      <div class="app-main" v-show="isShow">
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">审核情况</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>仅“初审人”及“复审人”可编辑审核人员信息。
              </p>
            </div>
            <el-row>
              <el-col :span="4">
                <el-form-item label="初审人职工号" prop="auditerID">
                  <el-input v-model="审核情况.初审人职工号" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人" prop="auditer">
                  <el-input v-model="审核情况.初审人" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审人单位" prop="auditer">
                  <el-input v-model="审核情况.初审人单位" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="初审时间" prop="auditDatetime">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="审核情况.初审时间"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="初审状态" prop="auditStatus">
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
                <el-form-item label="复审人职工号" prop="auditerID2">
                  <el-input v-model="审核情况.复审人职工号" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人" prop="auditer2">
                  <el-input v-model="审核情况.复审人" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审人单位" prop="auditerOrganize2">
                  <el-input v-model="审核情况.复审人单位" controls-position="right" :min="0"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审时间" prop="auditDatetime2">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="审核情况.复审时间"
                                  style="width: 180px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="复审状态" prop="auditStatus2">
                  <el-select v-model="审核情况.复审状态" style="width: 100px">
                    <el-option label="未初审" value="0"></el-option>
                    <el-option label="初审中" value="1"></el-option>
                    <el-option label="完成初审" value="2"></el-option>
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
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">出生时间</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>【出生时间】：</p>
              <ol>
                <li>需核查档案中所有材料出现的出生时间是否一致，若记载情况一致，则“最早形成材料记载”、 “最新任免材料记载”、“身份证号码时间”、</li>
                “其他形成材料记载”不必填，否则填入对应日期及类号和材料名称（格式必须为：2000.01.01 四类 《入党申请书》）。
                <li>检查是否有大面积涂改，是否有造假嫌疑。如有，须在存在问题里描述。</li>
              </ol>
            </div>
            <el-row>
              <el-col :span="5">
                <el-form-item label="初审认定出生时间" prop="birthDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.初审认定出生时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="复审认定出生时间" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.复审认定出生时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="记载情况是否一致" prop="birthIsTrue1" label-width="150px">
                  <el-select v-model="user.出生日期记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="birthIsTrue2" label-width="100px">
                  <el-select v-model="user.出生时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="组织是否进行过认定" prop="birthIsTrue3" label-width="150px">
                  <el-select v-model="user.出生时间组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="身份证号码时间" prop="IDcardDate" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.身份证号码时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="最早形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.最早形成材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="最新任免材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.最新任免材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="其他形成材料记载" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.其他形成材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="出生时间存在问题" prop="birthProblem" label-width="150px">
              <el-input type="textarea" :rows="2" v-model="user.出生时间存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">参加工作时间</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>【参加工作时间】：总体审核要求：“原则上不改，造假的纠正”。</p>
              <ol>
                <li>指工作人员专职从事革命工作的起始时间，一律用公历填写。</li>
                <li>当前出生日期不一致有五种情形：
                  <ol>
                    <li>阴阳历的差异</li>
                    <li>虚实岁的差异</li>
                    <li>填写笔误</li>
                    <li>虚填年龄（为满足参军、加工作上学换届等需要更改年龄）</li>
                    <li>涂改造假</li>
                  </ol>
                  若出现以上情况，须在“存在问题”处列出。
                </li>
                <li>若“记载情况是否一致”为是，则“国内最早参加工作材料记载”、“组织人事部门形成的相关材料”可不必填。</li>
                <li>“国内最早参加工作材料记载”参考可报到派遣证、回国人员证明、博士后进站材料等；“组织人事部门形成的相关材料”参考工资审批表、转正定级表、干部任免审批表等。</li>
              </ol>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="初审认定参加工作时间" prop="workDate" label-width="170px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.初审认定参加工作时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定参加工作时间" label-width="160px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.复审认定参加工作时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="记载情况是否一致" prop="workIsTrue1" label-width="150px">
                  <el-select v-model="user.参加工作时间记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="真实性存疑" prop="workIsTrue2">
                  <el-select v-model="user.参加工作时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织是否进行过认定" prop="workIsTrue3" label-width="170px">
                  <el-select v-model="user.参加工作时间组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="国内最早参加工作材料记载" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user. 国内最早参加工作材料记载" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="组织人事部门形成的相关材料" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user. 参加工作时间组织人事相关材料" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="参加工作时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user.参加工作时间存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">入党时间</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>【入党时间】：</p>
              <ol>
                <li>入党时间指的是加入中国共产党的时间，一律用公历填写，年份用4位数字表示，月份用2位数字表示。</li>
                <li>若“入党时间是否一致”为“是”，则“组织人事部门形成的相关材料”不必填，否则必填。一般为干部履历表等，若入党后没有材料填过入党时间，可空。</li>
                <li>民主党派成员或无党派人士，按照实际情况填写。在《干部基本信息审核表》中，需在“入党时间”栏内注明民主党派名称或注明无党派，如“民建”
                  “无党派”等，不填写加入民主党派的时间；加入多个民主党派的，须如实填写，各项之间用分号隔开，如“民建；民盟”。
                </li>
                <li>是民主党派成员又是中共党员的，在《干部基本信息审核表》中，先填写加入中共时间，分号隔开后再填写民主党派名称，如“2001-08；民建”。</li>
              </ol>
            </div>
            <el-row>
              <el-col :span="4">
                <el-form-item label="政治面貌" prop="politicStatus" label-width="80px">
                  <el-select v-model="user.政治面貌" placeholder="请选择" @change="isPartyer">
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
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.初审认定入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="复审认定入党时间" v-show="showPartyDate" label-width="150px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="user.复审认定入党时间"
                                  style="width: 130px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="中共党员入党时间记载情况是否一致" v-show="showPartyDate" prop="partyIsTrue1" label-width="250px">
                  <el-select v-model="user.入党时间记载情况是否一致" style="width: 100px">
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
                  <el-select v-model="user.入党时间真实性存疑" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织是否进行过认定" prop="partyIsTrue3" label-width="150px">
                  <el-select v-model="user.入党时间组织是否进行过认定" style="width: 100px">
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
                      :key="item"
                      :label="item"
                      :value="item">
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
              <el-input type="textarea" :rows="2" v-model="user.入党时间组织人事相关材料" style="width: 500px"/>
            </el-form-item>
            <el-form-item label="入党时间存在问题" prop="入党时间存在问题" label-width="200px">
              <el-input type="textarea" :rows="2" v-model="user.入党时间存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">学历学位材料</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>【学历学位】：</p>
              <ol>
                <li>如实填写，获得学历但没有获得学位的学习经历，学位填“无”；获得学位但没有学历的学习经历，学历填“无”。</li>
                <li>【全日制学历学位】的填写：学习期间以全脱产形式，无考核材料、工资材料；</br>
                  【在职学历学位】的填写：学习期间非全脱产形式，有考核材料和工资材料。
                </li>
                <li>【请注意】：若组织人事形成的相关材料中，有把“把培训经历填为学历”、“把低学历填为高学历”、“把在职填为全日制”、“把无学位填为有学位”的情况，须在“存在问题”中填写情况，并注明档案类号及材料名称。
                </li>
              </ol>
            </div>
            <el-row>
              <el-col :span="6">
                <el-form-item label="全日制最高学历" prop="全日制最高学历" label-width="120px">
                  <el-select v-model="user.全日制最高学历" placeholder="请选择">
                    <el-option
                      v-for="item in 学历字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="全日制最高学位" prop="全日制最高学位" label-width="120px">
                  <el-select v-model="user.全日制最高学位" placeholder="请选择">
                    <el-option
                      v-for="item in 学位字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学历" prop="在职最高学历" label-width="100px">
                  <el-select v-model="user.在职最高学历" placeholder="请选择">
                    <el-option
                      v-for="item in 学历字典"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="在职最高学位" prop="在职最高学位" label-width="100px">
                  <el-select v-model="user.在职最高学位" placeholder="请选择">
                    <el-option
                      v-for="item in 学位字典"
                      :key="item"
                      :label="item"
                      :value="item">
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
                  <el-select v-model="user.学历学位记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="真实性存疑" prop="eduIsTrue2">
                  <el-select v-model="user.学历学位真实性存疑" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织是否进行过认定" prop="eduIsTrue3" label-width="150px">
                  <el-select v-model="user.学历学位组织是否进行过认定" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="学习经历">
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
                          :key="item"
                          :label="item"
                          :value="item">
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
                          :key="item"
                          :label="item"
                          :value="item">
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
              <el-input type="textarea" :rows="2" v-model="user.学历学位存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">工作经历</h4>
            <div class="note">
              <p>填写说明:</p>
              <p>【工作经历】：含境外博士后、访问学者经历。</p>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="记载情况是否一致" prop="experienceIsTrue1" label-width="150px">
                  <el-select v-model="user.工作经历记载情况是否一致" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="真实性存疑" prop="experienceIsTrue2">
                  <el-select v-model="user.工作经历真实性存疑" style="width: 100px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织是否进行过认定" prop="experienceIsTrue3" label-width="150px">
                  <el-select v-model="user.工作经历组织是否进行过认定" style="width: 100px">
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
              <el-input type="textarea" :rows="2" v-model="user.工作经历存在问题" style="width: 500px"/>
            </el-form-item>
          </div>
        </div>
        <div class="cell">
          <div class="container">
            <h4 style="text-align:center">奖惩情况</h4>
            <div class="note">
              <p>填写说明:</p>
              <ul>
                <li>【年度考核结果】：填写近两年的年度考核情况，没有年度考核结果的，应采取写实的办法注明。</li>
                <li>【奖惩情况】：填写重要的奖励或记功、受处分的情况，主要为县处级以上奖励。受过处分的，
                  要填写何年何月因何问题经何单位批准受何种处分等等。没有受过奖励和处分的，应填写“无”。
                </li>
                <li>【请注意】：填写的“奖励情况”，在档案中必须有相关证明材料。</li>
              </ul>
            </div>
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
            <div class="note">
              <p>填写说明:</p>
              <p>【家庭主要成员及社会关系】：</p>
              <ol>
                <li>主要填写干部本人的配偶、子女和父母的有关情况。
                  亲属中担任或曾担任过有关领导职务的人员以及重要海外关系也要如实填写，已去世、退休的，应在原工作单位及职务后加括号注明。
                </li>
                <li>“称谓”：如果关系为配偶，则填写为妻子或丈夫；关系为子女，则填写为儿子或女儿，
                  多子女填写为长子、次子、三子、长女、次女、三女等；关系为父母，则填写为父亲或母亲；关系为配偶的父母，
                  则填写为岳父、岳母、公公、婆婆；关系为子女的配偶，则填写为儿媳或女婿。
                </li>
                <li>“工作/学习单位及职务”：尚在读书的家庭成员应标明学校，如“东南大学学生”。没有工作单位的家庭成员应标明居住地，具体到乡镇（街道），
                  如“江苏省南京市玄武区四牌楼”。家庭成员中有在国（境）外学习、工作、定居的和在中外合资或外资企业工作的，其所在院校、工作单位及职务、定居地点，
                  应全部如实填写。家庭成员中凡加入外国国籍或持有外国永久居留证（长期居留权）的必须注明。
                </li>
                <li>重要社会关系：重要社会关系是指直系血亲、三代以内旁系血亲以及近姻亲中的重要人员。</li>
              </ol>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="应添人员是否填写齐全" prop="familyIsTrue1" label-width="200px">
                  <el-select v-model="user.应添人员是否填写齐全" style="width: 100px">
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
      </div>
    </el-form>
  </div>
</template>

<script>
import 基本信息 from '@/api/service/基本信息'
import 审核情况 from '@/api/service/审核情况'
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
      管理岗位等级字典: ['管理岗位一级'],
      专业技术岗位等级字典: ['专业技术岗位一级'],
      查询条件: '0',
      政治面貌字典: ['党员'],
      单位字典: ['建筑学院'],
      学历字典: ['硕士研究生'],
      学位字典: ['工学硕士学位'],
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
      审核情况:{
        初审时间: new Date(),
        初审状态: '未审核',
      },
      审核情况rules: {

      },
      user: {
        学习经历列表: [{}],
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
        }else{
        }
      } else if (this.查询条件 === '1') { // 只根据职工号查询
        if (this.基本信息.职工号 === '') {
          alert("请填写职工号");
        }
      } else if (this.查询条件 === '2') {
        if (this.基本信息.单位 === '' || this.基本信息.姓名 === '') {
          alert("请填写单位和姓名");
        }
      }
    },
    // 基本信息中新增按钮
    add() {
      this.isShow = true; // 显示后面模块
      this.isDisabled = true; // 禁用查询和新增按钮
    },
    save1(){
      基本信息.save(this.基本信息)
    },
    update1(){
      基本信息.update(this.基本信息)
    },
    save2(){
      this.审核情况.职工号 = this.基本信息.职工号
      审核情况.save(this.审核情况)
    },
    update2(){
      this.审核情况.职工号 = this.基本信息.职工号
      审核情况.update(this.审核情况)
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
      valve.save(this.user)
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
