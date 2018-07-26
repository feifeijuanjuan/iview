<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <div class="hb_item_table  table_horizontal">


<div  style="height: 20px;"></div>
                
                 <Steps :current="currentStep" :status="status">
                    <Step v-for="item in stepList1" :title="item.title"  :key="item.title"></Step>
                </Steps>
<div  style="height: 20px;"></div>

                <RenderForm :field_layout='field_layout'  :fields='fields' :fields_value='fields_value' ref="ruleForm">

               




  <Tabs value="name1">
        <TabPane label="盈利指标" name="name1">标签一的内容</TabPane>
        <TabPane label="能力指标" name="name2">标签二的内容</TabPane>
        <TabPane label="效果分析" name="name3">标签三的内容</TabPane>
    </Tabs>
  
                    <div  style="height: 50px;">
                        
                    </div>
 
 
                    
                     <FormItem>
                       <i-button type="primary"   @click="submitForm('ruleForm')" >立即创建</i-button>
                       <i-button @click="resetForm('ruleForm')" >重置</i-button>
                     </FormItem>  
                   </RenderForm>
                   
                    </div>
                </Card>
            </Col>
            <Col span="6" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <p class="margin-top-10">
                        
                    </p>
                    <p class="margin-top-10">
                        <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                        <Button v-show="!editOpenness" size="small"  type="text">修改</Button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <RadioGroup v-model="currentOpenness" vertical>
                                    <Radio label="公开">
                                        公开
                                        <Checkbox v-show="currentOpenness === '公开'"  >在首页置顶这篇文章</Checkbox>
                                    </Radio>
                                    <Radio label="密码">
                                        密码
                                        <Input v-show="currentOpenness === '密码'" style="width:120px" size="small" placeholder="请输入密码"/>
                                    </Radio>
                                    <Radio label="私密"></Radio>
                                </RadioGroup>
                                <div>
                                    <Button type="primary" >确认</Button>
                                    <Button type="ghost"  >取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                        <span v-if="publishTimeType === 'immediately'">立即发布</span><span v-else>定时：{{ publishTime }}</span>
                        <Button v-show="!editPublishTime" size="small"  type="text">修改</Button>
                        <transition name="publish-time">
                            <div v-show="editPublishTime" class="publish-time-picker-con">
                                <div class="margin-top-10">
                                    <DatePicker  type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>                                    
                                </div>
                                <div class="margin-top-10">
                                    <Button type="primary"  >确认</Button>
                                    <Button type="ghost"  >取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button >预览</Button></span>
                        <span class="publish-button"><Button >保存草稿</Button></span>
                        <span class="publish-button"><Button icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                    </Row>
                </Card>
               
               
            </Col>
        </Row>
    </div>
</template>

<script>
 
import RenderForm from '@/views/main-components/formRender/render-form'
import formJson from './formcreate.json'
export default {
    name: 'artical-publish',
    components: {
    
    RenderForm
    },
    data () {
        console.log(formJson);
        return {
            stepList1: [],
            stepData: {
                title: '',
                describe: '',
                content: ''
            },

            field_layout:formJson.field_layout,
            fields :formJson.fields,
            fields_value :formJson.fields,     

            articleTitle: '',
            articleError: '',
            showLink: false,
            fixedLink: '',
            articlePath: '',
            articlePathHasEdited: false,
            editLink: false,
            editPathButtonType: 'ghost',
            editPathButtonText: '编辑',
            articleStateList: [{value: '草稿'}, {value: '等待复审'}],
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            articleTagSelected: [], // 文章选中的标签
            articleTagList: [], // 所有标签列表
            classificationList: [],
            classificationSelected: [], // 在所有分类目录中选中的目录数组
            offenUsedClass: [],
            offenUsedClassSelected: [], // 常用目录选中的目录
            classificationFinalSelected: [], // 最后实际选择的目录
            publishLoading: false,
            addingNewTag: false, // 添加新标签
            newTagName: '', // 新建标签名
          status: 'wait',
           currentStep: 0,
        }
    },
    methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => 
      {
        if (valid) {
           
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
 
       console.log(this.$refs[formName].getFormValue())
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
       
    },
    computed: {
        completeUrl () {
           // let finalUrl =  this.fixedLink + this.articlePath;
          
        }
    },
    mounted () {
       this.stepList1 = [
            {
                title: '创建阶段',
                describe: '张三'
            },
            {
                title: '可研提交',
                describe: '李四'
            },
            {
                title: '总体设计',
                describe: '王五'
            },
            {
                title: '投资优化',
                describe: '赵六'
            },
            {
                title: '项目后评价',
                describe: '赵六'
            }
        ];
      
        this.currentStep = 2;
        
    },
    destroyed () {
       
    }
};
</script>
