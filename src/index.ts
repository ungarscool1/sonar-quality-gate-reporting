import * as Sonar from './sonar';
import * as Github from './github';


(async () => {
    try {
        if (!process.env.SONAR_ID || !process.env.SONAR_URL || !process.env.GITHUB_REF || !process.env.GITHUB_REPOSITORY || !process.env.APP_ID || !process.env.APP_KEY || !process.env.INSTALLATION)
            throw new Error('Environment variables are not set');
        const measure = await Sonar.getMeasure(process.env.SONAR_ID)
        Github.sendQualityReport(Sonar.fromMeasureGetQAReport(measure));
    } catch (e) {
        //console.error(e);
        process.exit(1);
    }
})();