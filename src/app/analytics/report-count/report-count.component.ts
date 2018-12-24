import { Subscription } from 'rxjs/Subscription';
import { ReportService } from './../../services/report.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as Chartist from 'chartist';

declare var require: any;

require('chartist-plugin-legend');

@Component({
  selector: 'app-report-count',
  templateUrl: './report-count.component.html',
  styleUrls: ['./report-count.component.scss']
})
export class ReportCountComponent implements OnInit, OnDestroy {

  private graphDataSubscription: Subscription;
  private crystalReportSubscripton: Subscription;
  private reports = this.reportService.GetAllReports();
  public reportData = [];
  @Input() startDate: number = Number(new Date('2018-01-01'));
  @Input() endDate: number = Number(new Date('2018-12-01'));

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.graphDataSubscription = this.loadReportGraphData(this.startDate, this.endDate)
      .subscribe(
        data => {
          this.reportData = this.getReportTableData(data);
        }
      );
  }

  ngOnDestroy() {
    this.graphDataSubscription.unsubscribe();
  }

  loadReportGraphData (startDate: number, endDate: number) {
    if (this.startDate && this.endDate) {
      return this.reports
        .pipe(
          map(result => result.reports),
          map(this.convertCreatedAt),
          map(this.groupByCategories),
          tap(data => {
            const reports = this.groupReportByMonths(data)
            const pieReports = this.getPieData(data);
            this.loadReportChart(reports);
            this.loadReportPieChart(pieReports);
          })
        );
    }
  }

  // internal functions
  convertCreatedAt (reports) {
    return reports.map(report => {
      const date = moment(report.createdAt).format('YYYY-MM-DD');
      report.created = Number(new Date(date));
      return report;
    });
  }
  groupByCategories (reports) {
    const reportList: any = {};
    reportList.all = reports;
    _.each(reports, (report) => {
      const categoryName = report.category.name.toLowerCase();
      if (!reportList[categoryName]) {
        reportList[categoryName] = [];
      }
      reportList[categoryName].push(report);
    });
    return reportList;
  }

  getReportByDate (groupedReports, startDate, endDate) {
    const reports = groupedReports;
    const reportGroups = Object.keys(reports);
    const reportList = [];
    _.each(reportGroups, (g) => {
      const report: any = {};
      const group = _.sortBy(reports[g], 'created');
      const timeG: any = {};
      for (let i = startDate; i <= endDate; i += 8.64e+7) {
        const list = _.filter(group, (gr) => {
          return Number(gr.created) === Number(i);
        });

        timeG[i] = list.length;
      }
      const data = Object.keys(timeG).map(k => {
        return [Number(k), timeG[k]];
      });
      report.name = g;
      report.data = data;
      reportList.push(report);
    });
    return reportList;
  }

  groupReportByMonths (groupedReports) {
    const data: any = {};
    const series = [];
    const legends = Object.keys(groupedReports);
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    _.each(legends, (leg) => {
      const seriesData: any = {};
      seriesData.name = leg;
      seriesData.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      _.each(groupedReports[leg], (report) => {
        const monthIndex = Number(moment(report.created).format('MM')) - 1;
        seriesData.data[monthIndex] += 1;
      })
      series.push(seriesData);
    });
    data.legends = legends.map(a => a.toUpperCase());
    data.series = series;
    data.labels = labels;
    return data;
  }

  getPieData (reports) {
    delete reports.all;
    const data: any = {};
    const series = [];
    const legends = Object.keys(reports);
    _.each(legends, (rep) => {
      series.push(reports[rep].length);
    });
    data.series = series;
    data.labels = legends.map(a => {
      return a.toUpperCase() + ' - ' +  reports[a].length;
    });
    return data;
  }

  getReportTableData (reports) {
    const list = Object.keys(reports);
    const reportList = [{ type: 'ALL', count: 0, resolved: 0, unresolved: 0 }];
    _.each(list, (l) => {
      const resolvedCount = reports[l].reduce((pv, cv) => {
        if (cv.status === 'DONE') {
          pv ++;
        }
        return pv;
      }, 0);
      const unresolvedCount = reports[l].length - resolvedCount;
      reportList[0].count += reports[l].length;
      reportList[0].resolved += resolvedCount;
      reportList[0].unresolved += unresolvedCount;
      reportList.push({
        type: l.toUpperCase(),
        count: reports[l].length,
        resolved: resolvedCount,
        unresolved: unresolvedCount
      });
    })
    return reportList;
  }

  startAnimationForLineChart(chart: any) {
    let seq: number, delays: number, durations: number;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function(data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
  }

  loadReportChart(reportData) {
    const dataRoundedLineChart = {
      labels: reportData.labels,
      series: reportData.series
  };

  const optionsStraightLinesChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value +
    // something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    classNames: {
        point: 'ct-point ct-white',
        line: 'ct-line ct-white'
    },
    plugins: [
      Chartist.plugins.legend({
        legendNames: reportData.legends
      })
    ]
  };

    const lineChart = new Chartist.Line('#simpleLineChart', dataRoundedLineChart, optionsStraightLinesChart);

    this.startAnimationForLineChart(lineChart);
  }

  loadReportPieChart(reportData) {
    const pieChartData = {
      labels: reportData.labels,
      series: reportData.series
  };

  const pieChartOptions: any = {
    height: '500px',
    plugins: [
      Chartist.plugins.legend({
        legendNames: reportData.legends
      })
    ]
  };

    const pieChart = new Chartist.Pie('#pieChart', pieChartData, pieChartOptions);

    console.log(pieChart);

    this.startAnimationForLineChart(pieChart);
  }

}
