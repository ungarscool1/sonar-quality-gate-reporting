import * as jwt from 'jsonwebtoken';
import NodeRSA from 'node-rsa';
import axios from 'axios';
import { GithubInstallationAccessToken } from './types';
import * as Sonar from '../sonar';

export const sendQualityReport = async (report: Sonar.Types.QualityReport): Promise<void> => {
    if (!process.env.GITHUB_REF)
        throw new Error('GITHUB_REF environment variable is not set');
    const ref = process.env.GITHUB_REF.match(/\d+/);
    if (!ref)
        throw new Error('GITHUB_REF environment variable is not correctly set');
    await axios.post(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues/${ref[0]}/comments`, {
            body: `# SonarQube Code Analytics\n\n## Quality Gate\n\nSonarQube Quality Gate ![${report.status}](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/${report.status}.png)\n\n## Issues\n\n![bug](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/bug.png) ![${report.bugs.type.toUpperCase()}](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/security_${report.bugs.type}.png) [${report.bugs.value} Bugs](${process.env.SONAR_URL}/dashboard?id=${process.env.SONAR_ID})\n\n![vulnerabilities](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/vulnerability.png) ![${report.vulnerabilities.type.toUpperCase()}](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/security_${report.vulnerabilities.type}.png) [${report.vulnerabilities.value} Vulnerabilities](${process.env.SONAR_URL}/dashboard?id=${process.env.SONAR_ID})\n\n![code_smell](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/code_smell.png) ![${report.codeSmells.type.toUpperCase()}](https://hsonar.s3.ap-southeast-1.amazonaws.com/images/security_${report.codeSmells.type}.png) [${report.codeSmells.value} Code Smells](${process.env.SONAR_URL}/dashboard?id=${process.env.SONAR_ID})`
    }, {
        headers: {
            'Authorization': `token ${await createGHAuthToken()}`
        }
    });
}

export const createGHAuthToken = async (): Promise<string> => {
    return (await axios.post(`https://api.github.com/app/installations/${process.env.INSTALLATION}/access_tokens`, '',{
        headers: {
            Authorization: `Bearer ${createGHAppToken()}`
        }
    })).data.token;
}

export const createGHAppToken = (): string => {
    if (!process.env.APP_KEY)
        throw new Error('APP_KEY is not defined');
    return jwt.sign({
        iss: process.env.APP_ID,
        exp: Math.floor(Date.now() / 1000) + (10 * 60),
        iat: Math.floor(Date.now() / 1000) - 60
    }, `${process.env.APP_KEY}`, {
        algorithm: 'RS256'
    });
}