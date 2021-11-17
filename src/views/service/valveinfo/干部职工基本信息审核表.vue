<template>
  <div class="app-container">
    <el-form
      :model="user"
      :rules="userrules"
      ref="user"
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
                <el-input :disabled="inputdisabled" v-model="user.职工号" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="单位" prop="单位">
                <el-select
                  v-model="user.单位"
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
                  v-model="user.姓名"
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
            <el-col :span="4">
              <el-button
                type="primary"
                :disabled="searchdisabled"
                size="mini"
                @click="search"
                >查找</el-button
              >
              <el-button
                type="danger"
                v-show="cancelshow"
                size="mini"
                @click="goback"
                >取消</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="性别" prop="性别">
                <el-select v-model="user.性别" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="民族" prop="民族">
                <el-input
                  v-model="user.民族"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="籍贯">
                <el-input
                  v-model="user.籍贯"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="出生地">
                <el-input
                  v-model="user.出生地"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="健康状况">
                <el-input
                  v-model="user.健康状况"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="现任职务" label-width="90px">
                <el-input
                  v-model="user.现任职务"
                  controls-position="right"
                  :min="0"
                  style="width: 100px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业技术职务（职称）" label-width="180px">
                <el-input
                  v-model="user.专业技术职务职称"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="熟悉专业、有何特长">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="user.熟悉专业有何特长"
                  style="width: 450px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="初审认定出生时间" label-width="150px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.初审认定出生时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="初审认定参加工作时间" label-width="170px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.初审认定参加工作时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="初审认定入党时间" label-width="150px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.初审认定入党时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="复审认定出生时间" label-width="150px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.复审认定出生时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="复审认定参加工作时间" label-width="170px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.复审认定参加工作时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="复审认定入党时间" label-width="150px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.复审认定入党时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="出生年月">
                <el-date-picker
                  type="month"
                  placeholder="选择出生年月"
                  v-model="user.出生年月"
                  value-format="yyyy-MM"
                  style="width: 140px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="年龄">
                <el-input v-model="user.年龄"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="参加工作时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.参加工作时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="入党时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.入党时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="进入本校时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 120px"
                  v-model="user.进入本校时间"
                ></el-date-picker>
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
              <el-form-item label="初审人职工号" prop="初审人职工号">
                <el-input
                  v-model="user.初审人职工号"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审人" prop="初审人">
                <el-input
                  v-model="user.初审人"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审人单位" prop="初审人单位">
                <el-select
                  v-model="user.初审人单位"
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
                  v-model="user.初审时间"
                  style="width: 180px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初审状态" prop="初审状态">
                <el-select v-model="user.初审状态" style="width: 100px">
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
                  v-model="user.复审人职工号"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审人" prop="复审人">
                <el-input
                  v-model="user.复审人"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审人单位" prop="复审人单位">
                <el-select
                  v-model="user.复审人单位"
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
                  v-model="user.复审时间"
                  style="width: 180px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="复审状态" prop="复审状态">
                <el-select v-model="user.复审状态" style="width: 100px">
                  <el-option label="未初审" value="未初审"></el-option>
                  <el-option label="初审中" value="初审中"></el-option>
                  <el-option label="完成初审" value="完成初审"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <h4 style="text-align: center">最高学历学位</h4>
          <el-row>
            <el-col :span="5">
              <el-form-item label="全日制最高学历">
                <el-cascader
                  :show-all-levels="false"
                  :options="学历字典"
                  :props="学历字典属性"
                  v-model="user.全日制最高学历"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="全日制最高学位">
                <el-cascader
                  :show-all-levels="false"
                  :options="学位字典"
                  :props="学位字典属性"
                  v-model="user.全日制最高学位"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="在职最高学历" prop="在职最高学历">
                <el-cascader
                  :show-all-levels="false"
                  :options="学历字典"
                  :props="学历字典属性"
                  v-model="user.在职最高学历"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="在职最高学位">
                <el-cascader
                  :show-all-levels="false"
                  :options="学位字典"
                  :props="学位字典属性"
                  v-model="user.在职最高学位"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="全日制最高学历毕业院校、系及专业"
                label-width="150px"
              >
                <el-input
                  v-model="user.全日制最高学历毕业院校系及专业"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="全日制最高学位毕业院校、系及专业"
                label-width="150px"
              >
                <el-input
                  v-model="user.全日制最高学位毕业院校系及专业"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="在职最高学历毕业院校、系及专业"
                label-width="150px"
              >
                <el-input
                  v-model="user.在职最高学历毕业院校系及专业"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="在职最高学位毕业院校、系及专业"
                label-width="150px"
              >
                <el-input
                  v-model="user.在职最高学位毕业院校系及专业"
                  style="width: 168px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="note">
            <p>【最高学历学位】：填写说明:</p>
            <ul>
              <li>
                “全日制教育”栏，填写通过全日制教育获得的最高学历学位；“在职教育”栏，填写以其他学习方式获得的最高学历学位。
              </li>
              <li>
                “毕业院校系及专业”栏，填写与学历学位相对应的毕业院校（科研院所等，下同）、系和专业，且应为毕业时院校系及专业名称。如原毕业院校系及专业现已更名，可加括号注明，不得直接填写现在的院校系及专业名称。
              </li>
              <li>
                获得学历同时也获得学位的，应同时填写，并写明何学科学位。如，通过全日制教育获得了大学本科学历、理学学士学位，就在“全日制教育”栏分两行填写,上行填写“大学”，下行填写“理学学士”。
              </li>
              <li>
                获得学历但没有学位的或以同等学力攻读并获得学位的，按获得的学历或学位如实填写。如果一个人同时有这两种情况，且分别为其最高学历、学位，则这两种情况均填写。如，通过在职学习，先获得研究生学历（没有学位），后又以同等学力攻读学位，获得了经济学硕士，则在“在职教育”栏分两行填写,上行填写“研究生”，下行填写“经济学硕士”。“毕业院校系及专业”栏相对应地要将两个毕业院校、系及专业填入。
              </li>
              <li>
                学历和学位的填写，一般分为两行，学历在第一行，学位在第二行，左右居中。如果只有学历或只有学位，则打印显示为一行，上下左右居中。
              </li>
              <li>
                学历的毕业院校系及专业和学位的毕业院校系及专业分为两行填写，学历毕业院校系及专业在第一行，学位毕业院校系及专业在第二行，居左显示。如果学历或学位在同一个毕业院校系及专业取得，则只填写一行，显示上下居中、居左。
              </li>
            </ul>
          </div>
          <el-row>
            <el-col :span="11">
              <el-form-item
                label="全日制教育最高学历学位"
                prop="日制教育最高学历学位"
                label-width="250px"
              >
                <el-input
                  type="textarea"
                  :rows="1"
                  v-model="user.全日制教育最高学历学位"
                  style="width: 250px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="全日制教育毕业院校系及专业"
                prop="全日制教育毕业院校、系及专业"
                label-width="250px"
              >
                <el-input
                  type="textarea"
                  :rows="1"
                  v-model="user.全日制教育毕业院校系及专业"
                  style="width: 250px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item
                label="在职教育最高学历学位"
                prop="在职教育最高学历学位"
                label-width="250px"
              >
                <el-input
                  type="textarea"
                  :rows="1"
                  v-model="user.在职教育最高学历学位"
                  style="width: 250px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="在职教育毕业院校系及专业"
                prop="在职教育毕业院校、系及专业"
                label-width="250px"
              >
                <el-input
                  type="textarea"
                  :rows="1"
                  v-model="user.在职教育毕业院校系及专业"
                  style="width: 250px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <br />
          <br />
          <h4 style="text-align: center">简历</h4>
          <div class="note">
            <p>【简历】填写说明:</p>
            <ul>
              <li>
                从参加工作时填起，大、中专院校学习毕业后参加工作的，从大、中专院校学习时填起，一段经历先填起止时间，后填学习所在院校系及专业或工作单位及职务。
              </li>
              <li>
                起止时间填写到年月（年份用4位数字表示，月份用2位数字表示），起止之间用“--”连接，格式显示为：“1991.01--2000.01”。
              </li>
              <li>
                起止时间输入完毕后输入两个空格，之后输入汉字部分。最近一段简历若无结束时间，则结束时间可用7个空格代替，与起止时间后的两空格共连续输入9个空格，格式显示为：“1991.01--
                ”，之后输入汉字部分。
              </li>
              <li>
                各段经历时间要前后衔接，上一段经历的结束时间即为下一段经历的开始时间，不得空断，因病休学、休养、待分配等都要如实填写。
              </li>
              <li>工作单位和职务一律使用规范的简称。</li>
            </ul>
          </div>
          <h5 style="text-align: left">&emsp;&emsp;学习经历</h5>
          <el-table :data="user.学习经历" align="center" border>
            <el-table-column prop="入学时间" label="入学时间" width="100px" :key="random">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.入学时间"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.入学时间}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="毕业时间" label="毕业时间" width="100px" >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.毕业时间"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.毕业时间}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="所学专业" label="所学专业" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.所学专业"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.所学专业}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="学历" label="学历" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.学历"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.学历}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="学位" label="学位" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.学位"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.学位}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="获得学历的院校或机构"
              label="获得学历的院校或机构"
              width="250px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.获得学历的院校或机构"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.获得学历的院校或机构}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="获得学位的院校或机构"
              label="获得学位的院校或机构"
              width="250px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.获得学位的院校或机构"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.获得学位的院校或机构}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="获得学历的国家"
              label="获得学历的国家（地区）"
              width="250px"
            >
            </el-table-column>
            <el-table-column
              prop="获得学位的国家"
              label="获得学位的国家（地区）"
              width="250px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.获得学位的国家"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.获得学位的国家}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.$index,scope.row)"  type="text" size="small" v-if="!scope.row.isEdit">编辑</el-button>
                  <el-button @click="save(scope.$index,scope.row)" type="text" size="small" v-else>确认</el-button>
                </template>
              </el-table-column>
          </el-table>
          <br />
          <br />
          <h5 style="text-align: left">&emsp;&emsp;工作经历</h5>
          <el-table :data="user.工作经历" align="center" border>
            <el-table-column prop="起始时间" label="起始时间" width="100px" :key="random1">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.起始时间"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.起始时间}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="终止时间" label="终止时间" width="100px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.终止时间"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.终止时间}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="所在单位名称"
              label="所在单位名称"
              width="150px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.所在单位名称"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.所在单位名称}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="从事工作" label="从事工作" width="250px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.从事工作"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.从事工作}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="曾任党政职务"
              label="曾任党政职务"
              width="250px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.曾任党政职务"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.曾任党政职务}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="曾任专业技术职务"
              label="曾任专业技术职务"
              width="250px"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.曾任专业技术职务"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.曾任专业技术职务}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="备注" label="备注" width="250px">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.备注"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.备注}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="edit1(scope.$index,scope.row)" type="text" size="small" v-if="!scope.row.isEdit">编辑</el-button>
                <el-button @click="save(scope.$index,scope.row)" type="text" size="small" v-else>确认</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <br />
          <h5 style="text-align: left">&emsp;&emsp;简历</h5>
          <el-input
            class="简历"
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            style="width: 1200px"
            v-model="user.简历"
          >
          </el-input>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <h4 style="text-align: center">奖惩情况</h4>
          <div class="note">
            <p>【年度考核结果】填写说明:</p>
            <ul>
              <li>
                填写近两年的年度考核情况，没有年度考核结果的，应采取写实的办法注明。
              </li>
            </ul>
            <p>【奖惩情况】填写说明:</p>
            <ul>
              <li>
                填写重要的奖励或记功、受处分的情况，主要为县处级以上奖励。受过处分的，要填写何年何月因何问题经何单位批准受何种处分等等。没有受过奖励和处分的，应填写“无”。
              </li>
            </ul>
          </div>
          <el-row>
            <el-col :span="7">
              <el-form-item
                label="2019年年度考核结果"
                prop="awardResult2019"
                label-width="150px"
              >
                <el-select v-model="user.a2019年考核结果" placeholder="请选择">
                  <el-option
                    v-for="item in 考核结果字典"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                label="2019年年度考核备注"
                prop="awardResult备注2019"
                label-width="150px"
              >
                <el-input
                  v-model="user.a2019年考核备注"
                  style="width: 250px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item
                label="2020年年度考核结果"
                prop="awardResult2020"
                label-width="150px"
              >
                <el-select v-model="user.a2020年考核结果" placeholder="请选择">
                  <el-option
                    v-for="item in 考核结果字典"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                label="2020年年度考核备注"
                prop="awardResult备注2020"
                label-width="150px"
              >
                <el-input
                  v-model="user.a2020年考核备注"
                  style="width: 250px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h5 style="text-align: left">&emsp;&emsp;奖励情况</h5>
          <el-table
              :data="user.奖励情况记录"
              align="left"
              border
              height="200"
            >
            <el-table-column label="奖励时间" width="300px" :key="random3">
                    <template slot-scope="scope">
                      <div v-if="scope.row.seen">
                        <el-input v-model="scope.row.奖励时间"/>
                      </div>
                      <div v-else>
                        <span style="margin-left: 10px">{{scope.row.奖励时间}}}</span>
                      </div>
                    </template>
                  </el-table-column>
            <el-table-column label="奖励情况" width="300px" >
                <template slot-scope="scope">
                  <div v-if="scope.row.seen">
                    <el-input v-model="scope.row.奖励情况"/>
                  </div>
                  <div v-else>
                    <span style="margin-left: 10px">{{scope.row.奖励情况}}}</span>
                  </div>
                </template>
              </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="edit3(scope.$index,scope.row)" type="text" size="small" v-if="!scope.row.isEdit">编辑</el-button>
                <el-button @click="save(scope.$index,scope.row)" type="text" size="small" v-else>确认</el-button>
              </template>
            </el-table-column>
              <!-- <el-table-column width="100px">
                <template slot-scope="scope">
                  <el-button
                    @click.prevent="removeAward(scope.row)"
                    style="width: 70px"
                    type="danger"
                    icon="el-icon-delete"
                    >删除
                  </el-button>
                </template>
              </el-table-column> -->
            </el-table>
          <h5 style="text-align: left">&emsp;&emsp;处分情况</h5>
          <el-table
            :data="user.处分情况记录"
            align="left"
            border
            height="200"
            >
            <el-table-column label="处分时间" width="300px" :key="random4">
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.处分时间"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.处分时间}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="处分情况" width="300px" >
              <template slot-scope="scope">
                <div v-if="scope.row.seen">
                  <el-input v-model="scope.row.处分情况"/>
                </div>
                <div v-else>
                  <span style="margin-left: 10px">{{scope.row.处分情况}}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="edit4(scope.$index,scope.row)" type="text" size="small" v-if="!scope.row.isEdit">编辑</el-button>
                <el-button @click="save(scope.$index,scope.row)" type="text" size="small" v-else>确认</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- <el-button
              icon="el-icon-plus"
              type="success"
              size="mini"
              @click="addPunish"
              >添加</el-button
            > -->
          <h5 style="text-align: left">&emsp;&emsp;奖惩情况</h5>
          <el-input
            class="简历"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            style="width: 1200px"
            v-model="user.奖惩情况"
          >
          </el-input>
          <h5 style="text-align: left">&emsp;&emsp;年度考核结果</h5>
          <el-input
            class="简历"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            style="width: 1200px"
            v-model="user.年度考核结果"
          >
          </el-input>
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <h4 style="text-align: center">家庭主要成员及重要社会关系</h4>
          <el-form-item label="家庭主要成员及重要社会关系">
            <el-table
              :data="user.家庭成员记录"
              align="center"
              border
              style="width: 99%; margin-top: 10px"
              height="250"
            >
              <el-table-column label="称谓">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.称谓`"
                    :rules="rules.chinaName"
                  >
                    <el-input v-model="scope.row.称谓" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.姓名`"
                    :rules="rules.chinaName"
                  >
                    <el-input v-model="scope.row.姓名" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="出生年月">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.出生年月`"
                    :rules="rules.chinaName"
                  >
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="scope.row.出生年月"
                      style="width: 130px"
                    ></el-date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="政治面貌">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.政治面貌`"
                    :rules="rules.chinaName"
                  >
                    <el-select
                      v-model="scope.row.政治面貌"
                      filterable
                      placeholder="输入搜索"
                    >
                      <el-option
                        v-for="item in 政治面貌字典"
                        :key="item.政治面貌"
                        :label="item.政治面貌"
                        :value="item.政治面貌"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="工作/学习单位及职务">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.单位及职务`"
                    :rules="rules.phone"
                  >
                    <el-input v-model="scope.row.单位及职务" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="现居住地">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`家庭成员记录.${scope.$index}.现居住地`"
                    :rules="rules.phone"
                  >
                    <el-input v-model="scope.row.现居住地" />
                  </el-form-item>
                </template>
              </el-table-column>
              <!-- <el-table-column width="100px">
                <template slot-scope="scope">
                  <el-button
                    @click.prevent="removeFamily(scope.row)"
                    style="width: 70px"
                    type="danger"
                    icon="el-icon-delete"
                    >删除
                  </el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </el-form-item>
        </div>
      </div>
      <div class="cell" v-show="divshow">
        <div class="container">
          <h4 style="text-align: center">单位审核意见</h4>
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入单位审核意见"
            v-model="user.单位审核意见"
            style="margin-left: 100px; width: 1100px"
          ></el-input>
        </div>
      </div>
      <div class="mybottom" v-show="divshow">
        <el-form-item style="text-align: center">
          <el-button
            type="success"
            @click="saveOrUpdate"
            :disabled="commitdisabled"
            >提交</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getInfoRecord, putInfoRecord } from "@/api/service/干部基本信息审核表";
import 基本信息 from "@/api/service/基本信息";
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
      random:0,
      random1:1,
      random2:2,
      random3:3,
      random4:4,
      学历字典属性: {
        label: "value",
        emitPath: false,
      },
      学位字典属性: {
        label: "value",
        emitPath: false,
      },
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
      政治面貌字典: [
        // "党员",
        // "中共预备党员",
        // "共青团员",
        // "民革党员",
        // "民盟盟员",
        // "民建会员",
        // "民进会员",
        // "农工党党员",
        // "致公党党员",
        // "九三学社社员",
        // "台盟盟员",
        // "无党派人士",
        // "群众",
      ],
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
      学历字典: [
        // {
        //   value: "研究生教育",
        //   label: "研究生教育",
        //   children: [
        //     {
        //       value: "博士研究生",
        //       label: "博士研究生",
        //     },
        //     {
        //       value: "硕士研究生",
        //       label: "硕士研究生",
        //     },
        //     {
        //       value: "中央党校研究生",
        //       label: "中央党校研究生",
        //     },
        //     {
        //       value: "省(区、市)委党校研究生",
        //       label: "省(区、市)委党校研究生",
        //     },
        //   ],
        // },
        // {
        //   value: "本科教育",
        //   label: "本科教育",
        //   children: [
        //     {
        //       value: "大学",
        //       label: "大学",
        //     },
        //     {
        //       value: "中央党校大学",
        //       label: "中央党校大学",
        //     },
        //     {
        //       value: "省(区、市)委党校大学",
        //       label: "省(区、市)委党校大学",
        //     },
        //   ],
        // },
        // {
        //   value: "专科教育",
        //   label: "专科教育",
        //   children: [
        //     {
        //       value: "大专",
        //       label: "大专",
        //     },
        //     {
        //       value: "省(区、市)委党校大专",
        //       label: "省(区、市)委党校大专",
        //     },
        //     {
        //       value: "中央党校大专",
        //       label: "中央党校大专",
        //     },
        //   ],
        // },
      ],
      学位: [],
      学位字典: [
        // {
        //   value: "博士",
        //   label: "博士",
        //   children: [
        //     {
        //       value: "哲学博士学位",
        //       label: "哲学博士学位",
        //     },
        //     {
        //       value: "经济学博士学位",
        //       label: "经济学博士学位",
        //     },
        //     {
        //       value: "法学博士学位",
        //       label: "法学博士学位",
        //     },
        //     {
        //       value: "教育学博士学位",
        //       label: "教育学博士学位",
        //     },
        //     {
        //       value: "文学博士学位",
        //       label: "文学博士学位",
        //     },
        //     {
        //       value: "历史学博士学位",
        //       label: "历史学博士学位",
        //     },
        //     {
        //       value: "理学博士学位",
        //       label: "理学博士学位",
        //     },
        //     {
        //       value: "工学博士学位",
        //       label: "工学博士学位",
        //     },
        //     {
        //       value: "农学博士学位",
        //       label: "农学博士学位",
        //     },
        //     {
        //       value: "医学博士学位",
        //       label: "医学博士学位",
        //     },
        //     {
        //       value: "军事学博士学位",
        //       label: "军事学博士学位",
        //     },
        //     {
        //       value: "管理学博士学位",
        //       label: "管理学博士学位",
        //     },
        //     {
        //       value: "艺术学博士学位",
        //       label: "艺术学博士学位",
        //     },
        //     {
        //       value: "教育博士专业学位",
        //       label: "教育博士专业学位",
        //     },
        //     {
        //       value: "工程博士专业学位",
        //       label: "工程博士专业学位",
        //     },
        //     {
        //       value: "临床医学博士专业学位",
        //       label: "临床医学博士专业学位",
        //     },
        //     {
        //       value: "兽医博士专业学位",
        //       label: "兽医博士专业学位",
        //     },
        //     {
        //       value: "口腔医学博士专业学位",
        //       label: "口腔医学博士专业学位",
        //     },
        //   ],
        // },
        // {
        //   value: "硕士",
        //   label: "硕士",
        //   children: [
        //     {
        //       value: "哲学硕士学位",
        //       label: "哲学硕士学位",
        //     },
        //     {
        //       value: "经济学硕士学位",
        //       label: "经济学硕士学位",
        //     },
        //     {
        //       value: "法学硕士学位",
        //       label: "法学硕士学位",
        //     },
        //     {
        //       value: "教育学硕士学位",
        //       label: "教育学硕士学位",
        //     },
        //     {
        //       value: "文学硕士学位",
        //       label: "文学硕士学位",
        //     },
        //     {
        //       value: "历史学硕士学位",
        //       label: "历史学硕士学位",
        //     },
        //     {
        //       value: "理学硕士学位",
        //       label: "理学硕士学位",
        //     },
        //     {
        //       value: "工学硕士学位",
        //       label: "工学硕士学位",
        //     },
        //     {
        //       value: "农学硕士学位",
        //       label: "农学硕士学位",
        //     },
        //     {
        //       value: "医学硕士学位",
        //       label: "医学硕士学位",
        //     },
        //     {
        //       value: "军事学硕士学位",
        //       label: "军事学硕士学位",
        //     },
        //     {
        //       value: "管理学硕士学位",
        //       label: "管理学硕士学位",
        //     },
        //     {
        //       value: "艺术学硕士学位",
        //       label: "艺术学硕士学位",
        //     },
        //     {
        //       value: "法律硕士专业学位",
        //       label: "法律硕士专业学位",
        //     },
        //     {
        //       value: "教育硕士专业学位",
        //       label: "教育硕士专业学位",
        //     },
        //     {
        //       value: "工程硕士专业学位",
        //       label: "工程硕士专业学位",
        //     },
        //     {
        //       value: "建筑学硕士专业学位",
        //       label: "建筑学硕士专业学位",
        //     },
        //     {
        //       value: "临床医学硕士专业学位",
        //       label: "临床医学硕士专业学位",
        //     },
        //     {
        //       value: "工商管理硕士专业学位",
        //       label: "工商管理硕士专业学位",
        //     },
        //     {
        //       value: "农业推广硕士专业学位",
        //       label: "农业推广硕士专业学位",
        //     },
        //     {
        //       value: "兽医硕士专业学位",
        //       label: "兽医硕士专业学位",
        //     },
        //     {
        //       value: "公共管理硕士专业学位",
        //       label: "公共管理硕士专业学位",
        //     },
        //     {
        //       value: "口腔医学硕士专业学位",
        //       label: "口腔医学硕士专业学位",
        //     },
        //     {
        //       value: "公共卫生硕士专业学位",
        //       label: "公共卫生硕士专业学位",
        //     },
        //     {
        //       value: "军事硕士专业学位",
        //       label: "军事硕士专业学位",
        //     },
        //     {
        //       value: "金融硕士专业学位",
        //       label: "金融硕士专业学位",
        //     },
        //     {
        //       value: "应用统计硕士专业学位",
        //       label: "应用统计硕士专业学位",
        //     },
        //     {
        //       value: "税务硕士专业学位",
        //       label: "税务硕士专业学位",
        //     },
        //     {
        //       value: "国际商务硕士专业学位",
        //       label: "国际商务硕士专业学位",
        //     },
        //     {
        //       value: "保险硕士专业学位",
        //       label: "保险硕士专业学位",
        //     },
        //     {
        //       value: "资产评估硕士专业学位",
        //       label: "资产评估硕士专业学位",
        //     },
        //     {
        //       value: "审计硕士专业学位",
        //       label: "审计硕士专业学位",
        //     },
        //     {
        //       value: "社会工作硕士专业学位",
        //       label: "社会工作硕士专业学位",
        //     },
        //     {
        //       value: "警务工作硕士专业学位",
        //       label: "警务工作硕士专业学位",
        //     },
        //     {
        //       value: "体育硕士专业学位",
        //       label: "体育硕士专业学位",
        //     },
        //     {
        //       value: "汉语国际教育硕士专业学位",
        //       label: "汉语国际教育硕士专业学位",
        //     },
        //     {
        //       value: "应用心理硕士专业学位",
        //       label: "应用心理硕士专业学位",
        //     },
        //     {
        //       value: "翻译硕士专业学位",
        //       label: "翻译硕士专业学位",
        //     },
        //     {
        //       value: "新闻与传播硕士专业学位",
        //       label: "新闻与传播硕士专业学位",
        //     },
        //     {
        //       value: "出版硕士专业学位",
        //       label: "出版硕士专业学位",
        //     },
        //     {
        //       value: "文物与博物馆硕士专业学位",
        //       label: "文物与博物馆硕士专业学位",
        //     },
        //     {
        //       value: "城市规划硕士专业学位",
        //       label: "城市规划硕士专业学位",
        //     },
        //     {
        //       value: "风景园林硕士专业学位",
        //       label: "风景园林硕士专业学位",
        //     },
        //     {
        //       value: "林业硕士专业学位",
        //       label: "林业硕士专业学位",
        //     },
        //     {
        //       value: "护理硕士专业学位",
        //       label: "护理硕士专业学位",
        //     },
        //     {
        //       value: "药学硕士专业学位",
        //       label: "药学硕士专业学位",
        //     },
        //     {
        //       value: "中药学硕士专业学位",
        //       label: "中药学硕士专业学位",
        //     },
        //     {
        //       value: "会计硕士专业学位",
        //       label: "会计硕士专业学位",
        //     },
        //     {
        //       value: "旅游管理硕士专业学位",
        //       label: "旅游管理硕士专业学位",
        //     },
        //     {
        //       value: "图书情报硕士专业学位",
        //       label: "图书情报硕士专业学位",
        //     },
        //     {
        //       value: "工程管理硕士专业学位",
        //       label: "工程管理硕士专业学位",
        //     },
        //     {
        //       value: "艺术硕士专业学位",
        //       label: "艺术硕士专业学位",
        //     },
        //   ],
        // },
        // {
        //   value: "学士",
        //   label: "学士",
        //   children: [
        //     {
        //       value: "哲学学士学位",
        //       label: "哲学学士学位",
        //     },
        //     {
        //       value: "经济学学士学位",
        //       label: "经济学学士学位",
        //     },
        //     {
        //       value: "法学学士学位",
        //       label: "法学学士学位",
        //     },
        //     {
        //       value: "教育学学士学位",
        //       label: "教育学学士学位",
        //     },
        //     {
        //       value: "文学学士学位",
        //       label: "文学学士学位",
        //     },
        //     {
        //       value: "历史学学士学位",
        //       label: "历史学学士学位",
        //     },
        //     {
        //       value: "理学学士学位",
        //       label: "理学学士学位",
        //     },
        //     {
        //       value: "工学学士学位",
        //       label: "工学学士学位",
        //     },
        //     {
        //       value: "农学学士学位",
        //       label: "农学学士学位",
        //     },
        //     {
        //       value: "医学学士学位",
        //       label: "医学学士学位",
        //     },
        //     {
        //       value: "军事学学士学位",
        //       label: "军事学学士学位",
        //     },
        //     {
        //       value: "管理学学士学位",
        //       label: "管理学学士学位",
        //     },
        //     {
        //       value: "艺术学学士学位",
        //       label: "艺术学学士学位",
        //     },
        //     {
        //       value: "建筑学学士专业学位",
        //       label: "建筑学学士专业学位",
        //     },
        //   ],
        // },
        // {
        //   value: "无",
        //   label: "无",
        // },
      ],
      考核结果字典: ["优秀"],
      // 基本信息: {
      //   职工号: "",
      //   单位: "",
      //   姓名: "",
      // },
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
      审核情况: {
        初审时间: new Date(),
        初审状态: "未审核",
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
      出生时间rules: {},
      参加工作时间rules: {},
      入党时间rules: {},
      学历学位材料rules: {},
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
      searchdisabled: false,
      inputdisabled: false,
      isShow: false,
      seen: false,
      isDisabled: false,
      showPartyDate: false,
      cancelshow: false,
      divshow: false,
      isEdit: false,
      commitdisabled: true,
      user: {
        职工号: "",
        单位: "",
        姓名: "",
        性别: "",
        民族: "",
        籍贯: "",
        出生地: "",
        现任职务: "",
        健康状况: "",
        年龄: null,
        入党时间: "",
        进入本校时间: "",
        参加工作时间: "",
        出生年月: "",
        专业技术职务职称: "",
        熟悉专业有何特长: "",
        初审认定出生时间: "",
        复审认定出生时间: "",
        复审认定参加工作时间: "",
        初审认定参加工作时间: "",
        初审认定入党时间: "",
        复审认定入党时间: "",
        //审核情况8项
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
        //最高学历学位12项
        全日制最高学历: "",
        全日制最高学位: "",
        在职最高学历: "",
        在职最高学位: "",
        全日制最高学历毕业院校系及专业: "",
        全日制最高学位毕业院校系及专业: "",
        在职最高学历毕业院校系及专业: "",
        在职最高学位毕业院校系及专业: "",
        全日制教育最高学历学位: "",
        全日制教育毕业院校系及专业: "",
        在职教育最高学历学位: "",
        在职教育毕业院校系及专业: "",
        //简历3项
        学习经历: [],
        工作经历: [],
        简历: "",
        //奖惩情况8项
        a2019年考核结果: "",
        a2019年考核备注: "",
        a2020年考核结果: "",
        a2020年考核备注: "",
        奖励情况记录: [],
        处分情况记录: [],
        奖惩情况: "",
        年度考核结果: "",
        //家庭主要成员及社会关系
        家庭成员记录: [],
        //单位审核意见
        单位审核意见: "",
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
      this.政治面貌字典 = response.data.政治面貌字典;
      this.单位字典 = response.data.单位字典;
      this.学历字典 = response.data.学历字典;
      this.学位字典 = response.data.学位字典;
      //console.log(this.单位字典);
    });
  },
  methods: {
    // fetchedu() {
    //   axios.get("url").then(
    //     (response) => {
    //       this.最高学历学位 = response.最高学历学位;
    //     },
    //     (response) => {
    //       console.log("error");
    //       alert("请求失败");
    //     }
    //   );
    // },
    //#1 新增参数
    edit(index,row){
      this.random=Math.random();
      //console.log(index,row.seen);
      row.isEdit = true;
      row.seen = true;
      //console.log(row.seen);
    },
    save(index,row){
      row.isEdit = false;
      row.seen = false;
    },
    edit1(index,row){
      this.random1=Math.random();
      //console.log(index,row.seen);
      row.seen = true;
      row.isEdit = true;
      //console.log(row.seen);
    },
    edit2(index,row){
      this.random2=Math.random();
      //console.log(index,row.seen);
      row.seen = true;
      row.isEdit = true;
      //console.log(row.seen);
    },
    edit3(index,row){
      this.random3=Math.random();
      //console.log(index,row.seen);
      row.seen = true;
      row.isEdit = true;
      //console.log(row.seen);
    },
    edit4(index,row){
      this.random4=Math.random();
      //console.log(index,row.seen);
      row.seen = true;
      row.isEdit = true;
      //console.log(row.seen);
    },
    edit5(index,row){
      this.random5=Math.random();
      //console.log(index,row.seen);
      row.seen = true;
      //console.log(row.seen);
    },
    flush() {
      Object.keys(this.user).forEach((key) => (this.user[key] = ""));
      this.user.学习经历 = [];
      this.user.工作经历 = [];
      this.user.奖励情况记录 = [];
      this.user.处分情况记录 = [];
      this.user.家庭成员记录 = [];
      this.年龄 = null;
      this.出生时间 = "";
      this.参加工作时间 = "";
      this.入党时间 = "";
      this.commitdisabled = true;
      this.divshow = false;
    },
    // calculate() {
    //   if (
    //     this.user.复审认定出生时间 != null ||
    //     this.user.复审认定出生时间 != ""
    //   ) {
    //     var date = this.user.复审认定出生时间.substring(0, 7);
    //     this.出生年月 = date;
    //   } else {
    //     var date = this.user.复审认定出生时间.substring(0, 7);
    //     this.出生年月 = date;
    //   }
    //   this.年龄 = this.getAge(this.出生年月);
    //   if (
    //     this.user.复审认定参加工作时间 != null ||
    //     this.user.复审认定参加工作时间 != ""
    //   ) {
    //     this.参加工作时间 = this.user.复审认定参加工作时间;
    //   } else {
    //     this.参加工作时间 = this.user.初审认定参加工作时间;
    //   }
    //   if (
    //     this.user.复审认定入党时间 != null ||
    //     this.user.复审认定入党时间 != ""
    //   ) {
    //     this.入党时间 = this.user.复审认定参加工作时间;
    //   } else {
    //     this.入党时间 = this.user.初审认定参加工作时间;
    //   }
    //   console.log(this.入党时间);
    //   console.log(this.出生年月);
    //   console.log(this.年龄);
    //   console.log(this.参加工作时间);
    // },
    // editedu() {},
    // 查找信息
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
        this.user.出生年月 = this.user.出生年月+="-01";
        var userres = await putInfoRecord(this.user);
        //console.log(this.user.年龄);
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
          this.user.职工号 === "" ||
          this.user.单位 === "" ||
          this.user.姓名 === ""
        ) {
          alert("请填写职工号、单位和姓名");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.user.职工号;
          param.姓名 = this.user.姓名;
          param.单位 = this.user.单位;
          resp = await getInfoRecord(param);
        }
      } else if (this.查询条件 === "1") {
        // 只根据职工号查询
        if (this.user.职工号 === "") {
          alert("请填写职工号");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.user.职工号;
          param.姓名 = this.user.姓名;
          param.单位 = this.user.单位;
          resp = await getInfoRecord(param);
        }
      } else if (this.查询条件 === "2") {
        if (this.user.单位 === "" || this.user.姓名 === "") {
          alert("请填写单位和姓名");
          this.searchdisabled = false;
          this.inputdisabled = false;
          return;
        } else {
          param.职工号 = this.user.职工号;
          param.姓名 = this.user.姓名;
          param.单位 = this.user.单位;
          resp = await getInfoRecord(param);
        }
      }
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
        this.user = resp.data.user;
        this.user.出生年月 = this.user.出生年月.substring(0,7);
        //console.log(resp.data.user);
        //console.log(this.user.出生年月);
        let i;            //遍历变量
        for(i=0;i<this.user.学习经历.length;i++){
          this.user.学习经历[i].seen=false;
        }

        for (i=0;i<this.user.工作经历.length;i++){
          this.user.工作经历[i].seen=false;
        }

        for (i=0;i<this.user.奖励情况记录.length;i++){
          this.user.奖励情况记录[i].seen=false;
        }

        for (i=0;i<this.user.处分情况记录.length;i++){
          this.user.处分情况记录[i].seen=false;
        }

        for (i=0;i<this.user.家庭成员记录.length;i++){
          this.user.家庭成员记录[i].seen=false;
        }

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
      // if (this.查询条件 === "0") {
      //   // 根据职工号、单位和姓名查询
      //   if (
      //     this.基本信息.职工号 === "" ||
      //     this.基本信息.单位 === "" ||
      //     this.基本信息.姓名 === ""
      //   ) {
      //     alert("请填写职工号、单位和姓名");
      //   } else {
      //     this.getdata();
      //   }
      // } else if (this.查询条件 === "1") {
      //   // 只根据职工号查询
      //   if (this.基本信息.职工号 === "") {
      //     alert("请填写职工号");
      //   } else {
      //     this.getdata();
      //   }
      // } else if (this.查询条件 === "2") {
      //   if (this.基本信息.单位 === "" || this.基本信息.姓名 === "") {
      //     alert("请填写单位和姓名");
      //   } else {
      //     this.getdata();
      //   }
      // }
    },
    // // 基本信息中新增按钮
    // add() {
    //   this.isShow = true; // 显示后面模块
    //   this.isDisabled = true; // 禁用查询和新增按钮
    // },
    // save1() {
    //   基本信息.save(this.基本信息);
    // },
    // update1() {
    //   基本信息.update(this.基本信息);
    // },
    // save2() {
    //   this.审核情况.职工号 = this.基本信息.职工号;
    //   审核情况.save(this.审核情况);
    // },
    // update2() {
    //   this.审核情况.职工号 = this.基本信息.职工号;
    //   审核情况.update(this.审核情况);
    // },
    // save3() {
    //   this.出生时间.职工号 = this.基本信息.职工号;
    //   出生时间.save(this.出生时间);
    // },
    // update3() {
    //   this.出生时间.职工号 = this.基本信息.职工号;
    //   出生时间.update(this.出生时间);
    // },
    // save4() {
    //   this.参加工作时间.职工号 = this.基本信息.职工号;
    //   参加工作时间.save(this.参加工作时间);
    // },
    // update4() {
    //   this.参加工作时间.职工号 = this.基本信息.职工号;
    //   参加工作时间.update(this.参加工作时间);
    // },
    // save5() {
    //   this.入党时间.职工号 = this.基本信息.职工号;
    //   入党时间.save(this.入党时间);
    // },
    // update5() {
    //   this.入党时间.职工号 = this.基本信息.职工号;
    //   入党时间.update(this.入党时间);
    // },
    // save6() {
    //   this.学历学位材料.职工号 = this.基本信息.职工号;
    //   学历学位材料.save(this.学历学位材料);
    // },
    // update6() {
    //   this.学历学位材料.职工号 = this.基本信息.职工号;
    //   学历学位材料.update(this.学历学位材料);
    // },
    // // 如果政治面貌是党员，显示入党时间
    // isPartyer(value) {
    //   if (value === "中共党员") {
    //     this.showPartyDate = true;
    //   } else {
    //     this.user.partyDate = new Date();
    //   }
    // },

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
    // //添加一行
    // addedu() {
    //   this.学历学位材料.学习经历列表.push({});
    // },
    // addexperience() {
    //   this.user.工作经历列表.push({
    //     起始时间: "",
    //     终止时间: "",
    //     所在单位名称: "",
    //     从事工作: "",
    //     曾任党政职务: "",
    //     曾任专业技术职务: "",
    //     备注: "",
    //   });
    // },
    // addaward() {
    //   this.user.奖励情况列表.push({
    //     奖励时间: "",
    //     奖励情况: "",
    //   });
    // },
    // addPunish() {
    //   this.user.处分情况列表.push({
    //     处分时间: "",
    //     处分情况: "",
    //   });
    // },
    // addFamily() {
    //   this.user.家庭成员列表.push({
    //     称谓: "",
    //     姓名: "",
    //     出生年月: "",
    //     政治面貌: "",
    //     单位及职务: "",
    //     现居住地: "",
    //   });
    // },
    // removeEdu(item) {
    //   var index = this.学历学位材料.学习经历列表.indexOf(item);
    //   if (index !== -1) {
    //     this.学历学位材料.学习经历列表.splice(index, 1);
    //   }
    // },
    // removeExperience(item) {
    //   var index = this.user.工作经历列表.indexOf(item);
    //   if (index !== -1) {
    //     this.user.工作经历列表.splice(index, 1);
    //   }
    // },
    // removeAward(item) {
    //   var index = this.user.奖励情况列表.indexOf(item);
    //   if (index !== -1) {
    //     this.user.奖励情况列表.splice(index, 1);
    //   }
    // },
    // removePunish(item) {
    //   var index = this.user.处分情况列表.indexOf(item);
    //   if (index !== -1) {
    //     this.user.处分情况列表.splice(index, 1);
    //   }
    // },
    // removeFamily(item) {
    //   var index = this.user.家庭成员列表.indexOf(item);
    //   if (index !== -1) {
    //     this.user.家庭成员列表.splice(index, 1);
    //   }
    // },
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
  }
}

.mybottom {
  float: left;
  width: 100%;
  margin: 15px auto;
}
</style>
