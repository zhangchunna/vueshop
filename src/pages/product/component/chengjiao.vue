<template>
    <div class="van-tab__pane" style="">
        <div class="trade-records">
            <div class="van-cell van-hairline trade-records__header">
                <div class="trade-records__item van-row">
                    <div class="van-col van-col--8">买家</div>
                    <div class="van-col van-col--8">成交时间</div>
                    <div class="van-col van-col--8">数量</div>
                </div>
            </div>
            <div class="van-cell" v-for="(item,index) in chengjiaodata" :key="index">
                <div class="trade-records__item van-row">
                    <div class="van-col van-col--8">{{item.namea}}</div>
                    <div class="van-col van-col--8">{{item.time}}</div>
                    <div class="van-col van-col--8">{{item.num}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'chengjiao',
  data(){
      return{
          chengjiaodata:[
              {'namea':'唐*平','time':'16:21:23','num':'1'},
              {'namea':'徐*水','time':'16:10:16','num':'2'},
              {'namea':'徐*水','time':'15:58:18','num':'2'},
              {'namea':'湖***矿','time':'21:52:26','num':'2'},
              {'namea':'郭*爷','time':'17:31:56','num':'1'},
              {'namea':'水***社','time':'13:21:22','num':'2'},
              {'namea':'蔡*东','time':'16:52:16','num':'1'},
              {'namea':'二**风','time':'16:21:23','num':'1'},
              {'namea':'上**药','time':'12:46:53','num':'2'},
              {'namea':'昭***0','time':'12:02:35','num':'1'},
              {'namea':'美***你','time':'01:40:36','num':'1'},
              {'namea':'江***','time':'00:13:41','num':'1'},
              {'namea':'任*宇','time':'17:27:18','num':'2'},
              {'namea':'王*祥','time':'16:39:08','num':'1'},
              {'namea':'陈*','time':'14:11:41','num':'1'},
              {'namea':'金*生','time':'22:30:36','num':'1'},
              {'namea':'唐*钟','time':'21:22:48','num':'2'},
              {'namea':'陈*','time':'18:10:23','num':'2'},
              {'namea':'尹*生','time':'16:25:50','num':'1'},
              {'namea':'常*','time':'08:33:54','num':'1'},
              {'namea':'赵*峰','time':'07:21:31','num':'2'},
              {'namea':'伍*','time':'07:15:58','num':'1'},
              {'namea':'兰*凯','time':'01:08:29','num':'1'},
              {'namea':'ヰ***豸','time':'21:25:04','num':'1'},
          ]
      }
  }
}
</script>
<style scoped>
 .page-goods .van-cell {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 640px;
    margin: 0 auto;
}
.trade-records__header {
    padding: 5px 10px;
    background-color: transparent;
    color: #333;
}

.trade-records__item{
    width: 100%;
}
.trade-records__header .van-col:first-child {
    text-indent: 12px;
}
.trade-records__item .van-col:first-child{
    text-align: left;
}
.trade-records__item .van-col {
    font-size: 12px;
    text-align: center
}
.van-col {
    float: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
