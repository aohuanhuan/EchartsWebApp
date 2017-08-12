import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  option:any;

  constructor() {
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
        data:[]
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
      series : []
    };
  }

  // 配置chartoption
  setChartOption(settings:any,dataGroup:Array<any>){
    this.option.title.text = settings.title?settings.title:'折线图';
    this.option.title.subtext = settings.subtitle?settings.subtitle:'power by echarts';
    this.option.title.textStyle.color = settings.titleColor?settings.titleColor:"black";
    this.option.title.subtextStyle.color = settings.subtitleColor?settings.subtitleColor:"balck";

    this.setXYData(dataGroup);

    return this.option;
  }

  // 设置xy轴数据
  setXYData(dataGroup){
    let dataLength = dataGroup.length,
        seriesLength = this.option.series.length;

    if (dataLength < seriesLength){                     //删除数据
      for (let m = 0; m < seriesLength-dataLength; m++){
        this.option.series.pop();
        this.option.legend.data.pop();
      }
    } else {                                            //增加数据
      for (let i = 0; i < dataLength; i++){
        for (let j = 0; j <= seriesLength; j++){
          if (this.option.series[i]){                     //当option.series中包含dataGroup的数据
            //设置legend
            this.option.legend.data[i] = dataGroup[i].title;

            //设置series
            this.option.series[i].name = dataGroup[i].title;
            this.option.series[i].data = this.splitData(dataGroup[i].yData);
            this.option.xAxis[0].data = this.splitData(dataGroup[i].xData);
          } else {                                        //当option.series中不包含dataGroup的数据
            //设置legend
            this.option.legend.data.push(dataGroup[i].title);

            //设置series
            let yData = {
              name: dataGroup[i].title,
              type:'line',
              data:this.splitData(dataGroup[i].yData)
            };
            this.option.series.push(yData);
            this.option.xAxis[0].data = this.splitData(dataGroup[i].xData);
          }
        }
      }
    }
  }


  // 处理用户输入数据中的空格、中英文逗号
  splitData(data:any){
    let dataArray = [];

    if(data){
      data = String(data).replace(/\s|\,|\，/g, ' ');
      dataArray = data.split(" ");

      //去除空格影响
      for (let i = 0; i < dataArray.length; i++){
        if (!dataArray[i]){
          dataArray.splice(i,1);
        }
      }
    }

    return dataArray;
  }

}
