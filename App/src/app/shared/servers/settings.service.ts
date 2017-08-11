import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  option:any;
  exampleSettings:any;

  constructor() {
    this.exampleSettings = {
      title: {
        text: '堆叠区域图',
        subtext: "power by echarts",
        textStyle: {
          color: '#333',
          fontStyle: 'normal',
          fontWeight: 'bolder',
          fontSize: 18,
        },
        subtextStyle: {
          color: '#aaa',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
        },
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };


    this.option = {
      title: {
        text: 'echart',
        subtext: '1111',
        textStyle: {
          color: 'black',
          fontStyle: 'normal',
          fontWeight: 'bolder',
          fontSize: 18,
        },
        subtextStyle: {
          color: 'black',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
        },
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value',
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }

  setChartOption(settings){
    this.option.title.text = settings.title?settings.title:'堆叠区域图';
    this.option.title.subtext = settings.subtitle?settings.subtitle:'power by echarts';
    this.option.title.textStyle.color = settings.titleColor?settings.titleColor:"black";
    this.option.title.subtextStyle.color = settings.subtitleColor?settings.subtitleColor:"balck";
    this.option.xAxis.data = this.splitData(settings.xData)?this.splitData(settings.xData):['周一','周二','周三','周四','周五','周六','周日'];
    this.option.series[0].data = this.splitData(settings.yData)?this.splitData(settings.yData):[120, 132, 101, 134, 90, 230, 210];

    return this.option;
  }


  splitData(data:any){
    let dataArray = [];

    if(data){
      data = String(data).replace(/\s|\,|\，/g, ' ');
      dataArray = data.split(" ");
    }

    return dataArray;
  }

}
