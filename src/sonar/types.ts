export interface ComponentMeasure {
    component: Component,
    metrics: Array<Metric>,
    period: Period
}

export interface Component {
    key: string;
    name: string;
    qualifier: string;
    measures: Array<Measure>;
}

export interface Measure {
    metric: string;
    periods?: Array<MeasurePeriod>;
    period?: MeasurePeriod;
    value?: string;
}

export interface MeasurePeriod {
    index: number;
    value: string;
    bestValue: boolean;
}

export interface Metric {
    key: string;
    name: string;
    description: string;
    domain: string;
    type: string;
    higherValuesAreBetter: boolean;
    qualitative: boolean;
    hidden: boolean;
}

export interface Period {
    index: number;
    mode: string;
    date: string;
}

export interface SecurityReport {
    value: string;
    type: 'a' | 'b' | 'c' | 'd' | 'e';
}

export interface QualityReport {
    status: 'passed' | 'failed';
    bugs: SecurityReport;
    vulnerabilities: SecurityReport;
    codeSmells: SecurityReport;
}
