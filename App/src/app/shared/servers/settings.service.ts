import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  option:any;

  constructor() {
    this.option = {
      title: {
        show: true,
        text: 'echart',
        subtext: '1111',
        textStyle: {
          color: 'black',
          fontStyle: 'normal',
          fontWeight: 'bolder',
          fontSize: 18,
        },
        // textAlign:'left',
        subtextStyle: {
          color: 'black',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
        },
        itemGap: 10,
        left: '0%',
        top: '0%',
        borderColor: '#ccc',
        borderWidth: 0
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        show: true,
        left: '50%',
        top: '0%',
        orient: 'horizontal',
        itemGap: 10,
        selectedMode: true,
        data:[],
        textStyle: {
          color: '#333',
          fontSize: 12
        },
        borderColor: '#ccc',
        borderWidth: 0
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        show: false,
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '17%',
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
    //是否显示标题
    this.option.title.show = settings.titleChecked;
    //标题
    this.option.title.text = settings.title;
    this.option.title.subtext = settings.subtitle;
    //标题颜色
    this.option.title.textStyle.color = settings.titleColor?settings.titleColor:"black";
    this.option.title.subtextStyle.color = settings.subtitleColor?settings.subtitleColor:"balck";
    //标题字体大小
    this.option.title.textStyle.fontSize = settings.titleFontSize?settings.titleFontSize:"18";
    this.option.title.subtextStyle.fontSize = settings.subtitleFontSize?settings.subtitleFontSize:"18";
    //主标题和副标题之间间隔
    this.option.title.itemGap = settings.itemGap;
    //标题位置
    this.option.title.left = this.addPercent(settings.titleLeft);
    this.option.title.top = this.addPercent(settings.titleTop);
    //边框颜色
    this.option.title.borderColor = settings.borderColor?settings.borderColor:"#ccc";
    // 边框线宽
    this.option.title.borderWidth = settings.borderWidth;
    //是否显示图例
    this.option.legend.show = settings.legendChecked;
    //图例位置
    this.option.legend.left = this.addPercent(settings.legendLeft);
    this.option.legend.top = this.addPercent(settings.legendTop);
    //图例朝向
    this.option.legend.orient = settings.legendOrient?settings.legendOrient:'horizontal';
    //图例之间间隔
    this.option.legend.itemGap = settings.legendItemGap;
    //是否图例选择的模式可用
    this.option.legend.selectedMode = settings.isSelectedMode;
    // 图例字体大小
    this.option.legend.textStyle.fontSize = settings.legendFontSize?settings.legendFontSize:'12';
    // 图例字体颜色
    this.option.legend.textStyle.color = settings.legendColor?settings.legendColor:'#333';
    // 图例边框颜色
    this.option.legend.borderColor = settings.legendBorderColor;
    // 图例边框线宽
    this.option.legend.borderWidth = settings.legendBorderWidth;
    // 显示直角坐标系网格
    this.option.grid.show = settings.gridChecked;
    // 网格位置
    this.option.grid.top = this.addPercent(settings.gridTop);
    this.option.grid.bottom = this.addPercent(settings.gridBottom);
    this.option.grid.left = this.addPercent(settings.gridLeft);
    this.option.grid.right = this.addPercent(settings.gridRight);


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

  // 增加%
  addPercent(data:number){
    return data + '%';
  }
}
