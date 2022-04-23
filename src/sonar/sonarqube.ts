import axios from 'axios';
import { ComponentMeasure, QualityReport } from './types';

export const getMeasure = async (component: string): Promise<ComponentMeasure> => {
    return (await axios.get(`${process.env.SONAR_URL}/api/measures/component?additionalFields=period%2Cmetrics&component=${component}&metricKeys=alert_status%2Cquality_gate_details%2Cbugs%2Cnew_bugs%2Creliability_rating%2Cnew_reliability_rating%2Cvulnerabilities%2Cnew_vulnerabilities%2Csecurity_rating%2Cnew_security_rating%2Csecurity_hotspots%2Cnew_security_hotspots%2Csecurity_hotspots_reviewed%2Cnew_security_hotspots_reviewed%2Csecurity_review_rating%2Cnew_security_review_rating%2Ccode_smells%2Cnew_code_smells%2Csqale_rating%2Cnew_maintainability_rating%2Csqale_index%2Cnew_technical_debt%2Ccoverage%2Cnew_coverage%2Clines_to_cover%2Cnew_lines_to_cover%2Ctests%2Cduplicated_lines_density%2Cnew_duplicated_lines_density%2Cduplicated_blocks%2Cncloc%2Cncloc_language_distribution%2Cprojects%2Clines%2Cnew_lines%2Cnew_blocker_violations%2Cnew_critical_violations`,
    {
        headers: {
            'Authorization': `Basic ${Buffer.from(process.env.SONAR_TOKEN + ':').toString('base64')}`
        }
    })).data;
}

export const fromMeasureGetQAReport = (measure: ComponentMeasure): QualityReport => {
    const bugs = measure.component.measures.find(m => m.metric === 'new_bugs');
    const vulnerabilities = measure.component.measures.find(m => m.metric === 'new_vulnerabilities');
    const codeSmells = measure.component.measures.find(m => m.metric === 'new_code_smells');

    return {
        status: measure.component.measures.find(m => m.metric === 'alert_status')?.value === 'OK' ? 'passed' : 'failed',
        bugs: {
            value: bugs?.period?.value ?? '0',
            type: getSecurityLevel(bugs?.period?.value ?? '0')
        },
        vulnerabilities: {
            value: vulnerabilities?.period?.value ?? '0',
            type: getSecurityLevel(vulnerabilities?.period?.value ?? '0')
        },
        codeSmells: {
            value: codeSmells?.period?.value ?? '0',
            type: getSecurityLevel(codeSmells?.period?.value ?? '0')
        }
    }
}

const getSecurityLevel = (value: string): 'a' | 'b' | 'c' | 'd' | 'e' => {
    switch (value) {
        case '1':
            return 'a';
        case '2':
            return 'b';
        case '3':
            return 'c';
        case '4':
            return 'd';
        case '5':
            return 'e';
        default:
            return 'e';
    }
}